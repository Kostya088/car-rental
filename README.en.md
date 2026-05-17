# 🚗 Car Rental

A modern web application for searching and booking cars. The project is built on the React and Next.js ecosystem, featuring flexible filtering and seamless API integration.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16.2 (App Router)](https://nextjs.org/) — server-side rendering (SSR), routing optimization, and SEO.
- **UI Library:** [React 19.2](https://react.dev/)
- **Styling:** [Tailwind CSS v4.0](https://tailwindcss.com/) — utility-first CSS framework.
- **State & Request Management:** [TanStack React Query v5](https://tanstack.com/query/latest) — caching, synchronization, and server state updates.
- **HTTP Client:** [Axios](https://axios-http.com/) — for clean and configurable requests to the backend API.
- **Helper Libraries:**
  - `react-select` — for customized select inputs (brand and price selection).
  - `react-hot-toast` — toast notifications for success or error messages.
  - `react-spinners` — interactive loaders to enhance UX during data fetching.
  - `react-icons` — a set of modern icons.
- **Typing:** [TypeScript](https://www.typescriptlang.org/) — strict data typing for code safety.
- **Linters & Formatting:** [ESLint 9](https://eslint.org/) & [Prettier 3](https://prettier.io/) (along with the Tailwind CSS class sorting plugin).

---

## ✨ Key Features

1. **Car Catalog (`/catalog`):** A comprehensive list of available rental cars with detailed information.
2. **Dynamic Filtering (`FilterBar`):**
   - Search by car make/brand.
   - Filter by hourly rental price.
   - Filter by car mileage (with "From" and "To" ranges).
   - Quick reset for all applied filters.
3. **Online Booking Form (`BookingForm`):** Instantly submit a booking request for a specific car, featuring input validation (name, email, comment) and immediate feedback via toast notifications.
4. **SEO & OpenGraph:** Full metadata optimization for pages to ensure proper rendering in search engines and attractive link previews across social media networks (Facebook, Telegram, etc.).

---

## 🚀 Installation and Local Setup

To run the project on your local machine, follow these steps:

### 1. Clone the Repository

Clone the project from GitHub and navigate to its working directory:

    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name

### 2. Install Dependencies

Install the required packages using your preferred package manager (npm is recommended):

    npm install

    # or use alternative utilities:
    # yarn install  |  pnpm install  |  bun install

### 3. Environment Variables Setup

The project uses a base address for the remote API server. Create a `.env.local` file in the root directory and add your backend URL:

    NEXT_PUBLIC_API_URL=https://your-api-address.com/api

### 4. Run in Development Mode

Start the local server for development and testing:

    npm run dev

Open http://localhost:3000 in your browser to see the live application.

### 5. Production Build

Before deploying or checking the final performance, build and run the optimized production version of the project:

    npm run build
    npm run start

---

## 🌐 Deployment

This project is fully compatible and easily deployed on the Vercel platform (by the creators of Next.js):

1. Push your code to a private or public GitHub repository.
2. Log in to your Vercel dashboard and import this repository.
3. In the Environment Variables section, make sure to add the `NEXT_PUBLIC_API_URL` key with its corresponding link.
4. Click the Deploy button. The project will automatically generate a live link to your deployed website.
