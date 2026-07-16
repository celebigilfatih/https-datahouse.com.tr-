# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# This is a public Turnstile site key and must be available while Next.js builds.
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
RUN npm run build

FROM php:8.3-apache

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl libcurl4-openssl-dev libonig-dev \
  && docker-php-ext-install -j"$(nproc)" curl mbstring \
  && a2enmod rewrite headers expires deflate \
  && rm -rf /var/lib/apt/lists/*

COPY docker/apache-datahouse.conf /etc/apache2/conf-available/datahouse.conf
RUN a2enconf datahouse \
  && mkdir -p /var/www/datahouse-contact-rate \
  && chown -R www-data:www-data /var/www/datahouse-contact-rate

COPY --from=builder /app/out/ /var/www/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl --fail --silent http://localhost/ > /dev/null || exit 1
