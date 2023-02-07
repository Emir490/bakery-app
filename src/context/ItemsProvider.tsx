import { createContext, ReactNode, useEffect, useState } from "react";
import { ItemsContextProps } from "../interfaces/items.interface";
import { Item } from "../interfaces/item.interface";
import { getItemAsync } from "expo-secure-store";
import clientAxios from "../config/axios";
import { setAuthorizationHeader } from "../config/api";
import { Alert } from "react-native";

const ItemsContext = createContext<ItemsContextProps>({} as ItemsContextProps);

const ItemsProvider = ({ children }: {children : ReactNode}) => {
    const [items, setItems] = useState([] as Item[]);
    const [item, setItem] = useState({} as Item);

    useEffect(() => {
      const getItems = async () => {
        try {
            const config = await setAuthorizationHeader();

            const { data } = await clientAxios('/item', config);
            
            setItems(data);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Ha ocurrido un error inesperado');
        }
      }
      getItems();
    }, [items])
    

    const addItem = async (item: Item) => {
        try {
            const token = await getItemAsync('token');
            if (!token) {
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.post('/item', item, config);

            const { _id, name, price, type, area } = data;
            const obj = {
                _id,
                name,
                price,
                type,
                area
            }

            setItems([...items, obj]);
        } catch (error: any) {
            return error.response.data;
        }
    }

    const getItem = async (id: string) => {
        try {
            const config = await setAuthorizationHeader();

            const { data } = await clientAxios(`/item/${id}`, config);

            const { _id, name, price, type, area } = data;
            const obj = {
                _id,
                name,
                price,
                type,
                area
            }

            return obj;
        } catch (error) {
            console.log(error);
        }
    }

    const updateItem = async (id: string, item: Item) => {
        try {
            const config = await setAuthorizationHeader();

            const { data } = await clientAxios.put(`/item/${id}`, item, config);

            const { _id, name, price, type, area } = data;
            const obj = {
                _id,
                name,
                price,
                type,
                area
            }

            const updatedItems = items.map(itemState => itemState._id === obj._id? data : itemState);

            setItems(updatedItems);
            setItem({} as Item);
        } catch (error: any) {
            return error.response.data;
        }
    }

    const deleteItem = async (id: string) => {
        try {
            const config = await setAuthorizationHeader();

            const { data } = await clientAxios.delete(`/item/${id}`, config);

            const updatedItems = items.filter(itemState => itemState._id !== data._id);
            setItems(updatedItems);
        } catch (error) {
            Alert.alert('Error', 'Ha ocurrido un error inesperado');
        }
    }

    return (
        <ItemsContext.Provider value={{items, item, setItem, addItem, getItem, updateItem, deleteItem}}>
            {children}
        </ItemsContext.Provider>
    )
}

export { ItemsProvider }
export default ItemsContext;