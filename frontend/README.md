
# IMS Frontend (Vite + React + Tailwind)

Role-based prototype for Smart Inventory Management System.

## Quick Start

```bash
cd ims-frontend
npm install
npm run dev
```

Open the URL that Vite shows (usually http://localhost:5173).

## Pages
- `/` Home (choose Guest/User/Admin)
- `/guest` Public inventory view
- `/login-user` Dummy user login (any username/password)
- `/login-admin` Dummy admin login (username: admin, any password)
- `/user` User dashboard (cards + requests table)
- `/admin` Admin dashboard (stats + inventory + requests)

## Notes
- Role is managed in a lightweight React Context.
- Sidebar is responsive (hidden on mobile, toggled with ☰).
- Dummy data is in `src/data/dummyData.js` — replace later with API calls.
