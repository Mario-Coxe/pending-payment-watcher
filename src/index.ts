import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { initializeWebSocket } from './websocket';
import { scheduler } from './utils/scheduler';

dotenv.config();
const app = express();
const server = http.createServer(app);

initializeWebSocket(server);

import { orderService } from './services/order-service';

scheduler.start();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🔄 Servidor e scheduler rodando na porta ${PORT}`);
  console.log(`⏱️ Verificando pedidos a cada ${process.env.TIME_CHECK || 30} minuto(s)`);
});