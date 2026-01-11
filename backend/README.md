# ContractForge Backend API

Backend API server for the No-Code Smart Contract Builder platform.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Payments**: Stripe
- **Blockchain**: ethers.js v6
- **Compiler**: solc (Solidity Compiler)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)
- RPC URLs for target blockchains

### Installation

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/contractforge"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
FRONTEND_URL="http://localhost:3000"

# Blockchain RPCs (get from Alchemy/Infura)
ETHEREUM_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"
SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY"
POLYGON_RPC_URL="https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/connect-wallet | Connect wallet |
| POST | /api/auth/refresh | Refresh JWT token |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | List user's projects |
| GET | /api/projects/:id | Get single project |
| POST | /api/projects | Create project |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| POST | /api/projects/:id/duplicate | Duplicate project |

### Compilation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/compile | Compile Solidity contract |
| POST | /api/compile/security-scan | Run security analysis |
| POST | /api/compile/validate | Validate syntax |

### Deployment

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/deploy/networks | Get available networks |
| POST | /api/deploy/estimate-gas | Estimate deployment gas |
| POST | /api/deploy | Create deployment |
| PUT | /api/deploy/:id/confirm | Confirm deployment |
| PUT | /api/deploy/:id/fail | Mark as failed |
| GET | /api/deploy | List deployments |
| POST | /api/deploy/:id/verify | Verify on explorer |

### Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/templates/public | List public templates |
| GET | /api/templates/public/:id | Get public template |
| GET | /api/templates/mine | List user's templates |
| POST | /api/templates | Create template |
| PUT | /api/templates/:id | Update template |
| DELETE | /api/templates/:id | Delete template |
| POST | /api/templates/:id/use | Create project from template |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | /api/users/profile | Update profile |
| PUT | /api/users/password | Change password |
| GET | /api/users/usage | Get usage stats |
| GET | /api/users/api-keys | List API keys |
| POST | /api/users/api-keys | Create API key |
| DELETE | /api/users/api-keys/:id | Delete API key |

## API Examples

### Authentication

**Register a new user:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Projects

**Create a new project:**
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "My Token Project",
    "description": "ERC-20 token for my community",
    "blocks": [
      {
        "type": "erc20",
        "config": {
          "name": "MyToken",
          "symbol": "MTK",
          "initialSupply": "1000000"
        }
      }
    ]
  }'
```

**List projects with pagination:**
```bash
curl "http://localhost:3001/api/projects?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Compilation

**Compile a contract:**
```bash
curl -X POST http://localhost:3001/api/compile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "sourceCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n...",
    "contractName": "MyToken"
  }'
```

### Deployment

**Estimate gas:**
```bash
curl -X POST http://localhost:3001/api/deploy/estimate-gas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "bytecode": "0x608060405234801561001057600080fd5b50...",
    "network": "sepolia"
  }'
```

**Deploy contract:**
```bash
curl -X POST http://localhost:3001/api/deploy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "projectId": "project-uuid",
    "network": "sepolia",
    "bytecode": "0x608060405234801561001057600080fd5b50...",
    "abi": [...],
    "constructorArgs": []
  }'
```

## Pagination

List endpoints support pagination with the following query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number (1-indexed) |
| limit | number | 10 | Items per page (max 100) |
| sort | string | createdAt | Field to sort by |
| order | string | desc | Sort order (asc/desc) |

**Example response with pagination:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

Common error codes:
- `VALIDATION_ERROR` - Invalid input data
- `UNAUTHORIZED` - Missing or invalid JWT token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMITED` - Too many requests
- `INTERNAL_ERROR` - Server error

## Database Schema

The database includes the following models:

- **User**: User accounts with subscription info
- **Project**: Smart contract projects
- **Deployment**: Contract deployments
- **Template**: Community templates
- **ApiKey**: API keys for programmatic access
- **Transaction**: Billing transactions

## Deployment

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## Security

- All endpoints use rate limiting
- JWT authentication required for protected routes
- Password hashing with bcrypt (12 rounds)
- Input validation with Zod
- CORS configured for frontend origin
- Helmet.js for security headers

## License

MIT
