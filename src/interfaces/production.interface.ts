import { IProduct } from "./product.interface";

export interface IProduction {
    _id: string;
    items: IProduct[];
    quantity: number;
    subtotal: number;
    total: number;
    area: "panaderia" | "pasteleria";
    salary: number;
    createdAt: Date;
}