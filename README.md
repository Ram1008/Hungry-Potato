# Hungry Potato

**A restaurant ordering frontend connecting customer, kitchen, manager, and administrator workflows.**

Built with React, Vite, and Sass. This repository contains the client application and API integration layer; it requires a compatible backend for authentication, restaurant data, and order operations.

## Explore the workflows

| View | Purpose |
| --- | --- |
| Customer | Browse dishes, customize an order, use the cart, and view a profile. |
| Kitchen | Work with incoming orders through the cook interface. |
| Manager | View operational tables and orders. |
| Administrator | Manage dishes, tables, and users through dedicated screens. |
| Status display | Present order status in a separate view. |

## Technical highlights

- React Router separates customer and staff views.
- Context providers manage authentication, dishes, users, and order state.
- The API layer supports dish images, order updates, table operations, and billing requests.
- Socket.IO client support is included for event-driven updates.
- Sass organizes styles alongside UI components.

## Run locally

```bash
git clone https://github.com/Ram1008/Hungry-Potato.git
cd Hungry-Potato
npm install
npm run dev
```

Before testing data-dependent workflows, review the API host in [src/constants/appConstants.js](src/constants/appConstants.js) and configure it for your backend. Use test accounts and sample restaurant data.

Available commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite locally. |
| `npm run build` | Build the frontend. |
| `npm run preview` | Preview the local production build. |
| `npm run lint` | Run the configured ESLint checks. |

## Source guide

- [src/App.jsx](src/App.jsx): routes and top-level providers.
- [src/api.js](src/api.js): API requests for restaurant operations.
- [src/component](src/component): reusable UI components.
- [src/container](src/container): customer and staff views.
- [src/context](src/context): shared application state.

## Scope and limitations

The frontend alone does not provide a working restaurant backend. Authentication, payment, and order completion need an appropriately configured service and end-to-end validation. Client-side views are not a substitute for server-side role authorization.
