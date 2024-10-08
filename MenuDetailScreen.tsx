// src/components/MenuDetailScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet,ImageBackground} from 'react-native';
import { MenuItem } from './types';



const MenuDetailScreen = ({ route, navigation }: any) => {
  const { item } = route.params;

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text>{item.description}</Text>
      <Text>Course: {item.course}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
    </View>
  )

  

  return (
    <ImageBackground 
      source={require('./assets/R.jpeg')} 
      style={styles.background2}
      resizeMode="cover" 
    >
    <View style={styles.container}>
      <ImageBackground 
      source={require('./assets/R.jpeg')} 
      style={styles.background}
      resizeMode="cover" 
    ><View style={styles.menuItem}>
      <Text style={styles.text}>{item.dishName}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Text style={styles.text}>Course: {item.course}</Text>
      <Text style={styles.text}>Price: ${item.price.toFixed(2)}</Text>
      </View>
      </ImageBackground>
      <Button title="Back to Filter" onPress={() => navigation.navigate('Filter')} />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  background2: {
    flex: 1,
    justifyContent: 'center',
    
  },


  background: {
    flex: 1,
    justifyContent: 'center',
    
  },

  container: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: '#003366',
    fontSize: 18,
    marginVertical: 20,
  },

  menuItem: {
    marginVertical: 10,
    padding: 100,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    
  },
  dishName: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 16,
  },

  

});

export default MenuDetailScreen;