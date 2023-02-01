import { Item } from "./item.interface";

export interface ItemsContextProps {
    items: Item[];
    item: Item;
    setItem: React.Dispatch<React.SetStateAction<Item>>;
    addItem: (item: Item) => Promise<any>;
    updateItem: (id: string, item: Item) => Promise<any>;
    deleteItem: (id: string) => Promise<void>;
}