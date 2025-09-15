FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies including dev (needed for build)
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build

# Remove dev deps (optional cleanup)
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

