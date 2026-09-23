# apps/api/Dockerfile
FROM node:24-alpine AS dasar
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dasar /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
COPY db ./db
COPY scripts ./scripts
# jangan menjalankan aplikasi sebagai root
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]
