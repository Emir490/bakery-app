import { createContext, ReactNode, useState } from "react";
import { Sale } from "../interfaces/sale.interface";
import { SalesContextProps } from "../interfaces/sales.interface";
import { Cart } from "../interfaces/cart.interface";
import { setAuthorizationHeader } from "../config/api";
import clientAxios from "../config/axios";

const SalesContext = createContext<SalesContextProps>({} as SalesContextProps);

export const SalesProvider = ({children}: {children: ReactNode}) => {
    const [sales, setSales] = useState<Cart[]>([]);
    const [sale, setSale] = useState<Cart>({} as Cart);

    const addSale = async (items: Sale[]) => {
        try {
            const config = await setAuthorizationHeader();

            const { data } = await clientAxios.post('/sales', items, config);

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SalesContext.Provider value={{sales, sale, addSale}}>
            {children}
        </SalesContext.Provider>
    )
}

export default SalesContext;