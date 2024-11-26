# Rebuild the source code only when needed
FROM node:20.10.0-alpine AS deps
WORKDIR /app
COPY package.json ./
COPY .env .env
COPY ./prisma prisma


RUN yarn install

# Production image, copy all the files and run next
FROM node:20.10.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY .env .env
COPY ./prisma prisma
# Show .env file
RUN cat .env
COPY . .

RUN yarn build

FROM node:20.10.0-alpine AS runner
WORKDIR /app


ENV NODE_ENV development
# Uncomment the following line in case you want to disable telemetry during runtime.

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT 8080

CMD ["node", "server.js"]