// Biggest project first. This list drives both the cards and the details sheet.
// crop = [zoom, x, y]; projects can also supply separate detail and gallery images.
const projects = [
  {
    id: 'restrogram',
    name: 'RestroGram',
    type: 'Restaurant point of sale and operations',
    tag: 'Restaurant SaaS',
    summary: 'Connects order taking, checkout, kitchen screens and stock control.',
    image: 'images/covers/restrogram.webp',
    detailImage: 'images/projects/restrogram/main.webp',
    tint: '#f4f0fb',
    url: 'https://sufra.live/',
    meta: ['Full-stack', 'Live', 'Laravel', 'Nuxt', 'PostgreSQL', 'Flutter'],
    business: [
      ['The problem', 'Restaurants need orders, tables, checkout and kitchen workflow to work as one system.'],
      ['Who uses it', 'Cashiers take orders, kitchen staff track preparation, and managers oversee operations and stock.'],
      ['Where it stands', 'Live, with real restaurant owners and customers.']
    ],
    engineering: [
      ['A POS that survives outages', "Orders queue in IndexedDB and sync on reconnect, so a dropped line doesn't stop a busy shift."],
      ['One backend for every app', 'A single Laravel API serves the dashboard, operator console and staff app across many stores.'],
      ['Central printing', 'A Flutter staff app doubles as the central print device for the restaurant.']
    ],
    shots: [
      { image: 'images/projects/restrogram/01-point-of-sale.webp', caption: 'Point of sale with extras, discounts and split payments' },
      { image: 'images/projects/restrogram/02-kitchen-display.webp', caption: 'Kitchen display, from new order to ready' },
      { image: 'images/projects/restrogram/03-tables.webp', caption: 'Live table status across the floor' },
      { image: 'images/projects/restrogram/04-digital-menu.webp', caption: 'QR menu that guests order from' },
      { image: 'images/projects/restrogram/05-stock-costing.webp', caption: 'Stock levels and the food cost of each dish' },
      { image: 'images/projects/restrogram/07-offline-devices.webp', caption: 'Orders queue offline and sync across devices' }
    ]
  },
  {
    id: 'bookforme',
    name: 'BookForMe',
    type: 'Booking platform for service businesses',
    tag: 'Booking platform',
    summary: 'Lets salons, clinics and spas take bookings online and manage calendars, clients and reports.',
    image: 'images/covers/bookforme.webp',
    detailImage: 'images/projects/bookforme/main.webp',
    tint: '#fcf4f9',
    url: 'https://www.bookforme.ps',
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
    ],
    shots: [
      { image: 'images/projects/bookforme/01-customer-booking.webp', caption: 'Customers choose a time and confirm online' },
      { image: 'images/projects/bookforme/02-team-calendar.webp', caption: 'One calendar for the whole team' },
      { image: 'images/projects/bookforme/03-staff-booking.webp', caption: 'Staff booking several services in one go' },
      { image: 'images/projects/bookforme/04-client-profile.webp', caption: 'Bookings and memberships in the client profile' },
      { image: 'images/projects/bookforme/05-sales-gift-cards.webp', caption: 'Sales, product orders and gift cards' },
      { image: 'images/projects/bookforme/06-reports.webp', caption: 'Revenue, bookings and client reports' },
      { image: 'images/projects/bookforme/07-inventory.webp', caption: 'Stocktakes, products and suppliers' },
      { image: 'images/projects/bookforme/08-marketing.webp', caption: 'Automatic messages for booking updates' },
      { image: 'images/projects/bookforme/09-platform-admin.webp', caption: 'One admin panel across all stores' }
    ]
  },
  {
    id: 'taskat',
    name: 'Taskat',
    type: 'Agile project management tool',
    tag: 'Project tool',
    summary: 'Keeps software teams in one place, from backlog and sprints to Kanban boards and chat.',
    image: 'images/covers/taskat.webp',
    detailImage: 'images/projects/taskat/main.webp',
    tint: '#eef1fa',
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
    ],
    shots: [
      { image: 'images/projects/taskat/01-backlog-sprints.webp', caption: 'Backlog and sprint planning' },
      { image: 'images/projects/taskat/02-kanban-board.webp', caption: 'Kanban board with types, priorities and owners' },
      { image: 'images/projects/taskat/03-task-history.webp', caption: 'Task details and a full change history' },
      { image: 'images/projects/taskat/04-channels.webp', caption: 'Channels, direct messages and pinned messages' },
      { image: 'images/projects/taskat/05-team-permissions.webp', caption: 'Team members and roles for each project' }
    ]
  },
  {
    id: 'edux',
    name: 'Edux',
    type: 'Education platform for teachers and students',
    tag: 'Education',
    summary: 'Gives administrators, teachers and students their own space for educational content.',
    image: 'images/covers/edux.webp',
    detailImage: 'images/projects/edux/main.webp',
    tint: '#eaf6f8',
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
    ],
    shots: [
      { image: 'images/projects/edux/01-subjects.webp', caption: 'Subjects with lessons, students, prices and readiness' },
      { image: 'images/projects/edux/02-media-library.webp', caption: 'Media library for videos and PDF files' },
      { image: 'images/projects/edux/03-students.webp', caption: 'Student subscriptions and lesson progress' },
      { image: 'images/projects/edux/04-subscription-requests.webp', caption: 'Reviewing payment proof before activating' },
      { image: 'images/projects/edux/05-subjects-teachers.webp', caption: 'Subjects, grades and missing teachers' }
    ]
  },
  {
    id: 'uop',
    name: 'University of Palestine',
    type: 'University website and CMS',
    tag: 'University CMS',
    summary: 'Lets university staff publish news, events, exams and pages in several languages.',
    image: 'images/covers/uop.webp',
    detailImage: 'images/projects/uop/main.webp',
    tint: '#f6f2fb',
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
    ],
    shots: [
      { image: 'images/projects/uop/01-public-website.webp', caption: 'Public website on desktop and mobile' },
      { image: 'images/projects/uop/02-admissions.webp', caption: 'Admissions steps and required documents' },
      { image: 'images/projects/uop/03-posts.webp', caption: 'Posts across sites and colleges' },
      { image: 'images/projects/uop/04-create-post.webp', caption: 'Writing a post with its language, category and site' },
      { image: 'images/projects/uop/05-section-editor.webp', caption: 'Editing a section with a live preview' }
    ]
  },
  {
    id: 'netspeed',
    name: 'NetSpeed',
    type: 'Internet service management system',
    tag: 'ISP management',
    summary: "Manages an internet provider's prepaid cards, loyalty points, support tickets and field work.",
    image: 'images/covers/netspeed.webp',
    detailImage: 'images/projects/netspeed/main.webp',
    tint: '#edf8f6',
    url: 'https://points.red-radius.com',
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
    ],
    shots: [
      { image: 'images/projects/netspeed/01-customer-dashboard.webp', caption: 'Customer balance, cards and gifts' },
      { image: 'images/projects/netspeed/02-cards-points.webp', caption: 'Prepaid cards and the points they earn' },
      { image: 'images/projects/netspeed/03-gifts.webp', caption: 'Redeeming points for gifts' },
      { image: 'images/projects/netspeed/04-support-field-work.webp', caption: 'Support tickets and field work' }
    ]
  },
  {
    id: 'shahrazad',
    name: 'Shahrazad Tours',
    type: 'Booking API for flights, transfers and travel eSIMs',
    tag: 'Travel API',
    summary: 'One API for booking flights and transfers and buying travel eSIMs, with guest checkout.',
    image: 'images/covers/shahrazad.webp',
    detailImage: 'images/projects/shahrazad/main.webp',
    tint: '#f5efe6',
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
    ],
    shots: [
      { image: 'images/projects/shahrazad/01-flights.webp', caption: 'Flight details, based on the Figma designs' },
      { image: 'images/projects/shahrazad/02-transfers.webp', caption: 'Airport transfers, based on the Figma designs' },
      { image: 'images/projects/shahrazad/03-esim.webp', caption: 'Travel eSIM plans, based on the Figma designs' },
      { image: 'images/projects/shahrazad/04-guest-booking.webp', caption: 'Opening a booking without an account' },
      { image: 'images/projects/shahrazad/05-how-it-works.webp', caption: 'One API in front of many providers' }
    ]
  },
  {
    id: 'er-atlas',
    name: 'ER Atlas',
    type: 'Visual database schema explorer',
    tag: 'Developer tool',
    summary: 'Makes large database schemas easier to explore, with diagrams and reviewable change drafts.',
    image: 'images/covers/er-atlas.webp',
    detailImage: 'images/projects/er-atlas/main.webp',
    tint: '#f2f1fa',
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
    ],
    shots: [
      { image: 'images/projects/er-atlas/01-ai-assistant.webp', caption: 'AI assistant that separates facts from guesses' },
      { image: 'images/projects/er-atlas/02-draft-review.webp', caption: 'Reviewing changes as a draft' },
      { image: 'images/projects/er-atlas/03-table-details.webp', caption: 'Columns, keys and relationships of a table' },
      { image: 'images/projects/er-atlas/04-topics.webp', caption: 'Tables grouped by topic' },
      { image: 'images/projects/er-atlas/05-table-catalog.webp', caption: 'Searching every table in dark mode' }
    ]
  }
];
