FROM node:22-alpine
WORKDIR /bot

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src
RUN npm run build

CMD ["npm", "start"]