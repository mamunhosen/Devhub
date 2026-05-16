# DevHub

A modern React application built with TypeScript, Vite, Material UI (MUI), and TanStack Query. This project focuses on a modular architecture, reusable UI components, and a robust data-fetching layer.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [Material UI (MUI) v7](https://mui.com/)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest)
- **Styling:** Emotion (Styled Components)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **API Client:** Axios

## 📂 Project Structure

```text
src/
├── app/              # Global providers (Auth, Theme, QueryClient)
├── assets/           # Static assets (fonts, images)
├── components/       # Reusable UI components (Input, Select, Button, etc.)
├── layouts/          # Layout wrappers (MainLayout with responsive header)
├── libs/             # Core libraries (apiClient, dataset hooks, utilities)
│   ├── apiClient/    # Axios instance with interceptors (Auth)
│   ├── datasets/     # Abstracted data fetching layer (registry, hooks)
│   └── hooks/        # Shared React hooks (useDebounce, useVirtualizer)
├── pages/            # Feature-based page components
├── routes/           # Route definitions and configuration
└── test/             # Global test setup
```

## ✨ Key Features

- **Modular Layout**: Responsive `MainLayout` with a sticky header and mobile-friendly drawer navigation.
- **Dataset System**: An abstracted layer built on top of TanStack Query that handles both regular and infinite (cursor/offset) pagination with centralized configuration.
- **Advanced UI Components**:
  - Custom `AppInput` with built-in loading states, security icons, and refined styling for adornments.
  - Paginated and remote-search `Select` components.
- **Theme System**: Custom MUI theme with Raleway font integration and dark/light mode support.
- **Authentication**: Built-in auth context with token refresh logic via Axios interceptors.

## 🛠️ Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

Run all tests:

```bash
npm test
```

Run tests in UI mode:

```bash
npx vitest --ui
```

## 🧪 Testing Policy

The project uses **Vitest** for unit and integration testing. We prioritize:

- **Hook Testing**: Ensuring data fetching and debouncing logic is robust.
- **Component Testing**: Verifying UI behavior, accessibility, and visual states.
- **Mocking**: Using `vi.mock` for external dependencies (API client, registries) to ensure isolated tests.

---

Built with ❤️ by the Mamun Hosen.
