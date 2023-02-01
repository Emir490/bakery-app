import { ReactNode, createContext, useEffect, useState } from "react";
import { UsersContextProps } from "../interfaces/users.interface";
import clientAxios from "../config/axios";
import { User } from "../interfaces/user.interface";
import { getItemAsync } from "expo-secure-store";
import { setAuthorizationHeader } from "../config/api";

const UsersContext = createContext<UsersContextProps>({} as UsersContextProps);

const UsersProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState(true);
    const [users, setUsers] = useState([] as User[]);
    const [user, setUser] = useState({} as User);

    useEffect(() => {
      const getUsers = async () => {
        try {
            const config = await setAuthorizationHeader();

            const { data } = await clientAxios('/users', config);
            
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
      }
      getUsers();
    }, [users])
    

    const addUser = async (userObj: User) => {
        const config = await setAuthorizationHeader();

        
        if (userObj.position == 'admin') {
            delete userObj.position;
        }

        try {
            const url = userObj.position? '/users/register-employee' : '/users/register';
                        
            const { data } = await clientAxios.post(url, userObj, config);

            const { name, user, phone, position, salary, _id } = data;
            
            const obj = {
                _id,
                name,
                user,
                phone,
                position,
                salary
            }

            setUsers([...users, obj]);
        } catch (error: any) {
            return error.response.data;
        }
    }

    const updateUser = async (id: string, userObj: User) => {
        try {
            const token = await getItemAsync('token');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.put(`/users/${id}`, userObj, config);

            const { name, user, phone, position, salary, _id } = data;
            
            const obj = {
                _id,
                name,
                user,
                phone,
                position,
                salary
            }

            const updatedUsers = users.map(userState => userState._id === obj._id? obj : userState);
            setUsers(updatedUsers);
            setUser({} as User);
        } catch (error: any) {
            return error.response.data;
        }
    }

    const deleteUser = async (id: string) => {
        try {
            const token = await getItemAsync('token');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clientAxios.delete(`/users/${id}`, config);

            const updatedUsers = users.filter(userState => userState._id !== data._id);

            setUsers(updatedUsers);
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <UsersContext.Provider
        value={{
          user,
          users,
          setUser,
          addUser,
          modal,
          setModal,
          updateUser,
          deleteUser,
        }}
      >
        {children}
      </UsersContext.Provider>
    );
}

export { UsersProvider }
export default UsersContext;