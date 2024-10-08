// src/components/AddMenuScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Modal, FlatList, TouchableOpacity, Text } from 'react-native';
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
    <View style={styles.container}>
      <TextInput placeholder="Dish Name" onChangeText={setDishName} style={styles.input} />
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

      <Button title="Add Menu Item" onPress={addMenuItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0f7fa',
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
    color: '#003366',
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
  },
});

export default AddMenuScreen;