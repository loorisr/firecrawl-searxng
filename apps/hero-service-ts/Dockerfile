FROM node:22-slim

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY ./package.json ./pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install # --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Set up environment
ARG PORT=3000
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["pnpm", "start"]
