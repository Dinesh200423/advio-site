import { SplitText } from './fx';

export default function SectionHead({ eyebrow, title, text }) {
  return (
    <div className="sec-head rv">
      <div>
        {eyebrow && <p className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</p>}
        <SplitText as="h2">{title}</SplitText>
      </div>
      {text && <SplitText as="p" mode="stagger">{text}</SplitText>}
    </div>
  );
}
