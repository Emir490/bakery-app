import { NavigationProp } from '@react-navigation/native';
import { IProduction } from '../interfaces/production.interface';

export type RootStackParamList = {
  Login: undefined;
  Phone: undefined;
  Admin: undefined;
};

export type RootAdminParamList = {
  Employees: undefined;
  Items: undefined;
  Production: undefined;
  Sales: undefined;
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
  AddProduction: undefined;
  ProductionList: undefined;
}

export type RootPastryParamList = {
  Production: undefined;
  NewProduction: undefined;
  ProductionInfo: undefined;
}

export type RootSalesParamList = {
  SalesList: undefined;
  Cart: undefined;
  Sale: undefined;
}

export type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;
export type PhoneScreenNavigationProp = NavigationProp<RootStackParamList, 'Phone'>;
export type ListScreenNavigationProp = NavigationProp<RootEmployeersParamList, 'List'>;
export type AddScreenNavigationProp = NavigationProp<RootEmployeersParamList, 'Add'>;
export type ItemsScreenNavigationProp = NavigationProp<RootItemsParamList, 'ItemList'>;
export type AddItemScreenNavigationProp = NavigationProp<RootItemsParamList, 'AddItem'>;
export type AddProductionNavigationProp = NavigationProp<RootBakeryParamList>
export type PastryProductionNavigationProp = NavigationProp<RootPastryParamList>
export type ProductionNavigationProp = NavigationProp<RootProductionParamList>;
export type SalesNavigationProp = NavigationProp<RootSalesParamList>;