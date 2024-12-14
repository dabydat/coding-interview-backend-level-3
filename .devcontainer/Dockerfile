# Base image
FROM node:20-alpine as base
WORKDIR /usr/src/app

# Install dependencies
FROM base as deps
COPY ../package*.json ./
RUN npm ci

# Build the application
FROM deps as builder
COPY ../ ./
RUN npm run build

# Production image
FROM base as production
ENV NODE_ENV=production
COPY ../package*.json ./
COPY ../package-lock.json ./
RUN npm ci --only=production
COPY --from=builder /usr/src/app/dist ./dist
USER node
EXPOSE 5000
CMD ["node", "dist/index.js"]