FROM node:22-slim

#ENV PNPM_HOME="/pnpm"
#ENV PATH="$PNPM_HOME:$PATH"

COPY . /app
WORKDIR /app

RUN npm i -g corepack@latest & corepack enable

#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile && pnpm run build
RUN pnpm install --frozen-lockfile && pnpm run build

RUN /tmp/apt-install-chrome-dependencies.sh

# Set up environment
ARG PORT=3000
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["pnpm", "start"]
