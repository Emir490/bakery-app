import { User } from "./user.interface";

export interface UsersContextProps {
    addUser: (user: User) => Promise<any>;
    updateUser: (id: string, user: User) => Promise<any>;
    deleteUser: (id: string) => Promise<void>;
    user: User;
    users: User[];
    setUser: React.Dispatch<React.SetStateAction<User>>;
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}