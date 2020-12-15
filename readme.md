# GOAWS
- cp .env.example .env
- docker-compose up -d

# Comandos
- yarn sub
- yarn send

### Criando fila
- aws --endpoint-url=http://127.0.0.1:4100 sqs create-queue --queue-name myqueue

### Listando filas
- aws --endpoint-url=http://127.0.0.1:4100 sqs list-queues

