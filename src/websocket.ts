import { Server, Socket } from "socket.io";
import * as http from "http";

let io: Server;

export function initializeWebSocket(server: http.Server): Server {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });

  return io;
}

export function notifyOrderCancellation(orderId: number): void {
  if (!io) throw new Error("WebSocket não inicializado");

  io.emit("order_cancelled", {
    orderId,
    timestamp: new Date().toISOString()
  });
  console.log(`Notificação enviada para pedido ${orderId}`);
}
