// src/types.ts
export interface MenuItem {
    id: number;
    dishName: string;
    description: string;
    course: string;
    price: number;
    image?: string; // optional property for image
  }
  // src/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type MenuStackParamList = {
  Login: undefined;
  Home: undefined;
  AddMenu: { menuItems: MenuItem[] }; // Define the params expected for AddMenu
  MenuDetail: undefined;
  Filter: undefined;
};

export type AddMenuScreenNavigationProp = NativeStackNavigationProp<MenuStackParamList, 'AddMenu'>;

export interface AddMenuScreenProps {
  navigation: AddMenuScreenNavigationProp;
  route: {
    params: {
      menuItems: MenuItem[];
    };
  };
}