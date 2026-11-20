import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True once the element has scrolled into view. */
export function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) { setSeen(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* ───────────── Split text: mask-rise + word-stagger ───────────── */
function splitNode(node, counter) {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((tok, k) => {
      if (tok === '' || /^\s+$/.test(tok)) return tok;
      const i = counter.n++;
      return (
        <span key={k} className="sw">
          <span className="si" style={{ '--i': i }}>{tok}</span>
        </span>
      );
    });
  }
  if (isValidElement(node) && node.type !== 'br') {
    const kids = Children.toArray(node.props.children).map((c, i) => (
      <Fragment key={i}>{splitNode(c, counter)}</Fragment>
    ));
    return cloneElement(node, undefined, kids);
  }
  return node;
}

/**
 * mode="rise"    → each word rises out of a mask (headings)
 * mode="stagger" → words fade/slide in one after another (paragraphs)
 */
export function SplitText({
  as: Tag = 'span',
  mode = 'rise',
  delay = 0,
  step = mode === 'rise' ? 0.07 : 0.03,
  className = '',
  onIn,
  children,
  ...rest
}) {
  const [ref, seen] = useInView(mode === 'rise' ? 0.4 : 0.25);
  const counter = { n: 0 };
  const parts = Children.toArray(children).map((c, i) => (
    <Fragment key={i}>{splitNode(c, counter)}</Fragment>
  ));
  useEffect(() => { if (seen && onIn) onIn(); }, [seen]); // eslint-disable-line
  return (
    <Tag
      ref={ref}
      className={`${className} fx-${mode} ${seen ? 'fx-in' : ''}`.trim()}
      style={{ '--delay': `${delay}s`, '--step': `${step}s` }}
      {...rest}
    >
      {parts}
    </Tag>
  );
}

/* ───────────── Scramble / decode text (buttons) ───────────── */
// Calm decode: letters stay the same kind (a→b, A→B, 1→2), only change every ~90ms,
// and resolve left to right with an eased pace. Width is locked so nothing jumps.
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = LOWER.toUpperCase();
const DIGITS = '0123456789';
const pick = (set) => set[(Math.random() * set.length) | 0];
const scrambleChar = (c) =>
  /[a-z]/.test(c) ? pick(LOWER) : /[A-Z]/.test(c) ? pick(UPPER) : /[0-9]/.test(c) ? pick(DIGITS) : c;

export function Scramble({ children, className = '' }) {
  const text = String(children);
  const ref = useRef(null);
  const raf = useRef(0);

  useLayoutEffect(() => {
    if (ref.current) ref.current.textContent = text;
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const host = el.closest('a,button') || el;
    const chars = [...text];

    const finish = () => {
      el.textContent = text;
      el.style.minWidth = '';
    };

    const run = () => {
      cancelAnimationFrame(raf.current);
      el.style.minWidth = `${el.getBoundingClientRect().width}px`;
      const start = performance.now();
      const dur = 1100 + chars.length * 40;
      const STEP = 90;
      let last = -STEP;
      let glyphs = chars.map(scrambleChar);

      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = t * t * (3 - 2 * t);
        const done = Math.floor(eased * chars.length);
        if (now - last >= STEP) {
          last = now;
          glyphs = chars.map(scrambleChar);
        }
        el.textContent = chars.map((c, i) => (c === ' ' || i < done ? c : glyphs[i])).join('');
        if (t < 1) raf.current = requestAnimationFrame(tick);
        else finish();
      };
      raf.current = requestAnimationFrame(tick);
    };

    host.addEventListener('mouseenter', run);
    host.addEventListener('focus', run);
    return () => {
      cancelAnimationFrame(raf.current);
      host.removeEventListener('mouseenter', run);
      host.removeEventListener('focus', run);
    };
  }, [text]);

  return <span ref={ref} className={`scr ${className}`.trim()} aria-label={text} />;
}

/* ───────────── Number count-up ───────────── */
export function CountUp({ value, duration = 1700, className = '' }) {
  const str = String(value);
  const parts = str.split(/(\d[\d,]*(?:\.\d+)?)/);
  const [ref, seen] = useInView(0.4);
  const [p, setP] = useState(reduced() ? 1 : 0);

  useEffect(() => {
    if (!seen || reduced()) { if (seen) setP(1); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setP(1 - Math.pow(2, -10 * t) * (1 - t)); // ease-out expo-ish
      if (t < 1) raf = requestAnimationFrame(tick); else setP(1);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, duration]);

  return (
    <span ref={ref} className={`cnt ${className}`.trim()} aria-label={str}>
      {parts.map((tok, i) => {
        if (i % 2 === 0) return tok;
        const target = parseFloat(tok.replace(/,/g, ''));
        const decimals = (tok.split('.')[1] || '').length;
        const cur = target * p;
        const shown = decimals ? cur.toFixed(decimals) : Math.round(cur);
        return tok.includes(',') ? Number(shown).toLocaleString('en-IN') : String(shown);
      })}
    </span>
  );
}

/* ───────────── Scroll reveal for every .rv inside a container ───────────── */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.rv');
    if (!els || !els.length) return;
    if (reduced()) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}
