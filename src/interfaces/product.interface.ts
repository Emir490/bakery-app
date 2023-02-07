export interface IProduct {
    item: string;
    quantity: number;
    price?: number;
    tax?: number;
    priceFinal?: number;
    subtotal?: number;
    total?: number;
}