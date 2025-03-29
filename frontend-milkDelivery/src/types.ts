export type MilkType = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customerName: string;
  email: string;
  address: string;
  milkType: MilkType;
  quantity: number;
  paymentMode: 'CARD' | 'CASH' | 'UPI';
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED';
  createdAt: string;
};

export type User = {
  id: string;
  role: 'ADMIN' | 'CUSTOMER';
};