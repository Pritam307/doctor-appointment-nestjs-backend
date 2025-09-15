# Step 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Production stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]
