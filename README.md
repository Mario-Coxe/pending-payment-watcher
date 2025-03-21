# Pending Payment Watcher

<div align="center">
  
![Node.js](https://img.shields.io/badge/Node.js-18%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Knex](https://img.shields.io/badge/Knex.js-ORM-E16426?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

</div>

<p align="center">
  <b>Um serviço automatizado para monitoramento e gestão de pagamentos pendentes</b>
</p>

## 🌎 Language Selection / Seleção de Idioma

- **[English Documentation](#english-documentation)**
- **[Documentação em Português](#documentação-em-português)**

---

## English Documentation

### Project Overview

**Pending Payment Watcher** is a robust Node.js microservice designed to monitor and automatically cancel unpaid orders in e-commerce systems. When a user selects **bank transfer** as their payment method but fails to complete the payment within a configurable time period (default: 30 minutes), the system will automatically cancel the order, freeing up inventory and maintaining accurate sales records.

### Key Features

- **Automated Monitoring**: Continuously watches for pending payments
- **Configurable Timeouts**: Easily adjust the waiting period for payments
- **Database Integration**: Works seamlessly with SQL databases via Knex.js
- **Lightweight**: Minimal resource footprint for production environments

### Technology Stack

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript (v4+)
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
   npx ts-node src/
   ```

###  Environment Configuration

```ini
# Database Configuration
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306

# Scheduler Configuration (in minutes)
TIME_CHECK=30
```

### 🛠️ Customizing the Monitoring Interval

To modify the time interval for checking unpaid orders, simply update the `TIME_CHECK` value in your `.env` file:

```ini
# Example: Check every 45 minutes instead of the default 30
TIME_CHECK=45
```
---

## Documentação em Português

### Visão Geral do Projeto

**Pending Payment Watcher** é um microserviço Node.js robusto projetado para monitorar e cancelar automaticamente pedidos não pagos em sistemas de e-commerce. Quando um usuário seleciona **transferência bancária** como método de pagamento mas não finaliza o pagamento dentro de um período configurável (padrão: 30 minutos), o sistema cancelará automaticamente o pedido, liberando estoque e mantendo registros de vendas precisos.

### Recursos Principais

- **Monitoramento Automatizado**: Observação contínua de pagamentos pendentes
- **Timeouts Configuráveis**: Ajuste facilmente o período de espera para pagamentos
- **Integração com Banco de Dados**: Funciona perfeitamente com bancos SQL via Knex.js
- **Leve**: Pegada mínima de recursos para ambientes de produção

### Stack Tecnológica

- **Runtime**: Node.js (v18+)
- **Linguagem**: TypeScript (v4+)
- **Camada de Dados**: Query Builder Knex.js
- **Banco de Dados**: MySQL (via driver mysql2)
- **Configuração**: dotenv para gerenciamento de ambiente

###  Instalação e Configuração

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/Mario-Coxe/pending-payment-watcher.git
   cd pending-payment-watcher
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure o ambiente:**
   ```sh
   cp .env.example .env
   ```
   Personalize o arquivo `.env` com suas credenciais de banco de dados e configurações desejadas.

4. **Inicie o serviço:**
   ```sh
   npx ts-node src/
   ```

### Configuração do Ambiente

```ini
# Configuração do Banco de Dados
DB_HOST=seu_host_do_banco
DB_USER=seu_usuario_do_banco
DB_PASSWORD=sua_senha_do_banco
DB_NAME=seu_nome_do_banco
DB_PORT=3306

# Configuração do Agendador (em minutos)
TIME_CHECK=30
```

### Personalizando o Intervalo de Monitoramento

Para modificar o intervalo de tempo para verificação de pedidos não pagos, simplesmente atualize o valor de `TIME_CHECK` no seu arquivo `.env`:

```ini
# Exemplo: Verificar a cada 45 minutos em vez do padrão de 30
TIME_CHECK=45
```
---

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/Mario-Coxe/pending-payment-watcher?style=social)](https://github.com/Mario-Coxe/pending-payment-watcher/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Mario-Coxe/pending-payment-watcher?style=social)](https://github.com/Mario-Coxe/pending-payment-watcher/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Mario-Coxe/pending-payment-watcher?style=social)](https://github.com/Mario-Coxe/pending-payment-watcher/issues)

</div>
