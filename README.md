# 🍴 Forks: Recipe Manager

A modern, fullstack recipe management application built as a learning project to explore Spring Boot and contemporary web development practices including OAuth authentication, OpenAPI specifications, and automated API client generation.

## ✨ Features

- **Recipe Management**: Create, edit, and organize your favorite recipes
- **Pantry Tracking**: Keep track of ingredients in your pantry
- **Meal Planning**: Plan your meals and manage your cooking schedule
- **User Authentication**: Secure login with OAuth via Keycloak
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Type-Safe API**: Auto-generated TypeScript clients with Zod validation

## 🚀 Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **React Hook Form** - Performant forms with validation
- **Keycloak** - OAuth authentication

### Development Tools

- **Orval** - OpenAPI client generation
- **ESLint & Prettier** - Code linting and formatting
- **Husky** - Git hooks
- **Zod** - Runtime type validation

### Backend

- **Spring Boot** - [Backend Repository](https://github.com/svoglimacci/forks_backend)

## 📋 Prerequisites

- Node.js 18+ and pnpm
- A running Spring Boot backend (see [Backend Repository](https://github.com/svoglimacci/forks_backend) for more details)
- Keycloak server for authentication

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd forks_frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Generate API clients**

   ```bash
   pnpm orval
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/              # Auto-generated API clients and models
│   ├── endpoints/    # API endpoint hooks (React Query)
│   └── model/        # TypeScript models
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components (shadcn/ui)
│   ├── authProvider/ # Authentication context
│   ├── layout/      # Layout components
│   └── forms/       # Form components
├── hooks/           # Custom React hooks
├── routes/          # Application routes (TanStack Router)
├── utils/           # Utility functions
└── assets/          # Static assets
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm orval` - Generate API clients from OpenAPI spec

## 🔐 Authentication

The application uses Keycloak for OAuth authentication. Make sure your Keycloak server is properly configured and the backend is set up to validate tokens.

## 🎨 UI Components

The project uses a combination of:

- **shadcn/ui** - Copy-paste component library built on Radix UI primitives
- **Tailwind CSS** - for styling
- **Lucide React** - for icons

## 📡 API Integration

API clients are automatically generated using Orval from the OpenAPI specification provided by the Spring Boot backend. This ensures:

- Type-safe API calls
- Automatic React Query hooks
- Zod schema validation
- MSW mocks for testing

## 🚦 Development Workflow

1. The backend exposes an OpenAPI specification at `/v3/api-docs`
2. Orval generates TypeScript clients and React Query hooks
3. Components use the generated hooks for data fetching
4. Forms use React Hook Form with Zod validation

## 📚 Learning Goals

This project was built to explore and learn:

- Modern React patterns and hooks
- TypeScript in a real-world application
- OpenAPI and automated client generation
- OAuth authentication flows
- Modern build tools and development practices
- Component-driven development with design systems

## 📄 License

This project is for educational purposes.
