import http from 'http';
import { initializeWebSocket } from './websocket';
import express from 'express';

const app = express();
const server = http.createServer(app);

// Inicializa o WebSocket
initializeWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});