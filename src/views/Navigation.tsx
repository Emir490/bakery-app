import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  AddScreenNavigationProp,
  RootAdminParamList,
  RootEmployeersParamList,
  RootItemsParamList,
  RootStackParamList,
  AddItemScreenNavigationProp,
  RootProductionParamList,
  RootBakeryParamList,
  AddProductionNavigationProp,
  PastryProductionNavigationProp,
  RootPastryParamList,
  RootSalesParamList,
  SalesNavigationProp,
} from "../types/navigation";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useAuth from "../hooks/useAuth";
import Employees from "./Employees";
import Login from "./Login";
import Phone from "./Phone";
import { colors } from "../styles";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddUser from "./AddUser";
import useUsers from "../hooks/useUsers";
import { User } from "../interfaces/user.interface";
import Items from "./Items";
import AddItem from "./AddItem";
import useItems from "../hooks/useItems";
import { Item } from "../interfaces/item.interface";
import Productions from "./Productions";
import AddProduction from "./AddProduction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductionList from "./ProductionList";
import useProductions from "../hooks/useProductions";
import { IProduction } from "../interfaces/production.interface";
import Sales from "./Sales";
import Cart from "./Cart";
import Sale from "./Sale";

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootAdminParamList>();
const Employee = createStackNavigator<RootEmployeersParamList>();
const ItemTab = createStackNavigator<RootItemsParamList>();
const ProductionTab = createBottomTabNavigator<RootProductionParamList>();
const BakeryStack = createStackNavigator<RootBakeryParamList>();
const PastryStack = createStackNavigator<RootPastryParamList>();
const SalesStack = createStackNavigator<RootSalesParamList>();

function EmployeesNav() {
  const navigator = useNavigation<AddScreenNavigationProp>();
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  const { setUser } = useUsers();

  return (
    <Employee.Navigator>
      <Employee.Screen
        name="List"
        component={Employees}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setUser({} as User);
                navigator.navigate("Add");
              }}
              style={{
                backgroundColor: colors.brown,
                marginRight: 20,
                borderRadius: 50,
                padding: 5,
              }}
            >
              <Ionicons name="add-sharp" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: colors.deep },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                menu.toggleDrawer();
              }}
            >
              <Ionicons
                style={{ marginLeft: 15 }}
                name="ios-menu"
                size={36}
                color="black"
              />
            </TouchableOpacity>
          ),
          title: "Empleados",
        }}
      />
      <Employee.Screen
        name="Add"
        component={AddUser}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Employee.Navigator>
  );
}

function ItemsNav() {
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  const { setItem } = useItems();
  const { navigate } = useNavigation<AddItemScreenNavigationProp>();
  return (
    <ItemTab.Navigator>
      <ItemTab.Screen
        name="ItemList"
        component={Items}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setItem({} as Item);
                navigate("AddItem");
              }}
              style={{
                backgroundColor: colors.brown,
                marginRight: 20,
                borderRadius: 50,
                padding: 5,
              }}
            >
              <Ionicons name="add-sharp" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: colors.deep },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                menu.toggleDrawer();
              }}
            >
              <Ionicons
                style={{ marginLeft: 15 }}
                name="ios-menu"
                size={36}
                color="black"
              />
            </TouchableOpacity>
          ),
          title: "Artículos",
        }}
      />
      <ItemTab.Screen
        name="AddItem"
        component={AddItem}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </ItemTab.Navigator>
  );
}

function Bakery() {
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  const { navigate } = useNavigation<AddProductionNavigationProp>();
  const { setProduction } = useProductions();
  return (
    <BakeryStack.Navigator initialRouteName="Production">
      <BakeryStack.Screen
        name="Production"
        component={Productions}
        options={{
          title: "Panadería",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                menu.toggleDrawer();
              }}
            >
              <Ionicons
                style={{ marginLeft: 15 }}
                name="ios-menu"
                size={36}
                color={colors.banana}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setProduction({} as IProduction);
                navigate("AddProduction");
              }}
              style={{
                backgroundColor: colors.banana,
                marginRight: 20,
                borderRadius: 50,
                padding: 5,
              }}
            >
              <Ionicons name="add-sharp" size={24} color={colors.dark} />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: colors.dark },
          headerTitleStyle: { color: colors.banana },
          headerShadowVisible: false,
        }}
      />
      <BakeryStack.Screen
        name="AddProduction"
        component={AddProduction}
        options={{
          presentation: "modal",
          headerBackTitleStyle: { color: colors.banana },
          headerStyle: { backgroundColor: colors.dark },
          headerTintColor: colors.banana,
          title: "Agregar producción",
          headerTitleStyle: { color: colors.banana },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <BakeryStack.Screen
        name="ProductionList"
        component={ProductionList}
        options={{
          presentation: "modal",
          headerBackTitleStyle: { color: colors.banana },
          headerStyle: { backgroundColor: colors.dark },
          headerTintColor: colors.banana,
          headerTitleStyle: { color: colors.banana },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          title: "Producción",
        }}
      />
    </BakeryStack.Navigator>
  );
}

