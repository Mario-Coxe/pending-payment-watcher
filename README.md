# Pending Payment Watcher

<div align="center">
  
![Node.js](https://img.shields.io/badge/Node.js-18%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Knex](https://img.shields.io/badge/Knex.js-ORM-E16426?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Express](https://img.shields.io/badge/Express-Web%20Framework-000000?style=for-the-badge&logo=express&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-4A90E2?style=for-the-badge)

</div>

<p align="center">
  <b>An automated service to monitor and manage pending payments</b>
</p>

## Language Selection / Seleção de Idioma

- **[English Documentation](#english-documentation)**
- **[Documentação em Português](#documentação-em-português)**

---

## English Documentation

### Project Overview

**Pending Payment Watcher** is a robust Node.js microservice designed to monitor and automatically cancel unpaid orders in e-commerce systems. When a user selects **bank transfer** as their payment method but fails to complete the payment within a configurable time period (default: 30 minutes), the system will automatically cancel the order, freeing up inventory and maintaining accurate sales records.

### Key Features

- **Automated Monitoring**: Continuously watches for pending payments
- **Configurable Timeouts**: Easily adjust the waiting period for payments
- **Real-time Countdown**: Track bank transfer payment timers
- **REST API Payment Status**: Check order payment status in real-time
- **WebSocket Integration**: Live updates on payment timers
- **Database Integration**: Works seamlessly with SQL databases via Knex.js
- **Lightweight**: Minimal resource footprint for production environments

### Technology Stack

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript (v4+)
- **Web Framework**: Express.js
- **Real-time Communication**: WebSocket
- **Data Layer**: Knex.js Query Builder
- **Database**: MySQL (via mysql2 driver)
- **Configuration**: dotenv for environment management

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Mario-Coxe/pending-payment-watcher.git
   cd pending-payment-watcher
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure the environment:**
   ```sh
   cp .env.example .env
   ```
   Customize the `.env` file with your database credentials and desired configurations.

4. **Start the service:**
   ```sh
   npm run dev
   ```

### Environment Configuration

```ini
# Database Configuration
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306

# Scheduler Configuration (in minutes)
TIME_CHECK=1

# Payment Time Limit Configuration (in minutes)
PAYMENT_TIME_LIMIT=30
```

### 🛠️ API and WebSocket Endpoints

#### REST API Endpoint
- **GET `/orders/:orderId/time-remaining`**
  Retrieves the remaining time for a specific order's payment.

  **Response Example:**
  ```json
  {
    "orderId": 49,
    "remainingTime": "04:34",
    "createdAt": "26/03/2025 19:53:01",
    "deadline": "26/03/2025 19:58:01",
    "checkedAt": "26/03/2025 19:53:26",
    "expired": false,
    "paymentTimeLimitMinutes": 5
  }
  ```

#### WebSocket Interaction
- **Subscription Message:**
  ```json
  {
    "event": "subscribe_to_order_timer",
    "orderId": 49
  }
  ```

- **Timer Update Event:**
  ```json
  {
    "event": "order_timer_update",
    "orderId": 49,
    "remainingTime": "00:00",
    "expired": false,
    "createdAt": "26/03/2025 19:53:01",
    "deadline": "26/03/2025 19:58:01",
    "updatedAt": "26/03/2025 19:58:00"
  }
  ```

### Customizing the Monitoring Interval

To modify the time interval for checking unpaid orders, simply update the `TIME_CHECK` and `PAYMENT_TIME_LIMIT` value in your `.env` file:

```ini
# Example: Check every 1 minutes instead of the default 1
TIME_CHECK=1

# Example: Extend payment time to 30 minutes
PAYMENT_TIME_LIMIT=30
```

---

## Documentação em Português

### Visão Geral do Projeto

**Pending Payment Watcher** é um microserviço Node.js robusto projetado para monitorar e cancelar automaticamente pedidos não pagos em sistemas de e-commerce. Quando um usuário seleciona **transferência bancária** como método de pagamento mas não finaliza o pagamento dentro de um período configurável (padrão: 30 minutos), o sistema cancelará automaticamente o pedido, liberando estoque e mantendo registros de vendas precisos.

### Recursos Principais

- **Monitoramento Automatizado**: Observação contínua de pagamentos pendentes
- **Timeouts Configuráveis**: Ajuste facilmente o período de espera para pagamentos
- **Contagem Regressiva em Tempo Real**: Acompanhe os temporizadores de pagamento por transferência bancária
- **API REST de Status de Pagamento**: Verifique o status de pagamento do pedido
- **Integração WebSocket**: Atualizações ao vivo nos temporizadores de pagamento
- **Integração com Banco de Dados**: Funciona perfeitamente com bancos SQL via Knex.js
- **Leve**: Pegada mínima de recursos para ambientes de produção

(Rest of the Portuguese documentation remains the same as in the original README)

---

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/Mario-Coxe/pending-payment-watcher?style=social)](https://github.com/Mario-Coxe/pending-payment-watcher/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Mario-Coxe/pending-payment-watcher?style=social)](https://github.com/Mario-Coxe/pending-payment-watcher/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Mario-Coxe/pending-payment-watcher?style=social)](https://github.com/Mario-Coxe/pending-payment-watcher/issues)

</div>