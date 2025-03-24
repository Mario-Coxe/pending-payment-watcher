import { Server } from "socket.io";

let io: Server;

export function initializeWebSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });

  return io;
}

export function notifyOrderCancellation(orderId: number) {
  if (io) {
    io.emit("order_cancelled", {
      orderId,
      timestamp: new Date().toISOString()
    });
  }
}
