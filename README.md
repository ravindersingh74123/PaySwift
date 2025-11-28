# 💳 PaySwift

<div align="center">

![PaySwift Banner](https://img.shields.io/badge/PaySwift-Fast%20%26%20Secure%20Payments-6a51a6?style=for-the-badge)

**A modern, secure, and lightning-fast payment application built with Next.js**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0.1-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## Live Deployed Project Link
https://payswift-04it.onrender.com

---

## 🌟 Features

### 💸 Core Functionality
- **Instant P2P Transfers** - Send money to friends and family in seconds
- **Bank Integration** - Seamless deposits from HDFC Bank and Axis Bank
- **Real-time Balance Updates** - Track your funds with live balance synchronization
- **Transaction History** - Complete audit trail of all your transactions

### 🔐 Security & Authentication
- **NextAuth.js Integration** - Secure authentication with bcrypt password hashing
- **Session Management** - JWT-based secure session handling
- **Protected Routes** - Server-side authentication guards

### 🎨 User Experience
- **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Real-time Notifications** - Instant feedback on transaction status
- **Loading States** - Smooth transitions and loading indicators

### 🏗️ Architecture
- **Server Actions** - Leveraging Next.js 15's server actions for optimal performance
- **Database Transactions** - ACID-compliant operations with Prisma
- **Connection Pooling** - Efficient database connection management with pg adapter
- **Type Safety** - Full TypeScript coverage across the entire stack

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.3.0](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.8.3](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components**: Custom component library with Lucide React icons
- **State Management**: React Hooks + Server Components

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database ORM**: [Prisma 7.0.1](https://www.prisma.io/)
- **Database**: PostgreSQL (via Neon)
- **Authentication**: [NextAuth.js 4.24.11](https://next-auth.js.org/)
- **Password Hashing**: bcrypt

### Infrastructure
- **Database Adapter**: @prisma/adapter-pg with connection pooling
- **Webhook Server**: Express.js for bank webhook handling
- **Deployment Ready**: Vercel-optimized configuration

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v20.19 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (local or cloud-based like Neon)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/payswift.git
cd payswift
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@hostname:5432/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
JWT_SECRET="your-jwt-secret-here"
```

4. **Generate Prisma Client**
```bash
npm run pop
# This runs: npm install && npx prisma generate --schema=db/prisma/schema.prisma
```

5. **Run database migrations**
```bash
npx prisma migrate dev --schema=db/prisma/schema.prisma
```

6. **Seed the database (optional)**
```bash
npx prisma db seed
```

7. **Start the development server**
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Running the Bank Webhook Server

In a separate terminal:

```bash
cd bank-webhook
npm install
npm run dev
```

The webhook server will run on [http://localhost:3003](http://localhost:3003)

---

## 📁 Project Structure

```
payswift/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Dashboard layout group
│   │   ├── dashboard/            # Home page
│   │   ├── transfer/             # Bank transfer page
│   │   ├── transactions/         # Transaction history
│   │   └── p2p/                  # P2P transfer page
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth configuration
│   │   └── transactions/         # Transaction API
│   ├── lib/                      # Shared utilities
│   │   └── actions/              # Server actions
│   ├── signin/                   # Sign in page
│   └── signup/                   # Sign up page
│
├── bank-webhook/                 # Bank webhook server
│   ├── src/                      # Express server
│   └── db/                       # Shared database config
│
├── components/                   # React components
│   ├── AddMoneyCard.tsx          # Deposit money component
│   ├── SendCard.tsx              # P2P transfer component
│   ├── BalanceCard.tsx           # Balance display
│   ├── Transactions.tsx          # Transaction list
│   └── ...
│
├── db/                           # Database configuration
│   ├── prisma/                   # Prisma schema and migrations
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Migration files
│   └── index.ts                  # Prisma client setup
│
├── ui/                           # UI component library
│   └── src/                      # Reusable components
│
└── public/                       # Static assets
```

---

## 🗄️ Database Schema

### Models

#### User
```prisma
model User {
  id                   Int                 @id @default(autoincrement())
  email                String?             @unique
  number               String              @unique
  password             String
  OnRampTransaction    OnRampTransaction[]
  Balance              Balance[]
  sentTransfers        p2pTransfer[]
  receivedTransfers    p2pTransfer[]
  sentTransactions     Transaction[]
  receivedTransactions Transaction[]
}
```

#### Balance
```prisma
model Balance {
  id     Int  @id @default(autoincrement())
  userId Int  @unique
  amount Int  // Stored in paise (₹1 = 100 paise)
  locked Int  // Locked amount during processing
  user   User @relation(fields: [userId], references: [id])
}
```

#### OnRampTransaction
```prisma
model OnRampTransaction {
  id        Int          @id @default(autoincrement())
  status    OnRampStatus // Success | Failure | Processing
  token     String       @unique
  provider  String       // Bank name
  amount    Int
  startTime DateTime
  userId    Int
  user      User         @relation(fields: [userId], references: [id])
}
```

#### p2pTransfer
```prisma
model p2pTransfer {
  id         Int      @id @default(autoincrement())
  amount     Int
  timestamp  DateTime
  fromUserId Int
  toUserId   Int
  fromUser   User     @relation(name: "FromUserRelation")
  toUser     User     @relation(name: "ToUserRelation")
}
```

---

## 🔌 API Documentation

### Authentication

#### Sign Up
```typescript
POST /api/auth/signup
Body: {
  email: string
  number: string
  password: string
}
```

#### Sign In
```typescript
POST /api/auth/signin
Body: {
  email: string
  number: string
  password: string
}
```

### Transactions

#### Get All Transactions
```typescript
GET /api/transactions
Headers: { Authorization: "Bearer <token>" }
Response: Transaction[]
```

### Server Actions

#### Create On-Ramp Transaction
```typescript
createOnRampTransaction(provider: string, amount: number)
```

#### P2P Transfer
```typescript
p2pTransfer(to: string, amount: number)
```

---

## 🔄 Transaction Flow

### Bank Deposit (On-Ramp)
```mermaid
sequenceDiagram
    User->>+PaySwift: Initiate deposit
    PaySwift->>+Database: Create transaction (Processing)
    PaySwift->>User: Redirect to bank
    User->>+Bank: Complete payment
    Bank->>+Webhook: POST /hdfcWebhook
    Webhook->>+Database: Update balance
    Webhook->>+Database: Update status (Success)
    Webhook->>-Bank: Confirm receipt
```

### P2P Transfer
```mermaid
sequenceDiagram
    User A->>+PaySwift: Send ₹X to User B
    PaySwift->>+Database: BEGIN TRANSACTION
    Database->>Database: Lock User A balance
    Database->>Database: Deduct from User A
    Database->>Database: Add to User B
    Database->>Database: Create transfer record
    PaySwift->>-User A: Success confirmation
```

---

## 🧪 Testing

### Manual Testing

1. **Sign Up**: Create a new account at `/signup`
2. **Deposit Money**: Navigate to `/transfer` and simulate a bank deposit
3. **P2P Transfer**: Go to `/p2p` and send money to another user
4. **View History**: Check `/transactions` for complete history

### Test Credentials
```
User 1:
- Number: 1111111111
- Password: alice

User 2:
- Number: 2222222222
- Password: bob
```

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production
```env
DATABASE_URL="your-production-db-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="production-secret"
JWT_SECRET="production-jwt-secret"
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR


---

## 👨‍💻 Author

**Your Name**
- GitHub: [@Ravinder Singh](https://github.com/ravindersingh74123)


---

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Vercel](https://vercel.com/) for deployment platform
- All contributors who help improve this project

---

<div align="center">

Made with ❤️ by developers, for developers

**[⬆ Back to Top](#-payswift)**

</div>
