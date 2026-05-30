# Employes Admin

A HR back-office built with React-Admin to manage employees and interns (list, create, edit, delete).

## Tech Stack
- React + TypeScript
- React-Admin
- JSON Server

## Resources
- **Employees** — full CRUD with search and department filter
- **Interns** — full CRUD with manager reference, contract type and stipend validation

## Stipend Rules
- Internship ≤ 2 months → 0 € (not required)
- Internship > 2 months → minimum 627 €/month required

## Getting Started

Terminal 1 — Start the API:
```bash
npx json-server db.json --port 3002
```

Terminal 2 — Start the app:
```bash
npm run dev
```