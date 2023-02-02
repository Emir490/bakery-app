import { ReactNode, createContext, useState } from "react";
import { ProductionsContextProps } from "../interfaces/productions.interface";

const ProductionContext = createContext<ProductionsContextProps>({} as ProductionsContextProps);

export const ProductionProvider = ({children}: {children: ReactNode}) => {
    const [items, setItems] = useState([] as any[]);

    const addProduction = () => {
        console.log('wtf');
                
        console.log(items);
    }

    return (
        <ProductionContext.Provider value={{items, setItems, addProduction}}>
            {children}
        </ProductionContext.Provider>
    )
}

export default ProductionContext;