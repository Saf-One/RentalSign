# RentalSign

RentalSign is a secure and user-friendly platform designed to streamline property rental management. It enables property owners to list their rentals, and guests to browse, book, and review properties with ease.

## What Was Built

*   **Property Browsing:** A seamless experience for users to view available rental listings.
*   **Booking System:** A robust workflow for guests to book properties for specific dates.
*   **Property Management:** Property owners can easily create and manage their listings.
*   **Authentication:** Secure user management powered by Clerk.
*   **User Reviews:** A feedback loop allowing guests to rate and review their stay.

## Technical Architecture

*   **Framework:** Next.js (App Router) for a fast, SEO-friendly, and scalable frontend and backend.
*   **Database:** PostgreSQL, managed via Prisma ORM for type-safe database operations.
*   **Authentication:** Clerk for robust, secure user authentication and session management.
*   **Styling:** Tailwind CSS for a modern, responsive, and maintainable UI design.
*   **Deployment:** Optimized for Vercel.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saf-One/RentalSign.git
   cd RentalSign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   DATABASE_URL="your-postgresql-database-url"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The project is configured for deployment on Vercel. Ensure you add the environment variables mentioned above in the Vercel project settings under Environment Variables.
