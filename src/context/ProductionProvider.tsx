import { ReactNode, createContext, useEffect, useState } from "react";
import { IProduct } from "../interfaces/product.interface";
import { ProductionsContextProps } from "../interfaces/productions.interface";
import { setAuthorizationHeader } from "../config/api";
import clientAxios from "../config/axios";
import { IProduction } from "../interfaces/production.interface";

const ProductionContext = createContext<ProductionsContextProps>({} as ProductionsContextProps);

interface Products {
    items: IProduct[];
    area?: 'panaderia' | 'pasteleria';
}

export const ProductionProvider = ({children}: {children: ReactNode}) => {
    const [productions, setProductions] = useState<IProduction[]>([]);
    const [production, setProduction] = useState<IProduction>({} as IProduction);

    useEffect(() => {
        const getProductions = async () => {
            try {
                const config = await setAuthorizationHeader();
    
                const { data } = await clientAxios('/production', config);
    
                setProductions(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        getProductions();
    }, [productions]);

    const addProductions = async (items: Products) => {
        try {
            const config = await setAuthorizationHeader();

            const { data } = await clientAxios.post('/production', items, config);

            setProductions(prevProductions => [...prevProductions, data]);
        } catch (error) {
            console.log(error);
        }
    }

    const getProduction = async (id: string) => {
        try {
            const config = await setAuthorizationHeader();
            const { data } = await clientAxios(`/production/${id}`, config);     
            
            return data as IProduction;
        } catch (error) {
            console.log(error);
        }
    }

    const editProduction = async (id: string, items: Products) => {
        try {
            const config = await setAuthorizationHeader();
            console.log(items);
            
            const { data } = await clientAxios.put(`/production/${id}`, items, config);

            const updatedItems = productions.map(productionState => productionState._id === data._id? data : productionState);

            setProductions(updatedItems);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduction = async (id: string) => {
        try {
            const config = await setAuthorizationHeader();

            const { data } = await clientAxios.delete(`/production/${id}`, config);

            productions.filter(production => production._id !== data._id);

            setProductions(productions);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProductionContext.Provider value={{productions, production, setProduction, addProductions, getProduction, editProduction, deleteProduction}}>
            {children}
        </ProductionContext.Provider>
    )
}

export default ProductionContext;