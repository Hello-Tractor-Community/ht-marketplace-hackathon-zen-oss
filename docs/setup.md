# Hello Tractor Project Setup Guide

## Prerequisites

- Git

- Node.js (v20.x recommended)

- Bun (for backend)

- pnpm (for frontend)

- MongoDB (local or cloud instance)

## Project Structure

```

ht-marketplace-hackathon-zen-oss/

│

├── WWW/

│   ├── client/     # Client-side frontend

│   └── admin/      # Admin-side frontend

│

└── server/         # Backend server

```

## Initial Setup

### 1. Clone the Repository

```bash


# Clone the repository

git clone git@github.com:Hello-Tractor-Community/ht-marketplace-hackathon-zen-oss.git

cd ht-marketplace-hackathon-zen-oss

```

### 2. Frontend Setup (WWW/client and WWW/admin)

#### Install Dependencies

```bash

# Navigate to client directory

cd WWW/client

# Install dependencies using pnpm

pnpm install

# Repeat for admin directory

cd ../admin

pnpm install

```

#### Configure Environment Variables

Create a `.env.local` file in both `WWW/client` and `WWW/admin` directories with the content in the .env.example:

```env

# WWW/client/.env.local and WWW/admin/.env.local

NEXT_PUBLIC_SERVER_URL=http://localhost:8001

```

### 3. Backend Setup (server)

#### Install Dependencies

```bash

# Navigate to server directory

cd ../../server

# Install dependencies using Bun

bun install

```

#### Configure Environment Variables

Create a `.env` file in the `server` directory with the content in the .env.example:

```env

# server/.env

SERVER_PORT=8001

JWT_SECRET=your_jwt_secret_key

MONGO_URI=mongodb://localhost:27017/db_name

FRONTEND_URL=http://localhost:3000

NODE_ENV=dev

CALLBACK_URL=your_callback_url_for_uploadthing

UPLOADTHING_TOKEN=your_uploadthing_token

WORKOS_API_KEY=your_workos_api_key

WORKOS_CLIENT_ID=your_workos_client_id

```

### 4. Database Setup

#### MongoDB

1\. Ensure MongoDB is installed and running locally

2\. Create the database specified in `MONGO_URI`

   ```bash

   # If using MongoDB CLI

   use db_name

   ```

### 5. Running the Project

#### Start Frontend (Client)

```bash

# In WWW/client directory

pnpm run dev

# In WWW/admin directory

pnpm run dev

```

- Client will be available at `http://localhost:3000`

- Admin will be available at `http://localhost:3001`

#### Start Backend Server

```bash

# In server directory

bun run dev

```

- Server will be available at `http://localhost:8001`

## Troubleshooting

### Common Issues

- Ensure all environment variables are correctly set

- Verify MongoDB connection

- Check that all dependencies are installed correctly

### Recommended Tools

- MongoDB Compass (for database management)

- Postman (for API testing)

## Additional Configuration

### Uploadthing Configuration

1\. Create an account at [Uploadthing](https://uploadthing.com/)

2\. Generate tokens and update `.env` files

### WorkOS Configuration

1\. Sign up at [WorkOS](https://workos.com/)

2\. Obtain API key and Client ID

3\. Update `.env` with provided credentials

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

```

