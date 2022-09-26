// Really need some type of root
export default [
  {
    title: 'Introduction',
    links: [
      { title: 'Why', href: '/ruby-gems/faker-with-factory-bot' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'Test',
    links: [
      { title: 'Getting started', href: '/' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  { 
    title: 'Types of Plants',
    links: [
      { title: 'Flowers', href: '/flowers' },
      { title: 'Trees', href: '/trees' },
    ]
  },
  { 
    title: 'Hydroponic Kits',
    links: []
  }

] as const;
