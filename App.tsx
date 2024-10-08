// src/App.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AddMenuScreen from './AddMenuScreen';
import MenuDetailScreen from './MenuDetailScreen';
import FilterScreen from './FilterScreen';
import { MenuItem } from './types';
import EditMenuScreen from './EditMenuScreen';

const Stack = createNativeStackNavigator();
export const MenuContext = createContext<{ menuItems: MenuItem[], setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> } | undefined>(undefined);

const App = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddMenu" component={AddMenuScreen} />
           <Stack.Screen name="EditMenu" component={EditMenuScreen} />
          <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </MenuContext.Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2b704',
    alignItems: 'center',
    justifyContent: 'center',
  },


});

export default App;