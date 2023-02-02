import { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Phone: undefined;
  Admin: undefined;
};

export type RootAdminParamList = {
  Employees: undefined;
  Items: undefined;
  Production: undefined;
}

export type RootEmployeersParamList = {
  List: undefined;
  Add: undefined;
}

export type RootItemsParamList = {
  ItemList: undefined;
  AddItem: undefined;
}

export type RootProductionParamList = {
  Bakery: undefined;
  Pastry: undefined;
}

export type RootBakeryParamList = {
  Production: undefined;
  AddDate: undefined;
  AddProduction: undefined;
}

export type RootPastryParamList = {
  Production: undefined;
  AddProduction: undefined;
}

export type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;
export type PhoneScreenNavigationProp = NavigationProp<RootStackParamList, 'Phone'>;
export type ListScreenNavigationProp = NavigationProp<RootEmployeersParamList, 'List'>;
export type AddScreenNavigationProp = NavigationProp<RootEmployeersParamList, 'Add'>;
export type ItemsScreenNavigationProp = NavigationProp<RootItemsParamList, 'ItemList'>;
export type AddItemScreenNavigationProp = NavigationProp<RootItemsParamList, 'AddItem'>;
export type AddProductionNavigationProp = NavigationProp<RootBakeryParamList>