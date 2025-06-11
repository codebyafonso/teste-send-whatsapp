# API de Envio de Mensagens WhatsApp

API REST para envio de mensagens via WhatsApp usando o Venom-bot.

## 🚀 Funcionalidades

- Envio de mensagens de texto via WhatsApp
- API REST com endpoint único
- Container Docker para fácil deploy

## 📋 Pré-requisitos

- Node.js 18 ou superior
- Docker (opcional, para rodar em container)
- Conta no Docker Hub (opcional, para deploy)

## 🔧 Instalação

### Local

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd teste-send-whatsapp
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o servidor
```bash
npm start
```

### Docker

1. Construa a imagem
```bash
docker build -t whatsapp-api .
```

2. Execute o container
```bash
docker-compose up -d
```

## 📦 Deploy

### Docker Hub

1. Faça login no Docker Hub
```bash
docker login
```

2. Dê tag na imagem
```bash
docker tag whatsapp-api seu_usuario/whatsapp-api:latest
```

3. Envie para o Docker Hub
```bash
docker push seu_usuario/whatsapp-api:latest
```

## 🛠️ Uso da API

### Endpoint

```
POST /send
```

### Parâmetros

```json
{
    "numero": "5581983191149",
    "mensagem": "Sua mensagem aqui"
}
```

### Exemplo de uso com curl

```bash
curl -X POST http://localhost:3000/send \
-H "Content-Type: application/json" \
-d '{"numero": "5581983191149", "mensagem": "Teste via API!"}'
```

### Respostas

#### Sucesso (200)
```json
{
    "sucesso": true,
    "result": {
        // Detalhes do envio
    }
}
```

#### Erro (400, 500)
```json
{
    "sucesso": false,
    "error": "Mensagem de erro"
}
```

## ⚠️ Observações

- O número deve ser enviado sem o @c.us
- A primeira execução pode demorar um pouco para inicializar o Venom-bot
- É necessário escanear o QR Code na primeira execução

## 🔒 Segurança

- A API não possui autenticação por padrão
- Recomenda-se adicionar autenticação em ambiente de produção
- Mantenha o número do WhatsApp seguro

## 📝 Licença

Este projeto está sob a licença ISC. 
