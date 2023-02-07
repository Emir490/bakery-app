import { IProduct } from "./product.interface";
import { IProduction } from "./production.interface";

interface Products {
    items: IProduct[];
    area?: 'panaderia' | 'pasteleria';
}

export interface ProductionsContextProps {
    productions: IProduction[];
    production: IProduction;
    setProduction: React.Dispatch<React.SetStateAction<IProduction>>;
    addProductions: (item: Products) => Promise<void>;
    getProduction: (id: string) => Promise<IProduction | undefined>;
    editProduction: (id: string, items: Products) => Promise<void>;
    deleteProduction: (id: string) => Promise<void>;
}