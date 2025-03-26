import http from "http";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { initializeWebSocket } from "./websocket";
import { scheduler } from "./utils/scheduler";
import knex from "../knexfile";
import { formatRemainingTime, formatDateTime } from "./helps/format-date-time";
dotenv.config();

const app: Express = express();
const server = http.createServer(app);

initializeWebSocket(server);

import { orderService } from "./services/order-service";

scheduler.start();

app.use(express.json());

app.get("/orders/:id/time-remaining", (req: Request, res: Response) => {
  (async () => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await knex("orders").where("id", orderId).first();

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const paymentTimeLimit = Number(process.env.PAYMENT_TIME_LIMIT) || 30;
      const createdAt = new Date(order.created_at);
      const deadline = new Date(createdAt.getTime() + paymentTimeLimit * 60000);
      const now = new Date();
      const remainingTime = Math.max(0, deadline.getTime() - now.getTime());

      return res.json({
        orderId,
        remainingTime: formatRemainingTime(remainingTime),
        createdAt: formatDateTime(createdAt),
        deadline: formatDateTime(deadline),
        checkedAt: formatDateTime(now),
        expired: remainingTime <= 0,
        paymentTimeLimitMinutes: paymentTimeLimit
      });
    } catch (error) {
      console.error("Error getting remaining time:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  })();
});

app.get("/test", (_req: Request, res: Response) => {
  res.status(200).json({ status: "test" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🔄 Server and scheduler running on port ${PORT}`);
  console.log(
    `⏱️ payment term: ${process.env.PAYMENT_TIME_LIMIT || 30} minutos`
  );
  console.log(
    `⏳ Checking orders every: ${process.env.TIME_CHECK || 30} minuto(s)`
  );
});
