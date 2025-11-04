# Access Pathfinder

[cloudflarebutton]

A security and visibility tool that scans Cloudflare Access logs to report on undefined applications, helping administrators discover and secure their entire application landscape.

Access Pathfinder is a sleek, single-page administrative tool designed for Cloudflare administrators. It provides a crucial capability: discovering applications that are being accessed through Cloudflare's network but do not have formal application definitions or policies within Cloudflare Access. By scanning access logs within a specified date range, it generates a clear, actionable report of these 'shadow' applications. This enables administrators to proactively define, secure, and manage all traffic, closing potential security gaps and ensuring comprehensive policy enforcement across their organization.

## ✨ Key Features

-   **Discover Undefined Apps:** Scan Cloudflare Access logs to find applications being used without formal policies.
-   **Time-based Analysis:** Use a date range selector to define the precise period for log analysis.
-   **Actionable Reporting:** View results in a clean, sortable table showing hostnames, access frequency, and user counts.
-   **Enhanced Security Posture:** Proactively identify and secure 'shadow IT' to close potential security gaps.
-   **Modern UI/UX:** A polished, responsive interface built for a seamless administrative experience.

## 🚀 Technology Stack

-   **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/)
-   **Backend:** [Hono](https://hono.dev/) on [Cloudflare Workers](https://workers.cloudflare.com/)
-   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Tooling:** [Vite](https://vitejs.dev/), [Bun](https://bun.sh/)
-   **Utilities:** [date-fns](https://date-fns.org/), [Zod](https://zod.dev/), [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

-   [Bun](https://bun.sh/docs/installation) installed on your machine.
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for deployment.
-   A Cloudflare account.

### Installation & Development

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd access_pathfinder
    ```

2.  **Install dependencies:**
    This project uses Bun as the package manager.
    ```bash
    bun install
    ```

3.  **Run the development server:**
    This command starts the Vite frontend and the Hono backend worker concurrently.
    ```bash
    bun run dev
    ```
    The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

The project is organized into three main directories:

-   `src/`: Contains the React frontend application, including pages, components, hooks, and utility functions.
-   `worker/`: Contains the Hono backend application running on Cloudflare Workers. API routes and logic are defined here.
-   `shared/`: Contains shared code, primarily TypeScript types, that is used by both the frontend and backend to ensure type safety.

## 🔧 Development

### Frontend

-   **Pages:** Add new pages or modify existing ones in the `src/pages/` directory. The main application page is `HomePage.tsx`.
-   **Components:** Reusable components are located in `src/components/`. We heavily leverage `shadcn/ui` components, which can be found in `src/components/ui/`.

### Backend

-   **API Endpoints:** To add or modify API endpoints, edit the `worker/user-routes.ts` file. The Hono router is configured here to handle API requests.
-   **Data Entities:** Data models and persistence logic using Cloudflare's Durable Objects are abstracted into entities within `worker/entities.ts`.

## ☁️ Deployment

This project is designed for easy deployment to Cloudflare Pages.

### One-Click Deploy

You can deploy this application to your Cloudflare account with a single click.

[cloudflarebutton]

### Manual Deployment via Wrangler

1.  **Authenticate with Cloudflare:**
    If this is your first time using Wrangler, you'll need to log in.
    ```bash
    wrangler login
    ```

2.  **Build the application:**
    This command bundles the frontend and worker for production.
    ```bash
    bun run build
    ```

3.  **Deploy to Cloudflare:**
    This command deploys your application to the Cloudflare network.
    ```bash
    bun run deploy
    ```

Wrangler will provide you with the URL of your deployed application upon completion.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.