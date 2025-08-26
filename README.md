A professional fashion collection management platform built as a case study project using Next.js, NextAuth.js, TypeScript, Redux/Zustand, Tailwind CSS/Material-UI, and Docker.

The project simulates a B2B fashion platform where users can log in, view collections, and manage collection items with drag-and-drop and filtering features.

📋 Case Study Requirements
Technical Requirements

Framework: Next.js

Authentication: NextAuth.js

State Management: Zustand or Redux

Language: TypeScript

Styling: Tailwind CSS and/or Material-UI

Containerization: Dockerized environment

Deployment: Local deployment with Docker Compose

Application Expectations
🔑 Login Page

Email & password login form

Successful login → redirect to Collections List Page

Invalid login → show error message

Authentication handled via NextAuth.js

📦 Collections Page

Redirected after login

Display collections in a table or grid view

Each collection includes a “Edit Constants” button

Clicking the button → navigate to Collection Editing Page

📝 Collection Editing Page

Display products of the selected collection

Reorder products with drag-and-drop

Include a filter panel (category, price, etc.)

Save button shows the request payload in a modal (no actual API save)

Cancel button → discard changes and return to collections list

🐳 Dockerization

Application runs inside Docker containers

Start with a single command:

docker-compose up

🚀 Quick Start
Prerequisites

Node.js 18+

Docker & Docker Compose

npm or yarn

Installation

Clone the repository

git clone <repository-url>
cd secilstore-case


Install dependencies

npm install


Setup environment variables

cp .env.example .env.local


Then edit .env.local with your actual values:

NEXTAUTH_SECRET: Generate a secure secret key

NEXT_PUBLIC_API_SECRET: Your API secret token

NEXT_PUBLIC_API_URL: Your API endpoint URL

Start with Docker

docker-compose up


Or start development server:

npm run dev


Open your browser

http://localhost:3000

📁 Project Structure
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── store/               # Redux/Zustand store and slices
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions

🔧 Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Application URL | ✅ |
| `NEXTAUTH_SECRET` | NextAuth secret key | ✅ |
| `NEXT_PUBLIC_API_URL` | API endpoint URL | ✅ |
| `NEXT_PUBLIC_API_SECRET` | API secret token | ✅ |

🐳 Docker Commands
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build

🛠️ Development
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

📱 Features Implemented

✅ Responsive design (Mobile & Desktop)

✅ Dark/Light theme support

✅ Login with NextAuth.js

✅ Collections listing page

✅ Collection editing page with drag & drop

✅ Filtering panel (category, price, etc.)

✅ Save changes (request payload shown in modal)

✅ Cancel edits and return to list

✅ State management with Redux/Zustand

✅ TypeScript support

✅ Fully Dockerized setup with Docker Compose

👉 With this README, anyone reviewing the project (HR, technical reviewer, or developer) can immediately understand that it is a case study project, its goals, and the features implemented.
