![Xanyah Logo](./src/assets/images/logo.svg)

# Xanyah Web / Desktop

> [!WARNING]
> This documentation is developer-oriented for contributors. If you are looking for a usage documentation, head to this page: [Self-hosting documentation](https://www.xanyah.io/self-hosting/desktop)

## Requirements

- Node.js >= 22.0
- Yarn >= 1.22

## Getting started

```sh
# Clone the repo and navigate into it
git clone git@github.com:xanyah/desktop.git && cd desktop

# Install dependencies
yarn

# Run the development server
yarn dev
```

## Project architecture

### Dependencies

- [Axios](https://axios-http.com/docs/intro): HTTP Client
- [React Hook Form](https://react-hook-form.com/): Form management
- [React Router](https://reactrouter.com/): Routing
- [React-i18next](https://react.i18next.com/): Internationalization
- [Tailwind](https://tailwindcss.com/): Style management
- [TanStack Query](https://tanstack.com/query): State management
- [TanStack Table](https://tanstack.com/query): Tables management
- [Vite](https://vite.dev/): Build tool
- [Zod](https://zod.dev/): Data validation

### File structure

```md
.github                 # GitHub-related files
public                  # Vite public assets https://vite.dev/guide/build.html#public-base-path
src/
├── api                 # API functions library
├── assets              # Images, fonts etc...
├── components          # Shared components
├── contexts            # React contexts
├── helpers             # Helper functions library
├── hooks               # React hooks
├── i18n/               # i18n config files
│   └── dictionaries/   # i18n localization files
├── layouts             # Layouts used by React Router
├── routes              # Page components
└── types               # Typescript types
```
