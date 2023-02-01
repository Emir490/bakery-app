import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/views/Login";
import Phone from "./src/views/Phone";
import { RootAdminParamList, RootStackParamList } from "./src/types/navigation";
import { colors } from "./src/styles";
import { AuthProvider } from "./src/context/AuthProvider";
import useAuth from "./src/hooks/useAuth";
import Employees from "./src/views/Employees";
import Navigation from "./src/views/Navigation";
import { UsersProvider } from "./src/context/UsersProvider";
import { ItemsProvider } from "./src/context/ItemsProvider";

export default function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <ItemsProvider>
          <Navigation />
        </ItemsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
