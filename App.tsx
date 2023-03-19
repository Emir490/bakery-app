import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthProvider";
import Navigation from "./src/views/Navigation";
import { UsersProvider } from "./src/context/UsersProvider";
import { ItemsProvider } from "./src/context/ItemsProvider";
import { ProductionProvider } from "./src/context/ProductionProvider";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { LogBox } from 'react-native';
import { SalesProvider } from "./src/context/SalesProvider";

export default function App() {
  LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate` with no listeners registered."]);
  return (
    <ActionSheetProvider>
      <AuthProvider>
        <UsersProvider>
          <ItemsProvider>
            <ProductionProvider>
              <SalesProvider>
                <Navigation />
              </SalesProvider>
            </ProductionProvider>
          </ItemsProvider>
        </UsersProvider>
      </AuthProvider>
    </ActionSheetProvider>
  );
}
