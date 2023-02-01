import { useContext } from "react"
import ItemsContext from "../context/ItemsProvider";

const useItems = () => {
    return useContext(ItemsContext);
}

export default useItems;