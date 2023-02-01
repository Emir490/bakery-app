import axios from "axios";
import Constants from "expo-constants";

const clientAxios = axios.create({
    baseURL: `${Constants.manifest?.extra?.api_url}`
});

export default clientAxios;