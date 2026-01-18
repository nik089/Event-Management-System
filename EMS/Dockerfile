# ---------- Build Stage ----------
FROM node:18-alpine AS build
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies (fix peer dependency issues)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build Angular app (uses default production config)
RUN npm run build

# ---------- Runtime Stage ----------
FROM nginx:alpine

# IMPORTANT: copy correct dist folder (ems)
COPY --from=build /app/dist/ems /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
