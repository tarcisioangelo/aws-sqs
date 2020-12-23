# AWS - SQS
O Amazon Simple Queue Service é um serviço de enfileiramento de mensagens distribuído introduzido pela Amazon.com no final de 2004. Ele suporta o envio programático de mensagens por aplicativos de serviço da Web como uma maneira de se comunicar pela Internet

# GOAWS - Ambiente de desenvolvimento
Desenvolvido em GO, esse serviço simula localmente os serviços da AWS sem precisar criar conta, as chaves não precisam ser válidas.

Para rodar você precisa ter o docker e docker compose instalados na sua máquina.

- cp .env.example .env
- docker-compose up -d

# Comandos
Para facilitar, coloquei no package.json os scripts para rodar o envio e o recebimento das mensagens, no recebimento estou usando o sqs-consumer que fica lendo novas mensagens em tempo real.

- yarn sub
- yarn send

### Criando fila
- aws --endpoint-url=http://127.0.0.1:4100 sqs create-queue --queue-name myqueue.fifo

### Listando filas
- aws --endpoint-url=http://127.0.0.1:4100 sqs list-queues

