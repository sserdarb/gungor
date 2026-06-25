# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

# Copy workspace configuration files
COPY package.json pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

# Copy all project packages
COPY artifacts/gungor-yalitim/package.json ./artifacts/gungor-yalitim/
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY lib/db/package.json ./lib/db/
COPY lib/api-client-react/package.json ./lib/api-client-react/
COPY lib/api-spec/package.json ./lib/api-spec/
COPY lib/api-zod/package.json ./lib/api-zod/
COPY scripts/package.json ./scripts/

# Install dependencies (including devDependencies for build/typecheck)
RUN pnpm install --ignore-scripts

# Copy the rest of the application code
COPY . .

# Set Vite build environment variables
ENV PORT=5000
ENV BASE_PATH=/
ENV NODE_ENV=production

# Build packages (Builds db, then builds React frontend assets into artifacts/gungor-yalitim/dist)
RUN pnpm run build

# Stage 2: Runtime image
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

# Copy workspace configuration
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy built code and configuration
COPY --from=builder /app/artifacts/api-server ./artifacts/api-server
COPY --from=builder /app/artifacts/gungor-yalitim ./artifacts/gungor-yalitim
COPY --from=builder /app/lib/db ./lib/db
COPY --from=builder /app/lib/api-client-react ./lib/api-client-react
COPY --from=builder /app/lib/api-spec ./lib/api-spec
COPY --from=builder /app/lib/api-zod ./lib/api-zod
COPY --from=builder /app/scripts ./scripts

# Install production and build dependencies in runner so drizzle-kit can be run at startup
RUN pnpm install --ignore-scripts

# Create data and uploads directories for persistence
RUN mkdir -p /app/data /app/uploads

# Configure environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_URL=file:/app/data/sqlite.db
ENV JWT_SECRET=gungor-secret-key-2026

EXPOSE 5000

# Run drizzle-kit push to sync schema on startup, then start the Express server
CMD pnpm --filter @workspace/db push && pnpm --filter @workspace/api-server start
