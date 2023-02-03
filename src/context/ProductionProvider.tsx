import { ReactNode, createContext, useState } from "react";
import { IProduct } from "../interfaces/product.interface";
import { ProductionsContextProps } from "../interfaces/productions.interface";

const ProductionContext = createContext<ProductionsContextProps>({} as ProductionsContextProps);

interface Products {
    products: IProduct[];
    area: 'panaderia' | 'pasteleria';
}

export const ProductionProvider = ({children}: {children: ReactNode}) => {
    const addProductions = (items: Products) => {
        

        console.log(items);
    }

    return (
        <ProductionContext.Provider value={{addProductions}}>
            {children}
        </ProductionContext.Provider>
    )
}

export default ProductionContext;