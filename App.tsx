import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthProvider";
import Navigation from "./src/views/Navigation";
import { UsersProvider } from "./src/context/UsersProvider";
import { ItemsProvider } from "./src/context/ItemsProvider";
import { ProductionProvider } from "./src/context/ProductionProvider";

export default function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <ItemsProvider>
          <ProductionProvider>
            <Navigation />
          </ProductionProvider>
        </ItemsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
