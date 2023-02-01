import { getItemAsync } from "expo-secure-store";

export const setAuthorizationHeader = async () => {
    const token = await getItemAsync('token');

    if (!token) {
      return
    }
  
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
}