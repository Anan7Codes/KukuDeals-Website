FROM node:alpine AS deps
WORKDIR /app
COPY . ./
RUN npm install

FROM node:alpine AS builder 
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_PUBLIC_SUPABASE_URL https://jipvpsiwfwiyqyxpssli.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppcHZwc2l3ZndpeXF5eHBzc2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzMDM2ODksImV4cCI6MTk1OTg3OTY4OX0.ilai08nJ5jagxfHb44YUxh45N1EscZa1byqaiqmaWZA
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_SHARP_PATH /app/tmp/node_modules/sharp next start
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-i18next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

ENV PORT 3001

CMD ["npm","run","start"]