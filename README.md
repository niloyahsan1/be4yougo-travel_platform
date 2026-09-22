# Before You Go (`be4yougo`)

**Before You Go** is an all-in-one smart travel planning and destination discovery platform tailored for seamless travel experiences. It features curated destination guides, interactive trip planners, budget calculators, resort & hotel finders, real-time analytics, and role-based administration.


🌐 **Live Website**: [be4yougo.com](https://be4yougo.com)


## Features
- **Destination Discovery & Guides**
- **Trip Planner & Smart Budget Calculator**
- **Resort & Accommodation Finder**
- **Seasonal & Thematic Itineraries**
- **Real-Time Analytics & Tracking**
- **Role-Based Admin Dashboard**
- **Interactive Live Support**


## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Node.js, Express, JWT, Bcrypt
- **Database**: MySQL (`mysql2/promise`)
- **API & Data**: REST API with custom query adapter


## Run the Development Servers
You can run both the frontend and backend concurrently with one command:
```bash
npm run dev:all
```

Or run them in separate terminals:
```bash
# Terminal 1: Vite Frontend (Runs at http://localhost:8080 or http://localhost:5173)
npm run dev

# Terminal 2: Node/Express API Server (Runs at http://localhost:3001)
npm run server
```


## Project Structure
```text
be4yougo/
├── public/                 # Static assets & public images
├── server/
│   ├── index.js            # Express API server & static file host
│   └── reset-password.js   # CLI utility for password updates
├── src/
│   ├── components/         # Reusable UI & business components
│   ├── hooks/              # Custom React hooks (analytics, tracking, etc.)
│   ├── integrations/       # Custom API adapter (mock Supabase client)
│   ├── lib/                # Utility helpers (safeUuid, formatters, etc.)
│   ├── pages/              # Main route views & subpages
│   ├── App.tsx             # Root routing configuration
│   └── main.tsx            # Application entrypoint
├── DEPLOYMENT.md           # Production deployment & architecture guide
├── schema.sql              # MySQL database schema definition
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies and scripts
```


## Contributors
- [Sajid Rahman](https://www.facebook.com/sajidd.rahman21)
- [Niloy Ahsan](https://github.com/niloyahsan1)


## 🛡️ License
This project is proprietary and confidential. All rights reserved.