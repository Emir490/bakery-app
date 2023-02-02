import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { AddScreenNavigationProp, RootAdminParamList, RootEmployeersParamList, RootItemsParamList, RootStackParamList, AddItemScreenNavigationProp, RootProductionParamList, RootBakeryParamList, RootPastryParamList, AddProductionNavigationProp } from "../types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerNavigationProp } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Production from "./Production";
import AddProduction from "./AddProduction";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootAdminParamList>();
const Employee = createStackNavigator<RootEmployeersParamList>();
const ItemTab = createStackNavigator<RootItemsParamList>();
const ProductionTab = createBottomTabNavigator<RootProductionParamList>();
const BakeryStack = createStackNavigator<RootBakeryParamList>();
const PastryStack = createStackNavigator<RootPastryParamList>();

function EmployeesNav() {
  const navigator = useNavigation<AddScreenNavigationProp>();
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  const { setUser } = useUsers();
  
  return (
    <Employee.Navigator>
      <Employee.Screen name="List" component={Employees} options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {
            setUser({} as User);
            navigator.navigate('Add');
          }} style={{ backgroundColor: colors.brown, marginRight: 20, borderRadius: 50, padding: 5 }}>
            <Ionicons name="add-sharp" size={24} color="white" />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: colors.deep },
        headerLeft: () => (
          <TouchableOpacity onPress={() => {
            menu.toggleDrawer();
          }}>
            <Ionicons style={{ marginLeft: 15 }} name="ios-menu" size={36} color="black" />
          </TouchableOpacity>
        ),
        title: 'Empleados'
      }} />
      <Employee.Screen name="Add" component={AddUser} options={{ headerShown: false, presentation: 'modal' }} />
    </Employee.Navigator>
  )
}

function ItemsNav() {
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  const { setItem } = useItems();
  const { navigate } = useNavigation<AddItemScreenNavigationProp>();
  return (
    <ItemTab.Navigator>
      <ItemTab.Screen name="ItemList" component={Items} options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => {
            setItem({} as Item);
            navigate('AddItem');
          }} style={{ backgroundColor: colors.brown, marginRight: 20, borderRadius: 50, padding: 5 }}>
            <Ionicons name="add-sharp" size={24} color="white" />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: colors.deep },
        headerLeft: () => (
          <TouchableOpacity onPress={() => {
            menu.toggleDrawer();
          }}>
            <Ionicons style={{ marginLeft: 15 }} name="ios-menu" size={36} color="black" />
          </TouchableOpacity>
        ),
        title: 'Artículos'
      }} />
      <ItemTab.Screen name="AddItem" component={AddItem} options={{ headerShown: false, presentation: 'modal' }} />
    </ItemTab.Navigator>
  )
}

function Bakery() {
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  const { navigate } = useNavigation<AddProductionNavigationProp>();
  return (
    <BakeryStack.Navigator>
      <BakeryStack.Screen name="Production" component={Production} options={{
        title: 'Panadería', headerLeft: () => (
          <TouchableOpacity onPress={() => {
            menu.toggleDrawer();
          }}>
            <Ionicons style={{ marginLeft: 15 }} name="ios-menu" size={36} color={colors.banana} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {
            navigate('AddProduction');
          }} style={{ backgroundColor: colors.banana, marginRight: 20, borderRadius: 50, padding: 5 }}>
            <Ionicons name="add-sharp" size={24} color={colors.dark} />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: colors.dark },
        headerTitleStyle: { color: colors.banana },
        headerShadowVisible: false
      }} />
      <BakeryStack.Screen name="AddProduction" component={AddProduction} options={{presentation: 'modal', headerBackTitleStyle: {color: colors.banana}, headerStyle: {backgroundColor: colors.dark}, headerTintColor: colors.banana, title: 'Agregar producción', headerTitleStyle: {color: colors.banana}, headerShadowVisible: false, headerBackTitleVisible: false }} />
    </BakeryStack.Navigator>
  )
}

function Pastry() {
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  return (
    <PastryStack.Navigator>
      <PastryStack.Screen name="Production" component={Production} options={{
        title: 'Pastelería', headerLeft: () => (
          <TouchableOpacity onPress={() => {
            menu.toggleDrawer();
          }}>
            <Ionicons style={{ marginLeft: 15 }} name="ios-menu" size={36} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {
          }} style={{ backgroundColor: colors.brown, marginRight: 20, borderRadius: 50, padding: 5 }}>
            <Ionicons name="add-sharp" size={24} color="white" />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: colors.deep }
      }} />
      <PastryStack.Screen name="AddProduction" component={AddProduction} />
    </PastryStack.Navigator>
  )
}

function ProductionNav() {
  return (
    <ProductionTab.Navigator screenOptions={({route}) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.dark,
        borderTopColor: colors.dark
      },
      tabBarIcon: ({color, size}) => {
        let iconName;

        if (route.name == 'Bakery') {
          iconName = 'baguette';
        } else if(route.name == 'Pastry') {
          iconName = 'cake-variant';
        }

        return <MaterialCommunityIcons name={iconName === 'baguette'? 'baguette' : 'cake-variant'} size={24} color='white' />
      }
    })}>
      <ProductionTab.Screen name="Bakery" component={Bakery} options={{ headerShown: false, tabBarActiveTintColor: '#FFF' }} />
      <ProductionTab.Screen name="Pastry" component={Pastry} options={{headerShown: false, tabBarActiveTintColor: '#FFF'}} />
    </ProductionTab.Navigator>
  )
}

function Admin() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Employees"
        component={EmployeesNav}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Items"
        component={ItemsNav}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Production" component={ProductionNav} options={{ headerShown: false }} />
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
