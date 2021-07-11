import { CreditCard } from './CreditCard';
import { Product } from './Product';

export enum OrderStatus {
  Approved = 'approved',
  Pending = 'pending',
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  credit_card: Omit<CreditCard, 'cvv' | 'name'>;
  items: OrderItem[];
  status: OrderStatus;
}
