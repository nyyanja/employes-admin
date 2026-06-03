# Employes Admin

A HR back-office built with React-Admin to manage employees and interns.

## Tech Stack
- React + TypeScript
- React-Admin
- JSON Server
- Material UI

## Resources
- **Employees** — full CRUD, quick status toggle, department stats
- **Interns** — full CRUD, manager reference, conditional stipend validation, quick add modal

## Hooks Used
- `useRecordContext` — dynamic titles and context-aware components
- `useGetOne` — ManagerCard to load manager details
- `useGetList` — InternsByManager, DepartmentStats, Dashboard indicators
- `useCreate` — quick add intern modal without leaving the list
- `useUpdate` — toggle employee active status inline

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