// Biggest project first. This list drives both the cards and the details sheet.
// crop = [zoom, x, y] for the cover image; shots = crops of the same image shown in the gallery.
const projects = [
  {
    id: 'restrogram',
    name: 'RestroGram',
    type: 'Restaurant menu, ordering and POS SaaS',
    tag: 'Restaurant SaaS',
    summary: 'Runs a restaurant from one system: QR menu, ordering, POS, kitchen screens and reports.',
    image: '../../images/Sufra.webp',
    url: 'https://sufra.live/',
    crop: ['132%', '93%', '2%'],
    meta: ['Full-stack', 'Live', 'Laravel', 'Nuxt', 'PostgreSQL', 'Flutter'],
    business: [
      ['The problem', 'Restaurants need their menu, orders, tables and till to work as one system.'],
      ['Who uses it', 'Owners and staff run the dashboard, POS and kitchen screens. Diners order from the menu.'],
      ['Where it stands', 'Live, with real restaurant owners and customers.']
    ],
    engineering: [
      ['A POS that survives outages', "Orders queue in IndexedDB and sync on reconnect, so a dropped line doesn't stop a busy shift."],
      ['One backend for every app', 'A single Laravel API serves the menu, dashboard, operator console and staff app across many stores.'],
      ['Central printing', 'A Flutter staff app doubles as the central print device for the restaurant.']
    ],
    shots: [
      { crop: ['240%', '39%', '4%'], caption: 'Owner dashboard and reports' },
      { crop: ['313%', '97.5%', '6%'], caption: 'Kitchen display, live orders' },
      { crop: ['284%', '97%', '90%'], caption: 'Point of sale' }
    ]
  },
  {
    id: 'bookforme',
    name: 'BookForMe',
    type: 'Booking platform for service businesses',
    tag: 'Booking platform',
    summary: 'Lets salons, clinics and spas take bookings online and manage calendars, clients and reports.',
    image: '../../images/BFM.webp',
    url: 'https://www.bookforme.ps',
    crop: ['178%', '49%', '14.5%'],
    meta: ['Full-stack', 'Laravel', 'Nuxt', 'WebSockets'],
    business: [
      ['The problem', 'Salons, clinics and spas need online booking without managing calls and messages by hand.'],
      ['Who uses it', 'Store owners and staff manage the business. Customers find a store and book a time.'],
      ['What it covers', 'Bookings, calendar, clients, inventory, marketing and reports.']
    ],
    engineering: [
      ['Multi-tenant by design', 'Each store keeps its own isolated data across several connected apps.'],
      ['Availability logic', 'Calendars combine staff, services, working hours and blocked time.'],
      ['Live updates', 'Laravel Reverb pushes real-time changes over WebSockets.']
    ]
  },
  {
    id: 'taskat',
    name: 'Taskat',
    type: 'Agile project management tool',
    tag: 'Project tool',
    summary: 'Keeps software teams in one place, from backlog and sprints to Kanban boards and chat.',
    image: '../../images/Taskat.webp',
    crop: ['136%', '95%', '2%'],
    meta: ['Full-stack', 'Laravel', 'Nuxt', 'WebSockets'],
    business: [
      ['The problem', 'Software teams need planning, tracking and team conversation in one place.'],
      ['Who uses it', 'Teams working from backlog to sprint planning, active sprint and completion.'],
      ['What it covers', 'Kanban boards, sprints, backlog, team invitations and built-in chat.']
    ],
    engineering: [
      ['Permissions per project', 'Role-based access is checked for each project, not only per account.'],
      ['A full audit trail', 'Every change to issues and projects is kept in a readable history.'],
      ['Real-time chat', 'Channels, reactions and pinned messages run on broadcasting.']
    ]
  },
  {
    id: 'edux',
    name: 'Edux',
    type: 'Education platform for teachers and students',
    tag: 'Education',
    summary: 'Gives administrators, teachers and students their own space for educational content.',
    image: 'demo/edux.svg',
    demo: true,
    crop: ['100%', '50%', '50%'],
    meta: ['Full-stack', 'In development', 'NestJS', 'PostgreSQL', 'Flutter'],
    business: [
      ['The problem', 'Teachers and students need structured educational content in one place.'],
      ['Who uses it', 'Administrators, teachers and students, each with their own interface.'],
      ['Where it stands', 'In development, starting with platform administration.']
    ],
    engineering: [
      ['Organised by domain', 'Roles get separate interfaces without duplicating the business modules behind them.'],
      ['A strict request path', 'Requests pass through protection layers, validation, services and repositories before Prisma.'],
      ['Safe public IDs', 'The API exposes UUIDs only, while the database can use numeric IDs inside.']
    ]
  },
  {
    id: 'uop',
    name: 'University of Palestine',
    type: 'University website and CMS',
    tag: 'University CMS',
    summary: 'Lets university staff publish news, events, exams and pages in several languages.',
    image: '../../images/UOP.webp',
    url: 'https://up.edu.ps/ar',
    crop: ['235%', '36%', '5%'],
    meta: ['Full-stack', 'Laravel', 'Nuxt', 'Vue', 'Inertia'],
    business: [
      ['The problem', 'A university needs to publish and update all its official content in several languages.'],
      ['Who uses it', 'Content editors work in the dashboard. Students and visitors use the public site.'],
      ['What it covers', 'News, events, exams, galleries, success stories and custom pages.']
    ],
    engineering: [
      ['Pages without deploys', 'Any page created in the dashboard is served automatically by a catch-all route.'],
      ['A headless API', 'A JSON API keeps the public site separate from the admin system.'],
      ['Documented surface', 'The API is described with OpenAPI 3.0.']
    ]
  },
  {
    id: 'netspeed',
    name: 'NetSpeed',
    type: 'Internet service management system',
    tag: 'ISP management',
    summary: "Manages an internet provider's prepaid cards, loyalty points, support tickets and field work.",
    image: '../../images/NetSpeed.webp',
    url: 'https://points.red-radius.com',
    crop: ['279%', '33%', '2%'],
    meta: ['Full-stack', 'Laravel', 'jQuery', 'SMS'],
    business: [
      ['The problem', 'An internet provider needs cards, customers, support and field work in one system.'],
      ['Who uses it', 'Admins and support staff run operations. Customers earn points and redeem gifts.'],
      ['What it covers', 'Prepaid cards, loyalty points, support tickets, installations and repairs.']
    ],
    engineering: [
      ['Connected to hardware', 'Hotspot routers call a public API to authenticate a card and start a session.'],
      ['Granular admin roles', 'Each admin role has its own set of permissions.'],
      ['Traceable activity', 'Logins and admin actions are logged for review.']
    ]
  },
  {
    id: 'shahrazad',
    name: 'Shahrazad Tours',
    type: 'Booking API for flights, transfers and travel eSIMs',
    tag: 'Travel API',
    summary: 'One API for booking flights and transfers and buying travel eSIMs, with guest checkout.',
    image: 'demo/shahrazad.svg',
    demo: true,
    crop: ['100%', '50%', '50%'],
    meta: ['Backend', 'At Fikritak', 'Laravel 12', 'MySQL'],
    business: [
      ['The idea', 'One place for travellers to book flights and transfers and buy eSIMs.'],
      ['How it works', 'The platform sells through external providers and tracks each order for the customer.'],
      ['Who uses it', 'Travellers book without an account. Support staff follow orders from admin tools.']
    ],
    engineering: [
      ['Providers behind one interface', 'Business logic talks to one provider interface, so a provider can change without touching it.'],
      ['Booking without an account', 'A short reference and an email open a booking without signing in.'],
      ['Staying in sync', 'Provider webhooks and scheduled checks keep local orders up to date.']
    ]
  },
  {
    id: 'er-atlas',
    name: 'ER Atlas',
    type: 'Visual database schema explorer',
    tag: 'Developer tool',
    summary: 'Makes large database schemas easier to explore, with diagrams and reviewable change drafts.',
    image: 'demo/er-atlas.svg',
    demo: true,
    crop: ['100%', '50%', '50%'],
    meta: ['Personal tool', 'Node.js', 'JavaScript', 'PostgreSQL'],
    business: [
      ['The problem', 'Large database schemas are hard to read and risky to change.'],
      ['Who uses it', 'Developers exploring tables and preparing schema changes on their own machine.'],
      ['What it covers', 'Diagrams, table inspection, relationships and change drafts.']
    ],
    engineering: [
      ['Drafts before changes', 'Edits are proposed as drafts for review instead of being written to the database.'],
      ['Suggestions from real usage', 'Suggestions use how code uses tables, not only names and foreign keys.'],
      ['Small and local', 'A local Node server with a plain JavaScript front end.']
    ]
  }
];
