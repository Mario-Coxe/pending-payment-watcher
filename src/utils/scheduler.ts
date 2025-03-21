import dotenv from "dotenv";
import { orderService } from "services/order-service";

dotenv.config();

const TIME_CHECK = Number(process.env.TIME_CHECK) || 30; 

export const scheduler = {
  start(): void {
    setInterval(async () => {
      await orderService.checkAndCancelUnpaidOrders();
    }, TIME_CHECK * 60 * 1000); 
  },
};
