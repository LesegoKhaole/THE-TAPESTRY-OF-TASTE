// src/components/EditMenuScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Modal, FlatList, TouchableOpacity,ImageBackground, Text } from 'react-native';
import { MenuContext } from './App';
import { MenuItem } from './types';

const courses = ["Starter", "Main", "Dessert", "Appetizer", "Special", "New", "On Sale", "Favourite"];

const EditMenuScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { item } = route.params;
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
  const { setMenuItems } = context;

  const [dishName, setDishName] = useState(item.dishName);
  const [description, setDescription] = useState(item.description);
  const [course, setCourse] = useState(item.course);
  const [price, setPrice] = useState(item.price.toString());
  const [modalVisible, setModalVisible] = useState(false);

  const saveChanges = () => {
    if (!dishName || !description || !price) {
      Alert.alert("All fields are required");
      return;
    }

    const updatedItem: MenuItem = { ...item, dishName, description, course, price: parseFloat(price) };
    setMenuItems(prevItems => 
      prevItems.map(menuItem => (menuItem.id === item.id ? updatedItem : menuItem))
    );

    Alert.alert("Menu Item Updated");
    navigation.navigate('Home');
  };

  

  return (

    <ImageBackground 
      source={require('./assets/R.jpeg')} 
      style={styles.background}
      resizeMode="cover" 
    >

    <View style={styles.container}>
      <TextInput 
        placeholder="Dish Name" 
        value={dishName} 
        onChangeText={setDishName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Description" 
        value={description} 
        onChangeText={setDescription} 
        style={styles.input} 
      />
      <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
        <Text style={styles.pickerText}>{course}</Text>
      </TouchableOpacity>
      <TextInput 
        placeholder="Price" 
        value={price} 
        onChangeText={setPrice} 
        keyboardType="numeric" 
        style={styles.input} 
      />
      <View style={styles.container1}>
      <Button title="Save Changes" color={'#ffff'} onPress={saveChanges} />
      </View>
      {/* Modal for Course Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <FlatList
            data={courses}
            keyExtractor={(item) => item}
            renderItem={({ item: courseItem }) => (
              <TouchableOpacity onPress={() => {
                setCourse(courseItem);
                setModalVisible(false);
              }}>
                <Text style={styles.modalItem}>{courseItem}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>

    </ImageBackground>
  );
  
};

const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: 'center',
    borderWidth:5, 
    shadowOpacity:1,
    shadowColor:'#032c30',
    borderColor:'#4a2200',
  },

  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor:'#ffff',
    borderWidth: 3,
    marginBottom: 20,
    paddingLeft: 10,
    width: '80%',
    borderRadius: 5,
    fontWeight:'600',

  },
  picker: {
    height: 50,
    borderColor:'#ffff',
    borderWidth: 3,
    justifyContent: 'center',
    marginBottom: 20,
    width: '80%',
    borderRadius: 5,
  },
  pickerText: {
    padding: 10,
    color: '#003366',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#bd7e00',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    textAlign: 'center',
    color:'#fff',
    fontWeight:'600',
  },

  container1: {
    backgroundColor: 'rgb(255, 145, 0)', 
    padding: 10,
    width: 200,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4a2200',
    
  },

});

export default EditMenuScreen;