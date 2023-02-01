import { User } from "./user.interface";

export interface AuthContextProps {
    auth: User | {};
    loading: boolean;
    login: (user: string, password: string) => Promise<any>;
    sendSMS: (number: string) => Promise<any>;
    confirmCode: (number: string, code: string, password: string) => Promise<any>;
    logout: () => void;
}