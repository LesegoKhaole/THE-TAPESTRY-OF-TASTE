// src/components/FilterScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Button, FlatList, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { MenuContext } from './App';
import { MenuItem } from './types';

const FilterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
  const { menuItems, setMenuItems } = context;

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filtering, setFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const removeMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const groupedMenuItems = menuItems.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
    if (!acc[item.course]) {
      acc[item.course] = [];
    }
    acc[item.course].push(item);
    return acc;
  }, {});

  const filteredMenuItems = menuItems.filter(item =>
    item.dishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text>{item.description}</Text>
      <Text>Course: {item.course}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
      <Button title="Select" onPress={() => navigation.navigate('MenuDetail', { item })} />
    </View>
  );

  return (
    <ImageBackground 
      source={require('./assets/R10.jpg')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for dishes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={() => {}} color={'#ffffff'} />
        <Button 
          title={filtering ? "Unfilter" : "Filter"} 
          color={'#ffffff'} 
          onPress={() => setFiltering(!filtering)} 
        />

        {filtering ? (
          <>
            {selectedCourse !== null && (
              <Button 
                title="Close" 
                onPress={() => setSelectedCourse(null)} 
                color={'#ff0000'} 
              />
            )}
            {Object.keys(groupedMenuItems).map(course => (
              <View key={course}>
                {selectedCourse === null && (
                  <TouchableOpacity onPress={() => setSelectedCourse(course)}>
                    <Text style={styles.courseButton}>{course}</Text>
                  </TouchableOpacity>
                )}
                {selectedCourse === course && (
                  <FlatList
                    data={groupedMenuItems[course]}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false} // Optional: Hide scroll indicator
                  />
                )}
              </View>
            ))}
          </>
        ) : (
          <FlatList
            data={filteredMenuItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false} // Optional: Hide scroll indicator
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 10,
  },
  menuItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  dishName: {
    color: '#006607',
    fontWeight: 'bold',
    fontSize: 16,
  },
  courseButton: {
    backgroundColor: 'rgb(55, 255, 0)',
    padding: 10,
    borderRadius: 10,
    width: 300,
    borderWidth: 5, 
    marginVertical: 5,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  contentContainer: {
    paddingBottom: 100, // Increased padding to ensure last item is fully visible
  },
});

export default FilterScreen;