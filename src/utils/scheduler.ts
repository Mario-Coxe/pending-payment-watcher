import { orderService } from "../services/order-service";

export const scheduler = {
  start(): void {
    setInterval(async () => {
      await orderService.checkAndCancelUnpaidOrders();
    }, 1 * 60 * 1000); // 2 minutos
  },
};