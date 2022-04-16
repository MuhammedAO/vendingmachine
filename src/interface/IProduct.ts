export interface IProductCreate {
  amountAvailable: number;
  cost: number;
  sellerId?: string;
  productName: string;
}
export interface IProductUpdate {
  _id: string
  amountAvailable?: number;
  cost?: number;
  sellerId?: string;
  productName?: string;
}