# 🏫 Berlin Primary Schools Guide (2025/26)

An interactive, high-performance web application designed to help parents compare English–German bilingual and international primary schools in Berlin.

![Berlin Schools App Proof](https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TS%20%7C%20MUI-blue?style=for-the-badge)

## ✨ Features

-   **Comprehensive Data**: Details on 14 primary schools including Tuition Fees, Open Day dates, School Types (Private Bilingual, International, Public SESB), and Districts.
-   **Intelligent Sorting**: Sort schools dynamically by:
    -   **Fees**: Range from Free (SESB) to fixed/income-based private tuition.
    -   **Open Days**: Track upcoming info events and open house dates.
    -   **Distance**: real-time calculation from **Thorwaldsenstraße 25, 12157 Berlin**.
-   **View Modes**:
    -   **Standard Table**: A flat list for quick scanning.
    -   **By District**: Automatic grouping to see localized options in Mitte, Steglitz, Zehlendorf, etc.
-   **Detailed Insights**: Click any school to open a premium detail dialog with full schedules, fee breakdowns, and direct website links.
-   **Premium UI**: Dark-mode aesthetic with glassmorphism, smooth transitions (MUI Zoom), and high-contrast accessibility.

## 🛠️ Getting Started

### Prerequisites

-   Node.js (v18+)
-   npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Production & Deployment

### Build
To create a production-optimized build:
```bash
npm run build
```

### Deploy to Vercel
The project includes a `vercel.json` for seamless SPA routing.
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel --prod`