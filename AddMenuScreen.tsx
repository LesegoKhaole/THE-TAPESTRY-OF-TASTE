// src/components/AddMenuScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Modal, FlatList, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { MenuItem } from './types';
import { MenuContext } from './App';

const courses = ["Starter", "Main", "Dessert", "Appetizer", "Special", "New", "On Sale", "Favourite"];

const AddMenuScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
  const { setMenuItems } = context;

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const addMenuItem = () => {
    if (!dishName || !description || !price) {
      Alert.alert("All fields are required");
      return;
    }

    const newItem: MenuItem = { id: Date.now(), dishName, description, course, price: parseFloat(price) };
    setMenuItems((prevItems) => [...prevItems, newItem]);

    Alert.alert("Menu Item Added");
    navigation.navigate('Home');
  };

  return (

    <ImageBackground 
      source={require('./assets/R.jpeg')} 
      style={styles.background}
      resizeMode="cover" 
    >
    <View style={styles.container}>
      <TextInput placeholder="Dish Name"  onChangeText={setDishName} style={styles.input} />
      <TextInput placeholder="Description" onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Price" onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
        <Text  style={styles.pickerText}>{course}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View  style={styles.modalView}>
          <FlatList 
            data={courses}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                setCourse(item);
                setModalVisible(false);
              }}>
                <Text  style={styles.modalItem}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <View style={styles.container1}>
      <Button title="Add Menu Item" color={'#ffffff'} onPress={addMenuItem} />
      </View>
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '80%',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 20,
    width: '80%',
    borderRadius: 5,
  },
  pickerText: {
    padding: 10,
    color: '#ffffff',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e6d9d9',
    width: '100%',
    textAlign: 'center',
  },
  container1: {
    backgroundColor: 'rgb(255, 145, 0)', 
    padding: 10,
    width:'auto',
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4a2200',
    top: 0, 
  },
});

export default AddMenuScreen;