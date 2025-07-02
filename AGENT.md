# AGENT.md - Hack Club Site Development Guide

## Commands
- **Dev**: `yarn dev` (start development server)
- **Build**: `yarn build` (production build)
- **Lint**: `yarn lint` (Next.js ESLint)
- **Format**: `yarn format` (Prettier formatting)
- **Start**: `yarn start` (production server)
- **Test**: No test framework configured

## Code Style
- **Imports**: Use relative imports (`../components/nav`), Theme UI components (`{ Box, Text }`)
- **Formatting**: Single quotes, no semicolons, no trailing commas, 80 char width
- **Components**: Functional components with destructured props, default exports
- **Styling**: Theme UI `sx` prop for styling, styled components with @emotion/styled
- **Types**: TypeScript enabled but strict mode off, prefer implicit typing
- **Naming**: camelCase for variables/functions, PascalCase for components

## Architecture
- Next.js app with pages/ directory structure
- MDX support for content pages
- Theme UI for consistent styling with Hack Club theme
- Components in components/ directory, modular cards in components/index/cards/
- Static assets in public/
- Configuration in next.config.mjs includes essential redirects/rewrites
