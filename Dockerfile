# syntax=docker/dockerfile:1
# Production image: the Vite build output served by Caddy's static file server.
# The runtime layer holds only the compiled dist/ — no source, no node_modules.

# ---- build ----
FROM node:22-alpine AS build
# The `prepare` script installs Husky git hooks; there's no .git in the build.
ENV HUSKY=0
RUN npm install -g pnpm@10
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# ---- runtime ----
FROM caddy:2-alpine
COPY --from=build /app/dist /srv
# Plain HTTP; TLS is terminated by the edge proxy in front of the box.
EXPOSE 8080
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":8080"]
