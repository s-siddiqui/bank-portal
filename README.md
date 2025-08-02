# Bank Portal - Micro Frontend Architecture

## Project Overview

The **Bank Portal** is a cross-platform customer portal for a bank built using **React**, **React Native Web**, and **Webpack Module Federation**. The architecture is designed to maximize code reuse between web and mobile, and allow independent development, build, and deployment of Micro Frontends (MFEs).

This solution includes:
- A **Host/Shell application** that provides the overall layout and routing.
- Two **Micro Frontends**:
  - **MF1 (Account Overview)**: Displays customer account summary and recent transactions.
  - **MF2 (Transaction History & Details)**: Displays a detailed transaction list and details for a selected transaction.
- A **Shared UI Component Library (ui-kit)** using `react-native-web`.
- A **Mock GraphQL Backend** using `Apollo Server` to serve customers, accounts, and transactions.

---

## Setup and Running Instructions

### Prerequisites
- Node.js >= 18.x
- npm >= 8.x

### Installation

```bash
# Clone the repository
git clone https://github.com/s-siddiqui/bank-portal.git
cd bank-portal

# Install dependencies
npm install
```

### Start All Packages

```bash
# Start the backend, host, and both MFEs concurrently
npm run start:all
```

Or start each individually:

```bash
npm run start:backend
npm run watch:ui-kit
npm run start:host
npm run start:mf-account
npm run start:mf-transactions
```

The host will be available at `http://localhost:3000`.

---

## Architectural Decisions & Justifications

1. **Micro Frontends (MFE)**:
   - Using **Webpack Module Federation** allows us to dynamically load MFE bundles at runtime.
   - Each MFE is **independently buildable** and can be deployed separately without affecting others.

2. **Code Reuse via Shared UI Library**:
   - A `ui-kit` package built with `react-native-web` primitives provides common components (e.g., Button, Card, View).
   - Ensures visual consistency across Host and MFEs.

3. **Cross-MFE Communication**:
   - Implemented using a **global Event Bus**. This decouples MFEs from each other and allows them to communicate without tight coupling.

4. **Backend API**:
   - A **mock GraphQL server** using `Apollo Server` with hardcoded customer, account, and transaction data.
   - MFEs fetch data using Apollo Client for easy migration to a real backend later.

5. **Cross-Platform Support**:
   - All UI is built using **React Native primitives** rendered with `react-native-web`, making the codebase portable to mobile with React Native.

---

## Possible Deployment Plan

1. **Independent Builds**:
   - `ui-kit` → built and published as a private npm package (`@bank/ui-kit`).
   - `mf-account` & `mf-transactions` → independently built and deployed to CDN or static host (e.g., S3, GitHub Pages, Vercel).
   - `host` → consumes deployed `remoteEntry.js` of MFEs dynamically at runtime.

2. **Versioning**:
   - Each package is versioned independently using **semantic versioning**.
   - Host specifies MFE URLs via environment configs (so it can update without rebuild).

3. **CI/CD**:
   - Each package has its own GitHub Actions workflow.
   - On push to main:
     - Run tests, build, and deploy package.
     - If MFEs change, update remoteEntry.js links in Host config.

4. **High Availability**:
   - Since MFEs are deployed separately, failure in one does not break the entire portal.

---

## Known Limitations/Issues & Future Improvements

1. **Mock Backend**:
   - Currently uses hardcoded GraphQL data. Replace with real banking APIs in production.

2. **Routing Integration**:
   - MFEs use their own routing or Event Bus. Deep linking is limited. Future: unify routing between Host and MFEs.

3. **State Management**:
   - Event Bus works but can be brittle. Introduce shared state library (e.g., Zustand, Redux Toolkit or Recoil).

4. **Mobile Build**:
   - Although `react-native-web` is used, we have not yet set up a native mobile build. Future work: add React Native mobile app consuming the same MFEs.

5. **Performance**:
   - Enable chunk splitting, caching, and production optimizations for faster load times.

---

## UI Kit Documentation

The `ui-kit` is a shared library that contains reusable components.

### Features
- Written using **React Native primitives** (`View`, `Text`, `TouchableOpacity`).
- Compatible with **react-native-web** for web rendering.

### Available Components
- **Button**: Styled button with consistent theme.
- **Card**: Container for grouping content.
- **View & Text**: Wrapper components for cross-platform consistency.

### Build & Watch

```bash
# Build UI Kit
npm run build --workspace=ui-kit

# Watch for changes (auto rebuild)
npm run watch --workspace=ui-kit
```

Consume components in Host and MFEs:

```tsx
import { Button, Card } from "ui-kit";
```

---

## Deployment Plan (GitHub Pages Example)

1. Build each package individually:

```bash
npm run build --workspace=backend
npm run build --workspace=ui-kit
npm run build --workspace=mf-account
npm run build --workspace=mf-transactions
npm run build --workspace=host
```

2. Deploy Host and MFE dist folders to GitHub Pages or CDN.

3. Update Host config with deployed MFE URLs (remoteEntry.js).

4. Automate using **GitHub Actions** with caching and independent deployments.

---
