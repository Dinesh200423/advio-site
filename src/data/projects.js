// Original fictional concept work. None of these are real clients, and no
// results are claimed. `type` must be 'Concept Project', 'Product Demonstration'
// or 'Client Project'. Preview images live in src/assets/projects/.
import marlowe from '../assets/projects/marlowe.webp';
import clayform from '../assets/projects/clayform.webp';
import tidebook from '../assets/projects/tidebook.webp';
import northline from '../assets/projects/northline.webp';
import relay from '../assets/projects/relay.webp';

export const CATEGORIES = ['Websites', 'Web Applications', 'Software & SaaS', 'Automation'];

export const PROJECTS = [
  {
    id: 'marlowe',
    category: 'Websites',
    type: 'Concept Project',
    title: 'Marlowe Interiors',
    desc: 'A portfolio website for an interior design studio, with project galleries and a simple enquiry flow.',
    image: marlowe,
    alt: 'Concept website for an interior design studio with a living room photo, shown in a browser window.',
  },
  {
    id: 'clayform',
    category: 'Websites',
    type: 'Concept Project',
    title: 'Clayform Goods',
    desc: 'An online store concept for handmade homeware, with product pages, a cart and a clear checkout.',
    image: clayform,
    alt: 'Concept online store for handmade ceramics showing three product cards, shown in a browser window.',
  },
  {
    id: 'tidebook',
    category: 'Web Applications',
    type: 'Concept Project',
    title: 'Tidebook',
    desc: 'A booking web app concept where customers pick a slot and manage appointments from one simple portal.',
    image: tidebook,
    alt: 'Concept booking app showing a service list, a calendar with time slots and a booking summary.',
  },
  {
    id: 'northline',
    category: 'Software & SaaS',
    type: 'Concept Project',
    title: 'Northline CRM',
    desc: 'A CRM and dashboard concept for tracking leads, follow-ups and team activity in one place.',
    image: northline,
    alt: 'Concept CRM with a sales pipeline board showing leads in four stages, using sample data.',
  },
  {
    id: 'relay',
    category: 'Automation',
    type: 'Concept Project',
    title: 'Relay Flow',
    desc: 'An automation concept that captures new enquiries, alerts the team on WhatsApp and schedules the follow-up.',
    image: relay,
    alt: 'Concept automation workflow from a new enquiry to a team alert, a budget check and a follow-up reminder, using sample data.',
  },
];