function Pastry() {
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  const { navigate } = useNavigation<PastryProductionNavigationProp>();
  const { setProduction } = useProductions();
  return (
    <PastryStack.Navigator initialRouteName="Production">
      <PastryStack.Screen
        name="Production"
        component={Productions}
        options={{
          title: "Pastelería",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                menu.toggleDrawer();
              }}
            >
              <Ionicons
                style={{ marginLeft: 15 }}
                name="ios-menu"
                size={36}
                color={colors.banana}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setProduction({} as IProduction);
                navigate("NewProduction");
              }}
              style={{
                backgroundColor: colors.banana,
                marginRight: 20,
                borderRadius: 50,
                padding: 5,
              }}
            >
              <Ionicons name="add-sharp" size={24} color={colors.dark} />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: colors.dark },
          headerTitleStyle: { color: colors.banana },
          headerShadowVisible: false,
        }}
      />
      <PastryStack.Screen
        name="NewProduction"
        component={AddProduction}
        options={{
          presentation: "modal",
          headerBackTitleStyle: { color: colors.banana },
          headerStyle: { backgroundColor: colors.dark },
          headerTintColor: colors.banana,
          title: "Agregar producción",
          headerTitleStyle: { color: colors.banana },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <PastryStack.Screen
        name="ProductionInfo"
        component={ProductionList}
        options={{
          presentation: "modal",
          headerBackTitleStyle: { color: colors.banana },
          headerStyle: { backgroundColor: colors.dark },
          headerTintColor: colors.banana,
          headerTitleStyle: { color: colors.banana },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          title: "Producción",
        }}
      />
    </PastryStack.Navigator>
  );
}

function ProductionNav() {
  return (
    <ProductionTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark,
          borderTopColor: colors.dark,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == "Bakery") {
            iconName = "baguette";
          } else if (route.name == "Pastry") {
            iconName = "cake-variant";
          }

          return (
            <MaterialCommunityIcons
              name={iconName === "baguette" ? "baguette" : "cake-variant"}
              size={24}
              color="white"
            />
          );
        },
      })}
    >
      <ProductionTab.Screen
        name="Bakery"
        component={Bakery}
        options={{ headerShown: false, tabBarActiveTintColor: "#FFF" }}
      />
      <ProductionTab.Screen
        name="Pastry"
        component={Pastry}
        options={{ headerShown: false, tabBarActiveTintColor: "#FFF" }}
      />
    </ProductionTab.Navigator>
  );
}

function SalesNav() {
  const menu = useNavigation<DrawerNavigationProp<RootAdminParamList>>();
  const { navigate } = useNavigation<SalesNavigationProp>();
  return (
    <SalesStack.Navigator initialRouteName="SalesList">
      <SalesStack.Screen
        name="SalesList"
        component={Sales}
        options={{
          title: "Ventas",
          headerStyle: { backgroundColor: colors.dark },
          headerShadowVisible: false,
          headerTitleStyle: { color: colors.banana },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                menu.toggleDrawer();
              }}
            >
              <Ionicons
                style={{ marginLeft: 15 }}
                name="ios-menu"
                size={36}
                color={colors.banana}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigate("Cart");
              }}
              style={{
                backgroundColor: colors.banana,
                marginRight: 20,
                borderRadius: 50,
                padding: 5,
              }}
            >
              <Ionicons name="add-sharp" size={24} color={colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <SalesStack.Screen
        name="Cart"
        component={Cart}
        options={{
          presentation: "modal",
          headerBackTitleStyle: { color: colors.banana },
          headerStyle: { backgroundColor: colors.dark },
          headerTintColor: colors.banana,
          title: "Carrito de compras",
          headerTitleStyle: { color: colors.banana },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <SalesStack.Screen name="Sale" component={Sale} />
    </SalesStack.Navigator>
  );
}

function Admin() {
  return (
    <Drawer.Navigator initialRouteName="Employees">
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
      <Drawer.Screen
        name="Production"
        component={ProductionNav}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Sales"
        component={SalesNav}
        options={{ headerShown: false }}
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
