FROM node:alpine AS deps

RUN apk add --no-cache libc6-compact
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile

FROM node:alpine AS builder 
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.postcss.config.js ./.postcss.config.js
COPY --from=builder /app/tailwind.config.js ./tailwind.config.js
COPY --from=builder /app/.babelrc ./.babelrc
COPY --from=builder /app/.eslintrc.json ./.eslintrc.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/jsconfig.js ./jsconfig.js
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

CMD ["npm","run","start"]