import { OrderDocument } from 'src/orders/schemas/order.schema';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';

export interface ShippingDetails {
  address: string;
  city: string;
  postalCode: string;

}

export interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  productId: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface PaginatedProducts {
  products: ProductDocument[];
  pages: number;
  page: number;
}

export interface PaginatedOrders {
  orders: OrderDocument[];
  pages: number;
  page: number
}

export interface DateRange {
  startDate: string; 
  endDate: string;  
}

/**
 * mercado pago types notification
 */
export interface Notification<T = NotificationData> {
  /**ID de la notificación */
  id: number,
  /**Indica si la URL ingresada es válida. */
  live_mode: boolean,
  /**Tipo de notificacion recebida (payments, mp-connect, subscription etc) */
  type: NotificationType,
  date_created: string,
  /**UserID del vendedor */
  user_id: number,
  /**Indica si es una notificación duplicada o no */
  api_version: string,
  /**Tipo de notificación recibida, indicando si es la actualización de un recurso o bien la creación de un nuevo */
  action: 'created' | 'updated' | 'payment.created' | 'payment.updated' | 'application.deauthorized' | 'application.authorized',
  data: T,
}

export type NotificationType = 'subscription_preapproval' | 'payment' | 'subscription_preapproval_plan' | 'subscription_authorized_payment' | 'point_integration_wh' | 'delivery'

export type NotificationData = {
  /**
   * Id de la notificación
   */
  id: string
  [key: string]: any,
}