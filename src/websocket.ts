import { Server, Socket } from "socket.io";
import * as http from "http";
import knex from "../knexfile";
import { formatDateTime, formatRemainingTime } from "./helps/format-date-time";
import { orderService } from "./services/order-service";
let io: Server;

export function initializeWebSocket(server: http.Server): Server {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET"]
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    socket.on("subscribe_to_order_timer", (data) => {
      const orderId = data.orderId;
      knex("orders")
        .where("id", orderId)
        .first()
        .then((order) => {
          if (order) {
            console.log(`Iniciando timer para order ${orderId}`);
            startOrderTimer(order, socket);
            socket.emit("subscription_confirmed", { orderId });
          } else {
            console.log(`Order ${orderId} não encontrada`);
            socket.emit("subscription_error", { error: "Order not found" });
          }
        })
        .catch((err) => {
          console.error("Erro ao buscar order:", err);
        });
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
}

function startOrderTimer(order: any, socket: Socket) {
  const paymentTimeLimit = Number(process.env.PAYMENT_TIME_LIMIT) || 30;
  const createdAt = new Date(order.created_at);
  const deadline = new Date(createdAt.getTime() + paymentTimeLimit * 60000);

  let interval: NodeJS.Timeout;

  const updateTimer = async () => {
    const now = new Date();
    const remainingTime = deadline.getTime() - now.getTime();
    const expired = remainingTime <= 0;

    const timerData = {
      event: "order_timer_update",
      orderId: order.id,
      remainingTime: formatRemainingTime(remainingTime),
      expired,
      createdAt: formatDateTime(new Date(order.created_at)),
      deadline: formatDateTime(deadline),
      updatedAt: formatDateTime(now)
    };

    socket.emit("order_timer_update", timerData);

    if (expired) {
      clearInterval(interval);
      try {
        await orderService.checkAndCancelUnpaidOrders();
      } catch (error) {
        console.error(
          `Error checking unpaid orders for order ${order.id}:`,
          error
        );
      }
    }
  };

  updateTimer();

  interval = setInterval(updateTimer, 1000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log(`Timer para order ${order.id} parado (cliente desconectado)`);
  });
}
