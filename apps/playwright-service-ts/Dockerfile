FROM node:22-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

# Install Playwright dependencies
RUN npx playwright install --with-deps chromium

RUN npm run build

ARG PORT
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD [ "npm", "start" ]
