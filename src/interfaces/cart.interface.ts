import { Sale } from "./sale.interface";

export interface Cart {
    _id: string;
    items: Sale[];
    units: number;
    total: number;
}