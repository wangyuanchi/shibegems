FROM node:22-alpine
WORKDIR /bot

COPY package.json package-lock.json tsconfig.json ./
ENV NODE_OPTIONS="--max_old_space_size=1536"
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src
RUN npm run build

CMD ["npm", "start"]