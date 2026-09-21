// All copy for the Makudi site lives here, taken from the approved homepage mockup.
// NOTE: stats, case studies and testimonials are sample content from the mockup —
// replace with real, sourced figures and client quotes before launch.

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Our Work', href: '/#work' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/#contact' },
];

export const hero = {
  eyebrow: 'Digital Marketing Agency in Kochi',
  lead: 'We blend strategy, creativity and technology to help your business get noticed, grow and build lasting connections.',
  // The four beats of the hero animation, in order.
  steps: [
    {
      word: 'Ideas',
      line: 'Every brand starts with a spark.',
      help: 'We turn your story, your audience and your best ideas into content concepts people actually want to see.',
    },
    {
      word: 'Strategy',
      line: 'We connect those sparks into a plan.',
      help: 'We match your goals to the right channels, budget and posting rhythm, so every post and every rupee has a job.',
    },
    {
      word: 'Visibility',
      line: 'We put the plan in front of the right people.',
      help: 'Social media, Google Ads and search work together, so people who are already looking for you find you first.',
    },
    {
      word: 'Growth',
      line: 'And we help the results build, month after month.',
      help: 'We track what works, do more of it, and report back in plain numbers you can act on.',
    },
  ],
  // The five glass chips in the hero scene. Each chip has one label per step
  // (Ideas, Strategy, Visibility, Growth) and rearranges itself between scenes.
  chips: [
    ['Reel', 'Audience', 'Social', 'Followers'],
    ['Story', 'Channels', 'Search', 'Enquiries'],
    ['Offer', 'Content plan', 'Ads', 'Sales'],
    ['Blog post', 'Budget', 'Maps', 'Reviews'],
    ['Poster', 'Goal', 'Website', 'Reach'],
  ],
  note: 'Every great brand deserves to be heard.',
  stats: [
    { value: 50, suffix: '+', label: 'Happy Clients' },
    { value: 100, suffix: '+', label: 'Campaigns' },
    { value: 3, suffix: 'x', label: 'Average Growth' },
  ],
};

export const industries = [
  { name: 'Boutiques & Textiles', short: 'Boutiques & Textiles', tone: 'weave' },
  { name: 'Restaurants & Cafés', short: 'Restaurants & Cafés', tone: 'plate' },
  { name: 'Interior Designers', short: 'Interior Designers', tone: 'window' },
  { name: 'Homemade & Organic', short: 'Homemade & Organic', tone: 'layers' },
  { name: 'Local Businesses', short: 'Local Businesses', tone: 'dots' },
];

// Phrases for the scrolling strip under the hero.
export const marquee = [
  'Get noticed',
  'Grow your reach',
  'Build lasting connections',
  'Stand out in a noisy marketplace',
  'Turn attention into customers',
];

export const tagline = 'Different Businesses. One Sound. Attention.';

export const servicesIntro = {
  title: 'Our Services',
  lead: 'From strategy to execution, we help your brand reach the right people, in the right way.',
};

