# Estágio de build
FROM node:18-slim AS builder

WORKDIR /usr/src/app

# Instalar dependências necessárias para o sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar sharp especificamente para Linux x64
RUN npm install --platform=linux --arch=x64 sharp

# Instalar outras dependências
RUN npm install --production --no-optional --no-audit --no-fund

# Estágio final
FROM node:18-slim

# Instalar dependências do Chrome e sharp
RUN apt-get update && apt-get install -y \
    chromium \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libcups2 \
    libxss1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Definir variáveis de ambiente
ENV CHROME_BIN=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV NODE_ENV=production
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=true

WORKDIR /usr/src/app

# Copiar node_modules do estágio de build
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"] 