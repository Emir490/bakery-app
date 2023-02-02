import { useContext } from "react";
import ProductionContext from "../context/ProductionProvider";

const useProductions = () => {
    return useContext(ProductionContext);
}

export default useProductions;