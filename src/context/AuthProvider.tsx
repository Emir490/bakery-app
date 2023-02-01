import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthContextProps } from "../interfaces/auth.interface";
import axios from "axios";
import Constants from "expo-constants";
import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const apiUrl = Constants.manifest?.extra?.api_url;

  useEffect(() => {
    const authenticateUser = async () => {
      const token = await getItemAsync('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axios(`${apiUrl}/users/profile`, config);
        setAuth(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    authenticateUser();
  }, []);
  

  const login = async (user: string, password: string) => {
    try {
      const { data } = await axios.post(`${apiUrl}/auth/login`, { user, password });

      await setItemAsync('token', data.token);
      setAuth(data);
      
      return data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  };

  const logout = async () => {
    await deleteItemAsync('token');
    setAuth({});
  }

  const sendSMS = async (number: string) => {
    try {
      await axios(`${apiUrl}/auth/forgot-password?phone=52${number}`);

      return { msg: "Código enviado" };
    } catch (error: any) {
      console.log(error);
      return { error: true, msg: error.response.data };
    }
  };

  const confirmCode = async (number: string, code: string, password: string) => {
    try {
      const { data } = await axios.put(`${apiUrl}/auth/reset-password?phone=52${number}&code=${code}`, { password });

      return { msg: data }
    } catch (error: any) {
      console.log(error);
      return { error: true, msg: error.response.data };
    }
  }

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout, sendSMS, confirmCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
