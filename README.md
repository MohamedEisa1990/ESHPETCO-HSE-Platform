# ESHPETCO HSE Management System

Enterprise-grade Health, Safety & Environment Management System for Oil & Gas field operations.

## Features

- **PTW Management**: Create, approve, and track Permits to Work
- **Incident Management**: Report and investigate incidents
- **Risk Assessment**: Comprehensive risk evaluation and control measures
- **Inspections**: Systematic facility inspections with checklists
- **LOTO**: Lockout/Tagout management for equipment maintenance
- **Electrical Isolation**: Manage electrical isolation procedures
- **Gas Testing**: Track confined space gas testing results
- **Analytics & Reporting**: Safety KPIs and trend analysis
- **PWA Support**: Works offline with automatic sync when online
- **Role-Based Access**: Multi-tier permission system
- **Dark Mode**: Professional dark theme support

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Offline Storage**: Dexie (IndexedDB)
- **Routing**: React Router
- **Build**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Header.tsx
│       └── Sidebar.tsx
├── pages/
│   ├── Auth/
│   │   └── Login.tsx
│   ├── PTW/
│   ├── Dashboard.tsx
│   ├── Incidents.tsx
│   ├── Analytics.tsx
│   └── ...
├── stores/
│   ├── authStore.ts
│   └── ptwStore.ts
├── hooks/
│   ├── useOnline.ts
│   └── useDarkMode.ts
├── utils/
│   ├── pwa.ts
│   └── storage.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Role-Based Access Control

- **Admin**: Full system access
- **HSE Manager**: PTW approval, incident management, analytics
- **Engineers**: Department-specific approvals
- **Operations Supervisor**: General PTW approval
- **Area Authority**: Area-level oversight
- **Contractors**: Limited PTW creation and reporting
- **Employees**: Report incidents and near misses

## PWA Features

- Offline-first architecture
- Automatic service worker registration
- Offline data sync
- App install prompts
- Responsive design for all devices

## Security Considerations

- JWT token-based authentication
- Role-based access control (RBAC)
- HTTPS required in production
- Content Security Policy headers
- Regular security audits

## Contributing

Please follow the existing code style and commit message conventions.

## License

Confidential - ESHPETCO