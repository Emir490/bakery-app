import { useContext } from "react"
import UsersContext from "../context/UsersProvider";

const useUsers = () => {
    return useContext(UsersContext);
}

export default useUsers;