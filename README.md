# 🏕️ Refugees Camp (RC-Angular)

A web front end for managing and supporting refugee camps. Built with Angular, this application provides a public charity website alongside an authenticated admin area for camp operations, humanitarian aid, and community engagement.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## 📋 Overview

**Refugees Camp** connects volunteers, camp staff, and donors through a single platform. Visitors can browse news, events, and donation opportunities, while authenticated users can manage refugees, inventory, job offers, courses, and camp events from a protected profile dashboard.

The application communicates with a Java REST API backend (`refugeesCamp-web`) running on port `18080`.

## ✨ Features

### 🌐 Public site

- Homepage with image slider, statistics, video section, events, blog posts, and testimonials
- News articles with full-post views and Disqus comments
- Event listing and event detail pages
- Donation page
- User registration

### 🔐 Authenticated profile area

- JWT-based authentication with route guards
- Facebook and Google sign-in support
- Role-based user types (admin, camp chef, district chef, volunteer)
- Refugee records management (add, edit, delete, filter)
- Stock and needs management
- News creation and editing with a rich text editor (Trumbowyg)
- Event administration
- Job offers browsing and management
- Courses management
- User profile editing

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Angular 4, TypeScript 2.4 |
| UI | PrimeNG, Font Awesome, Bootstrap, Chart.js |
| HTTP & Auth | `@angular/common/http`, `angular2-jwt` |
| Rich text | `ng2-lazy-trumbowyg` |
| Social | `ngx-facebook`, `ng2-awesome-disqus` |
| Tooling | Angular CLI 1.5, Karma, Protractor, TSLint |

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended; Angular 4 projects often work best with Node 8–10)
- [npm](https://www.npmjs.com/)
- A running instance of the **refugeesCamp-web** Java backend API

## 🚀 Getting Started

### 1. 📥 Clone the repository

```bash
git clone <repository-url>
cd RC-Angular
```

### 2. 📦 Install dependencies

```bash
npm install
```

### 3. ⚙️ Configure the API

API endpoints are defined in `src/app/services/java.urls.ts`. By default, they point to:

```
http://localhost:18080/refugeesCamp-web/api/
```

Update these URLs if your backend runs on a different host or port.

### 4. ▶️ Start the development server

```bash
npm start
```

Navigate to [http://localhost:4200/](http://localhost:4200/). The app reloads automatically when you change source files.

## 🏗️ Build

Run a development build:

```bash
npm run build
```

Run a production build:

```bash
ng build --prod
```

Build artifacts are stored in the `dist/` directory.

## 🧪 Testing

### 🔬 Unit tests

```bash
npm test
```

Runs unit tests via [Karma](https://karma-runner.github.io).

### 🔄 End-to-end tests

```bash
npm run e2e
```

Runs end-to-end tests via [Protractor](http://www.protractortest.org/).

### 📝 Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── donation/              # Donation page
│   ├── entities/              # Data models (User, Refugee, News, etc.)
│   ├── login/                 # Login component
│   ├── news/                  # News listing and single-post views
│   ├── pipes/                 # Custom Angular pipes
│   ├── register-form/         # User registration
│   ├── security/              # JWT interceptor
│   ├── services/              # API services and URL constants
│   └── template/
│       ├── homepage/          # Public homepage sections
│       ├── profile/           # Authenticated dashboard modules
│       ├── navbar/            # Navigation bar
│       └── footer/            # Site footer
├── assets/                    # Static images, CSS, and JavaScript
└── environments/              # Environment configuration
```

## 🔗 API Configuration

Key service URLs (see `src/app/services/java.urls.ts`):

| Endpoint | Purpose |
|----------|---------|
| `/api/home/login` | User login |
| `/api/users` | User management |
| `/api/Refugees` | Refugee records |

Additional services (donations, events, news, stock, job offers, courses) call endpoints on the same backend base URL.

## 👥 Authentication & Roles

- Protected routes under `/profile` require a valid JWT token.
- The `AuthGuardService` enforces authentication before accessing dashboard features.
- User roles include **Admin**, **Camp Chef**, **District Chef**, and **Volunteer**, each with different access levels.

## 🧩 Code Scaffolding

Generate a new component:

```bash
ng generate component component-name
```

You can also scaffold directives, pipes, services, classes, guards, interfaces, enums, and modules:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## 📜 License

This project is licensed under the MIT License.

## ❓ Further Help

For Angular CLI usage, run `ng help` or visit the [Angular CLI documentation](https://github.com/angular/angular-cli/blob/master/README.md).
