import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { AddScreenNavigationProp, RootAdminParamList, RootEmployeersParamList, RootItemsParamList, RootStackParamList, AddItemScreenNavigationProp } from "../types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import useAuth from "../hooks/useAuth";
import Employees from "./Employees";
import Login from "./Login";
import Phone from "./Phone";
import { colors } from "../styles";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AddUser from "./AddUser";
import useUsers from "../hooks/useUsers";
import { User } from "../interfaces/user.interface";
import Items from "./Items";
import AddItem from "./AddItem";
import useItems from "../hooks/useItems";
import { Item } from "../interfaces/item.interface";

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootAdminParamList>();
const Employee = createStackNavigator<RootEmployeersParamList>();
const ItemTab = createStackNavigator<RootItemsParamList>();

function EmployeesNav() {
  return (
    <Employee.Navigator>
      <Employee.Screen name="List" component={Employees} options={{headerShown: false}} />
      <Employee.Screen name="Add" component={AddUser} options={{headerShown: false, presentation: 'modal'}} />
    </Employee.Navigator>
  )
}

function ItemsNav() {
  return (
    <ItemTab.Navigator>
      <ItemTab.Screen name="ItemList" component={Items} options={{headerShown: false}} />
      <ItemTab.Screen name="AddItem" component={AddItem} options={{headerShown: false, presentation: 'modal'}} />
    </ItemTab.Navigator>
  )
}

function Admin() {
  const navigator = useNavigation<AddScreenNavigationProp>();
  const { navigate } = useNavigation<AddItemScreenNavigationProp>();
  const { modal, setModal, setUser } = useUsers();
  const { setItem } = useItems();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Employees"
        component={EmployeesNav}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => {
              setModal(false);
              setUser({} as User);
              navigator.navigate('Add');
            }} style={{backgroundColor: colors.brown, marginRight: 20, borderRadius: 50, padding: 5}}>
              <Ionicons name="add-sharp" size={24} color="white" />
            </TouchableOpacity>
          ), 
          headerStyle: {backgroundColor: colors.deep},
          headerShown: modal
        }}
      />
      <Drawer.Screen
        name="Items"
        component={ItemsNav}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => {
              setModal(false);
              setItem({} as Item);
              navigate('AddItem');
            }} style={{backgroundColor: colors.brown, marginRight: 20, borderRadius: 50, padding: 5}}>
              <Ionicons name="add-sharp" size={24} color="white" />
            </TouchableOpacity>
          ), 
          headerStyle: {backgroundColor: colors.deep},
          headerShown: modal
        }}
      />
    </Drawer.Navigator>
  );
}

const Navigation = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {Object.keys(auth).length > 0 ? (
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Phone"
              component={Phone}
              options={{
                title: "Restablecer",
                headerBackTitle: "Volver",
                headerTintColor: "#FFF",
                headerStyle: {
                  backgroundColor: colors.coffee,
                  borderBottomColor: colors.coffee,
                  borderBottomWidth: 20,
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
