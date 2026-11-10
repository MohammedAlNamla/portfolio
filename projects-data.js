// Biggest project first. This list drives both the cards and the details sheet.
const projects = [
  {
    id: 'restrogram',
    name: 'RestroGram',
    type: 'Restaurant point of sale and operations',
    tag: 'Restaurant SaaS',
    summary: 'One system for the whole restaurant: orders, checkout, kitchen and stock.',
    image: 'images/covers/restrogram.webp',
    detailImage: 'images/projects/restrogram/main.webp',
    tint: '#f4f0fb',
    // url: 'https://sufra.live/',
    meta: ['Full-stack', 'Live', 'Laravel', 'Nuxt', 'PostgreSQL', 'Flutter'],
    business: [
      ['Why I built it', "At rush hour a restaurant can't lose an order between the cashier and the kitchen, so everything had to work as one system."],
      ['Who uses it', 'Cashiers, waiters, the kitchen, managers and HR, each with their own screens.'],
      ["What's inside", 'Point of sale, tables, kitchen display, QR menu, stock and suppliers, the cost of each dish, customers, staff and reports.'],
      ['Today', 'It runs every day with real restaurants and their customers.']
    ],
    engineering: [
      ['When the internet drops', "Orders are saved on the device and sync when the connection is back, so the shift doesn't stop."],
      ['One backend', 'The dashboard, the admin panel and the staff app all run on one Laravel API, for many stores.'],
      ['Printing', "The Flutter staff app also works as the restaurant's print hub."]
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
    summary: 'Online booking for salons, clinics and spas, with the calendar, clients and reports behind it.',
    image: 'images/covers/bookforme.webp',
    detailImage: 'images/projects/bookforme/main.webp',
    tint: '#fcf4f9',
    url: 'https://www.bookforme.com/',
    meta: ['Full-stack', 'Laravel', 'Nuxt', 'WebSockets'],
    business: [
      ['The idea', 'Many salons and clinics still take bookings by phone and message. Here customers book on their own.'],
      ['Who uses it', "Owners and staff run their day from it, customers book from the app or the store's own page, and a platform team manages every store."],
      ["What's inside", 'Bookings and calendar, services, packages and memberships, clients and gift cards, stock and suppliers, marketing and reminders, staff and permissions, and reports, in Arabic and English.']
    ],
    engineering: [
      ['Every store on its own', 'Each store keeps its data separate, even though all stores share the same apps.'],
      ['Finding a free time', 'An open slot depends on staff, services, working hours and blocked time, all checked together.'],
      ['A live calendar', 'When a booking changes, everyone sees it right away through Laravel Reverb.']
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
    summary: 'One place for software teams to plan sprints, move tasks and talk.',
    image: 'images/covers/taskat.webp',
    detailImage: 'images/projects/taskat/main.webp',
    tint: '#eef1fa',
    meta: ['Full-stack', 'Laravel', 'Nuxt', 'WebSockets'],
    business: [
      ['The idea', 'Many software teams split planning, tasks and conversation across several tools. Taskat keeps them together.'],
      ['How teams use it', 'From the backlog to planning a sprint, working through it and closing it.'],
      ["What's inside", 'Drag-and-drop Kanban boards, sprints and backlog, custom statuses per project, comments and attachments, a "Your Work" view, team invites, notifications and chat.']
    ],
    engineering: [
      ['Permissions per project', 'Someone can lead one project and only view another, so roles are checked per project, not per account.'],
      ['Nothing gets lost', 'Every change to a task or project is kept in a clear history.'],
      ['Chat inside the tool', 'Channels, reactions and pinned messages, live over broadcasting.']
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
    summary: 'An education platform where admins, teachers and students each get their own space.',
    image: 'images/covers/edux.webp',
    detailImage: 'images/projects/edux/main.webp',
    tint: '#eaf6f8',
    meta: ['Full-stack', 'In development', 'NestJS', 'PostgreSQL', 'Flutter'],
    business: [
      ['The idea', 'Teachers and students need their lessons, files and subscriptions organised in one place.'],
      ['Who uses it', 'Admins, teachers and students, each with their own screens.'],
      ['Where it is now', 'Still in development. I started with the admin side.']
    ],
    engineering: [
      ['Organised by domain', 'Each role gets its own interface, but the logic behind it is written once.'],
      ['A clear path for every request', 'Each request passes guards, validation, services and repositories before it reaches Prisma.'],
      ['Safe IDs', 'The API only shows UUIDs. Numeric IDs stay inside the database.']
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
    summary: 'The university website, and the system its staff use to publish news, events and pages in several languages.',
    image: 'images/covers/uop.webp',
    detailImage: 'images/projects/uop/main.webp',
    tint: '#f6f2fb',
    url: 'https://up.edu.ps/ar',
    meta: ['Full-stack', 'Laravel', 'Nuxt', 'Vue', 'Inertia'],
    business: [
      ['The need', 'A university publishes a lot of official content in more than one language, and it has to stay up to date.'],
      ['Who uses it', 'Editors work from the dashboard. Students and visitors read the public site.'],
      ["What's inside", 'News and events, exam schedules, galleries, high school results, partnerships and research, success stories, colleges and majors, and any new page, in Arabic and English.']
    ],
    engineering: [
      ['New pages, no developer', 'An editor creates a page in the dashboard and it goes live on its own.'],
      ['Front and back apart', 'The public site reads from a JSON API, so it stays independent of the admin system.'],
      ['A documented API', "Every endpoint is described with OpenAPI 3.0, so the next developer doesn't have to guess."]
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
    summary: 'One system for an internet provider: prepaid cards, loyalty points, support and field work.',
    image: 'images/covers/netspeed.webp',
    detailImage: 'images/projects/netspeed/main.webp',
    tint: '#edf8f6',
    // url: 'https://points.red-radius.com',
    meta: ['Full-stack', 'Laravel', 'jQuery', 'SMS'],
    business: [
      ['Why it exists', 'Cards, customers, support tickets and field visits had to live in one place.'],
      ['Who uses it', 'Admins, support and field technicians run the work. Customers collect points and swap them for gifts.'],
      ["What's inside", 'Prepaid cards, points and gifts, support tickets, installations and repairs, equipment custody, SMS verification and usage charts.']
    ],
    engineering: [
      ['It talks to the routers', 'Hotspot routers call a public API to check a card and start the session.'],
      ['A role for each job', 'Each admin role sees only what it needs.'],
      ['Everything is traceable', 'Logins and admin actions are logged for review.']
    ],
    shots: [
      { image: 'images/projects/netspeed/01-customer-dashboard.webp', caption: 'Customer balance, cards and gifts' },
      { image: 'images/projects/netspeed/02-cards-points.webp', caption: 'Prepaid cards and the points they earn' },
      { image: 'images/projects/netspeed/03-gifts.webp', caption: 'Redeeming points for gifts' },
      { image: 'images/projects/netspeed/04-support-field-work.webp', caption: 'Support tickets and field work' }
    ]
  },
  {
    id: 'er-atlas',
    name: 'ER Atlas',
    type: 'Visual database schema explorer',
    tag: 'Developer tool',
    summary: 'A tool I built for myself to read large databases and plan changes without fear.',
    image: 'images/covers/er-atlas.webp',
    detailImage: 'images/projects/er-atlas/main.webp',
    tint: '#f2f1fa',
    meta: ['Personal tool', 'Node.js', 'JavaScript', 'PostgreSQL'],
    business: [
      ['Why I built it', 'Large database schemas are hard to read, and changing them is risky.'],
      ['Who it is for', 'Developers who want to understand the tables and prepare changes on their own machine.'],
      ['What you get', 'Diagrams, table details, relationships and change drafts.']
    ],
    engineering: [
      ['Drafts first', 'No change touches the database directly. It stays a draft until you review it.'],
      ['Suggestions from real code', 'It looks at how the code actually uses the tables, not only names and keys.'],
      ['Small and local', 'A small Node server and plain JavaScript, running on your machine.']
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
