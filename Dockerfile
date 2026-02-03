# ---------- 1. Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# 패키지 파일만 먼저 복사 (캐시 활용)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# 패키지 매니저 자동 대응
RUN \
  if [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm install; \
  fi

# 소스 복사
COPY . .

# 타입체크 + 빌드
RUN npm run build


# ---------- 2. Production stage ----------
FROM nginx:alpine

# 기존 nginx 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# SPA용 nginx 설정
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
