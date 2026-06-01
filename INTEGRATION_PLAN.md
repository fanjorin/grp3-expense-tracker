# Frontend-Backend Integration & UI Refactoring Plan

This document outlines the roadmap for connecting the Next.js frontend with the Node.js/Prisma backend, while simultaneously unifying the UI architecture.

## 1. Core API Configuration
- **Base URL:** `http://localhost:5000/api/v1` (configurable via `.env` as `NEXT_PUBLIC_API_URL`)
- **Authentication:** Bearer Token (JWT) in the `Authorization` header.
- **Content-Type:** `application/json` (except for receipt uploads).

---

## 2. UI Architecture & Component Unification
Currently, several components (like Sidebars) are duplicated across page folders. These will be moved to the global `components/` directory.

### Global Component Migration
| Component | Status | Action |
| :--- | :--- | :--- |
| `Sidebar.jsx` | Duplicated | Consolidate into `app/components/Sidebar.jsx`. Support `activePage` prop. |
| `Navbar.jsx` | Fragmented | Ensure `Navbar.jsx` and `LandingNavbar.jsx` share the same `Logo` and base styles. |
| `Logo.jsx` | Good | Keep as the primary branding source for all headers. |

### Layout Standardization
- Implement a `(dashboard)` route group with a shared `layout.js` to avoid re-rendering the Sidebar/Navbar on every page transition.
- Ensure consistent padding (`p-8`) and background colors (`bg-gray-50`) across all dashboard views.

---

## 3. Route Restructuring & Cleanup
Standardize naming conventions to kebab-case and fix case-sensitivity issues.

### Proposed Route Changes
| Current Path | Target Path | Reason |
| :--- | :--- | :--- |
| `/Forgotpassword` | `/forgot-password` | Consistency (kebab-case). |
| `/Password` | `/signup/set-password` | Part of the onboarding flow. |
| `/Verify-email/verify` | `/verify-email` | Simplify nested structure. |
| `/forgot-password-verification` | `/forgot-password/verify` | Logical grouping. |

---

## 4. Authentication & Onboarding
Connecting the multi-step signup and password recovery flow.

### Endpoints
| Endpoint | Method | Payload | Description |
| :--- | :--- | :--- | :--- |
| `/auth/signup` | `POST` | `{ firstName, lastName, email, phone }` | Initial registration step. |
| `/auth/password/create` | `POST` | `{ email, password }` | Step 2 of signup. |
| `/auth/forgot-password` | `POST` | `{ email }` | Sends reset code to user. |
| `/auth/verify-code` | `POST` | `{ email, code }` | Validates 6-digit OTP. |
| `/auth/reset-password` | `POST` | `{ email, newPassword }` | Updates password after verification. |

---

## 5. Transaction & Analytics
Replacing placeholders in `app/page.js` (Dashboard) and `app/reports/`.

### Transaction Endpoints
- `GET /transactions`: Fetch with query params for filtering.
- `POST /transactions`: Create new.
- `DELETE /transactions/:id`: Remove.
- `POST /transactions/upload`: Handle receipt image upload.

### Analytic Aggregations
- `GET /budget/summary`: Returns `{ totalBudget, spent, remaining, percentage }`.
- `GET /reports/categories`: Returns `{ name, amount, percentage, color }[]`.
- `GET /reports/stats`: Returns comparative data vs last month.

---

## 6. Implementation Phases

### Phase 1: UI Unification & Routing (Completed)
- [x] Move landing page to root and dashboard to `/dashboard`.
- [x] Create login page and interlink with signup page.
- [x] Hook up landing page CTA buttons to auth flow.
- [x] Move dashboard routes (`/reports`, `/settings`, `/add-expense`) under `/dashboard`.
- [x] Create unified `Sidebar.jsx` in `app/components/`.
- [x] Implement shared `dashboard/layout.jsx` with persistent Sidebar.
- [x] Remove Navbar from dashboard views.
- [x] Standardize all route names to kebab-case (`forgot-password`, `signup/set-password`, `verify-email`).

### Phase 2: Authentication Integration (Completed)
- [x] Implement JWT login/signup on backend.
- [x] Implement Password Reset logic on backend.
- [x] Connect `EmailForm.jsx`, `OtpInput.jsx`, and `SignUpPage` to backend.
- [x] Implement `authAPI` service in `services/api.js`.

### Phase 3: Transaction CRUD & Budget (Completed)
- [x] Implement real Prisma-backed transaction and budget endpoints.
- [x] Protect routes with JWT authentication middleware.
- [x] Update `transactionAPI` and `budgetAPI` in `services/api.js`.
- [x] Replace hardcoded budget values in `BudgetBanner.jsx`.
- [x] Connect `ExpenseList.jsx` and `ExpenseForm.jsx` to real APIs.

### Phase 4: Reports & Analytics (Completed)
- [x] Implement dynamic charting data for `Charts.jsx`.
- [x] Implement comparative stats for `SummaryCards.jsx`.
- [x] Build the report category aggregation API.