// `reach` lists the real platforms and tools each service works on, shown as brand icons when the
// service is expanded. Each key must exist in brands.js.
export const services = [
  {
    name: 'Social Media Marketing',
    text: 'Engage, build community and grow your brand.',
    help: 'We look at what your audience already responds to, then plan a content calendar, a posting rhythm and community replies around it. Each month we review reach and engagement and adjust the mix, so your strategy keeps sharpening instead of going stale.',
    points: ['A content calendar built around your audience', 'Comments and messages answered in your voice', 'A monthly reach and engagement review'],
    reach: ['instagram', 'facebook', 'x', 'linkedin', 'youtube', 'whatsapp', 'pinterest'],
  },
  {
    name: 'Google Ads',
    text: 'Reach the right audience and get real results.',
    help: 'We research the searches your customers really make, build tightly targeted campaigns and test different ads against each other. Spend moves toward what brings enquiries and away from what does not, so your budget works harder every week.',
    points: ['Keyword and audience research', 'Ad copy and landing pages tested side by side', 'Budget shifted toward what converts'],
    reach: ['googleads', 'google', 'googlemaps', 'youtube', 'googleanalytics', 'googletagmanager'],
  },
  {
    name: 'Content Creation',
    text: 'Scroll-stopping content that tells your story.',
    help: 'Photos, short videos and written posts that share one voice and tell your story the same way everywhere. We plan content around what you sell and when people buy, so it supports your strategy instead of just filling a feed.',
    points: ['Photo, video and copy in one consistent voice', 'Planned around your busy and quiet seasons', 'Formats matched to each platform'],
    reach: ['canva', 'photoshop', 'premiere', 'illustrator', 'instagram', 'youtubeshorts'],
  },
  {
    name: 'Brand Strategy',
    text: 'Positioning and strategy for long-term growth.',
    help: 'We define who you are for, what you stand for and how you sound, then turn that into positioning every channel can follow. It is the base that keeps your marketing consistent and makes each decision after it easier.',
    points: ['Audience and positioning workshop', 'Voice, look and message guidelines', 'A clear roadmap for the months ahead'],
    reach: ['figma', 'behance', 'dribbble', 'pinterest', 'notion'],
  },
  {
    name: 'Website Design & SEO',
    text: 'Beautiful, functional websites that bring results.',
    help: 'We design a fast, mobile-friendly site that makes the next step obvious, then set up the search basics so people can find it. Over time we watch what visitors do and refine the pages to bring in more enquiries.',
    points: ['Mobile-first design that loads fast', 'On-page SEO and local search set-up', 'Tracking, to see what visitors actually do'],
    reach: ['wordpress', 'shopify', 'wix', 'webflow', 'googlesearchconsole', 'semrush', 'googleanalytics'],
  },
];

export const why = {
  panelTitle: ['Modern Marketing.', 'A Timeless Inspiration.'],
  cta: 'About Makudi',
  eyebrow: 'Why Makudi',
  title: 'Inspired by Tradition. Driven by Results.',
  body: 'The makudi, a humble yet powerful instrument, has always had the unique ability to draw attention. At Makudi, we bring that same essence to the digital world — helping your brand stand out in a noisy marketplace.',
  points: ['Creative Approach', 'Data-Driven Strategies', 'Personalized Support', 'Your Growth, Our Priority'],
};

export const industriesIntro = {
  title: 'Industries We Work With',
  lead: 'We understand your business. We create strategies that work for your world.',
};

export const work = {
  title: 'Featured Work',
  lead: 'Real businesses. Real results.',
  link: 'View All Projects',
  items: [
    { title: 'Boutique Brand Growth', service: 'Social Media Marketing', tone: 'weave' },
    { title: 'Café Visibility Boost', service: 'Google Ads', tone: 'plate' },
    { title: 'Interior Studio Online Presence', service: 'Website & SEO', tone: 'window' },
    { title: 'Home Baker Brand Launch', service: 'Brand Strategy', tone: 'layers' },
    { title: 'Organic Brand Awareness', service: 'Content Creation', tone: 'dots' },
  ],
};

export const testimonials = {
  title: 'What Our Clients Say',
  lead: 'Stories from brands that chose to be heard.',
  items: [
    {
      quote: 'Makudi completely transformed our social media presence. Our store now gets more walk-ins and online orders!',
      name: 'Anjali Nair',
      role: 'Saree Boutique, Kochi',
    },
    {
      quote: 'Professional, creative and result-oriented. Our café has seen a huge increase in visibility and footfall.',
      name: 'Rahul Menon',
      role: 'Café Owner, Kochi',
    },
    {
      quote: 'They understood our brand perfectly and created a beautiful website that truly reflects our style.',
      name: 'Sneha Varghese',
      role: 'Interior Designer, Kochi',
    },
  ],
};

export const cta = {
  title: ['Let’s Make Your Brand', 'Unmissable'],
  text: 'Ready to grow? Let’s discuss how Makudi can help your business draw the attention it deserves.',
  button: 'Let’s Talk',
};

export const brand = {
  tagline: 'The Art of Drawing Attention',
  email: 'hello@makudi.in',
  phone: '+91 98765 43210',
  phoneHref: '+919876543210',
  place: 'Kochi, Kerala',
  socials: [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'YouTube', href: '#' },
  ],
};
