// All copy for the Makudi site lives here, taken from the approved homepage mockup.
// NOTE: stats, case studies and testimonials are sample content from the mockup —
// replace with real, sourced figures and client quotes before launch.

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Our Approach', href: '/#approach' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/#contact' },
];

export const hero = {
  eyebrow: 'Digital Marketing Agency in Kochi',
  subEyebrow: 'Your Complete Marketing Solution',
  lead: 'We bring strategy, creativity, technology and execution together to help businesses build meaningful brands, reach the right audiences and earn attention that matters.',
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
  stats: [
    { value: 50, suffix: '+', label: 'Happy Clients' },
    { value: 100, suffix: '+', label: 'Campaigns' },
    { value: 3, suffix: 'x', label: 'Average Growth' },
  ],
};

// The 3-column strip under the hero.
export const heroFeatures = [
  { icon: 'compass', title: 'Strategy-Led Approach', text: 'Clear thinking before execution.' },
  { icon: 'bulb', title: 'Expert Guidance', text: 'Guidance from people who are the best at what they do.' },
  { icon: 'target', title: 'Result-Focused', text: 'Every move is measured by the results it brings.' },
];

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
  lead: 'From strategy to execution, Makudi brings together the right specialists to deliver the right solution for every brand.',
};

// `reach` lists the real platforms and tools each service works on, shown as brand icons when the
// service is expanded. Each key must exist in brands.js.
export const services = [
  {
    num: '01',
    name: 'Strategy & Branding',
    text: 'Build a brand with purpose and position it for the right audience.',
    help: 'We start by understanding your business, your market and the people you want to reach. From there we shape a clear positioning, a distinct voice and a visual identity that holds together across every touchpoint, so your brand has a strong foundation to grow on.',
    points: ['Audience and market research', 'Positioning, voice and messaging', 'Visual identity guidelines'],
    reach: ['figma', 'behance', 'dribbble', 'notion', 'pinterest'],
  },
  {
    num: '02',
    name: 'Digital & Performance Marketing',
    text: 'Reach the right people through the right digital channels.',
    help: 'We plan and run paid campaigns across search, social and display, built around clear goals and real budgets. Every campaign is tracked and optimised against the numbers that matter, so spend keeps moving toward what actually brings enquiries and sales.',
    points: ['Search, social and display campaigns', 'Budgets tracked against real results', 'Monthly performance reporting'],
    reach: ['googleads', 'google', 'facebook', 'instagram', 'googleanalytics', 'googletagmanager'],
  },
  {
    num: '03',
    name: 'Content & Creative',
    text: 'Create ideas, stories and visuals that make people stop and notice.',
    help: 'Photos, graphics and written content built around what your brand stands for and what your audience actually responds to. We plan it around your calendar and your platforms, so every post feels considered rather than filler.',
    points: ['Photo and graphic content', 'Copywriting in your brand voice', 'A content calendar built around your audience'],
    reach: ['canva', 'photoshop', 'illustrator', 'instagram', 'pinterest'],
  },
  {
    num: '04',
    name: 'Video & Production',
    text: 'Turn your brand story into engaging visual experiences.',
    help: 'From short reels to full brand films, we plan, shoot and edit video that holds attention and tells your story clearly. Every piece is built for the platform it will live on, from a quick vertical reel to a longer, considered brand video.',
    points: ['Concept, shoot and edit, start to finish', 'Short-form video for social platforms', 'Brand films and product videos'],
    reach: ['youtube', 'youtubeshorts', 'premiere', 'instagram', 'facebook'],
  },
  {
    num: '05',
    name: 'Web & Technology',
    text: 'Build digital experiences that attract, engage and convert.',
    help: 'We design and build fast, mobile-friendly websites that make the next step obvious, then set up the search basics so people can find them. Over time we watch what visitors actually do and refine the site to bring in more enquiries.',
    points: ['Mobile-first design that loads fast', 'On-page SEO and local search set-up', 'Tracking, to see what visitors actually do'],
    reach: ['wordpress', 'shopify', 'wix', 'webflow', 'googlesearchconsole', 'semrush'],
  },
  {
    num: '06',
    name: 'PR, Influencer & Offline Marketing',
    text: 'Take your brand beyond the screen and into the real world.',
    help: 'We build relationships with the right influencers and media, and plan offline moments, from launches to print and local activations, that put your brand in front of real people. It is marketing your audience experiences first-hand, not just scrolls past.',
    points: ['Influencer partnerships matched to your brand', 'Press and media outreach', 'Offline activations and launches'],
    reach: ['instagram', 'youtube', 'linkedin', 'x', 'whatsapp'],
  },
];

export const approach = {
  title: 'Our Approach',
  lead: 'What makes us different? We don’t just run campaigns, we build attention with intention.',
  points: [
    { icon: 'compass', title: 'We think before we execute', text: 'Every campaign starts with a strategy, not a template.' },
    { icon: 'users', title: 'We stay close to the work', text: 'Close collaboration, from the first idea to the last report.' },
    { icon: 'chart', title: 'We measure what matters', text: 'Clear numbers, reported in plain language, every month.' },
  ],
};

export const why = {
  sectionLabel: 'About Us',
  panelTitle: ['From a Traditional Sound', 'to a Modern Strategy'],
  panelBody: 'From strategy to execution, we help your brand reach the right people, in the right way.',
  cta: 'About Makudi',
  eyebrow: 'Why Makudi',
  title: 'A Tradition of Drawing Attention.',
  body: [
    'Rooted in a traditional instrument and inspired by its unmistakable presence, Makudi carries an old idea into a new world: Attention matters.',
    'In South Indian lore and traditional arts, the makudi has always held an extraordinary, legendary capability: the sheer power to capture complete, undivided, hypnotic attention with a single sustained tone. It is played to capture the attention, creating a fascinating interplay of sound, movement and response.',
    'That idea inspires us at Makudi. In today’s digital world, your brand is surrounded by countless voices competing for attention. The challenge isn’t simply to be seen, it’s to create something that makes people stop, notice and respond.',
    'The makudi draws attention.',
    'Makudi turns attention into connection.',
  ],
  points: [
    { icon: 'palette', label: 'Creative Approach' },
    { icon: 'chart', label: 'Data-Driven Strategy' },
    { icon: 'heart', label: 'Personalized Support' },
    { icon: 'rocket', label: 'Your Growth, Our Priority' },
  ],
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
  email: 'makudimedia@gmail.com',
  phone: '+91 97780 65727',
  phoneHref: '+919778065727',
  place: 'LR Tower, SJRRA 104, S. Janatha Rd, Palarivattom, Kochi 682025',
  socials: [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'YouTube', href: '#' },
  ],
};
