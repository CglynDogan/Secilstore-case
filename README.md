# Seçil Store - B2B Fashion Platform

Professional fashion collection management platform built with Next.js.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd secilstore-case
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your actual values:
   - `NEXTAUTH_SECRET`: Generate a secure secret key
   - `NEXT_PUBLIC_API_SECRET`: Your API secret token
   - `NEXT_PUBLIC_API_URL`: Your API endpoint URL

4. **Start with Docker**
   ```bash
   docker-compose up
   ```

   Or start development server:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Application URL | ✅ |
| `NEXTAUTH_SECRET` | NextAuth secret key | ✅ |
| `NEXT_PUBLIC_API_URL` | API endpoint URL | ✅ |
| `NEXT_PUBLIC_API_SECRET` | API secret token | ✅ |

## 🐳 Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📱 Features

- ✅ Responsive design (Mobile & Desktop)
- ✅ Dark/Light theme support
- ✅ Drag & drop functionality
- ✅ Collection management
- ✅ Product filtering
- ✅ Authentication with NextAuth
- ✅ Redux state management
- ✅ TypeScript support

