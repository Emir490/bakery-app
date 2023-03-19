import { Cart } from "./cart.interface";
import { Sale } from "./sale.interface";

export interface SalesContextProps {
    sale: Cart;
    sales: Cart[];
    addSale: (items: Cart) => Promise<void>;
}