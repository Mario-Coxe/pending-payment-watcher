export enum PAYMENT_STATUS_ENUM {
  PENDING = "pending",
  PAID = "paid",
  REFUNDED = "refunded"
}

export enum PAYMENT_METHOD_ENUM {
  CASH = "cash",
  CARD = "card",
  BANK_TRANSFER = "bank_transfer"
}

export enum ORDER_STATUS_ENUM {
  PENDING = "pending",
  PREPARING = "preparing",
  OUT_FOR_DELIVERY = "out_for_delivery", //pronto_para_entrega
  DELIVERED = "delivered",
  CANCELED = "canceled"
}

export interface Order {
  id: number;
  user_id: number;
  status: ORDER_STATUS_ENUM;
  payment_status: PAYMENT_STATUS_ENUM;
  payment_method: PAYMENT_METHOD_ENUM;
  createdAt: Date;
}
