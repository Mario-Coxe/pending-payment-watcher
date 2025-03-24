import knex from "../../knexfile";
import {
  Order,
  PAYMENT_METHOD_ENUM,
  PAYMENT_STATUS_ENUM,
  ORDER_STATUS_ENUM
} from "../interfaces/order";
import { notifyOrderCancellation } from "../websocket";

export const orderService = {
  async getPendingOrders(): Promise<Order[]> {
    const timeCheck = Number(process.env.TIME_CHECK) || 30;

    return knex("orders")
      .where("status", PAYMENT_STATUS_ENUM.PENDING)
      .andWhere("payment_method", PAYMENT_METHOD_ENUM.BANK_TRANSFER)
      .andWhere(
        "created_at",
        "<=",
        knex.raw(`NOW() - INTERVAL ? MINUTE`, [timeCheck])
      )
      .select("*");
  },

  async cancelOrder(orderId: number): Promise<void> {
    await knex("orders")
      .where("id", orderId)
      .update({ status: ORDER_STATUS_ENUM.CANCELED });
    notifyOrderCancellation(orderId);
  },

  async checkAndCancelUnpaidOrders(): Promise<void> {
    const pendingOrders = await this.getPendingOrders();

    for (const order of pendingOrders) {
      await this.cancelOrder(order.id);
      console.log(`Order ${order.id} cancelled due to unpaid status.`);
    }
  }
};
