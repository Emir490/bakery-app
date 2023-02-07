import { useContext } from "react";
import SalesContext from "../context/SalesProvider";

const useSales = () => {
    return useContext(SalesContext);
}

export default useSales;