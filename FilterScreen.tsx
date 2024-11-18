// src/components/FilterScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Button, FlatList, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { MenuContext } from './App';
import { MenuItem } from './types';

const FilterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("MenuContext must be used within a MenuProvider");
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
// I am able to find the dish based on the price of the dish, the course type of the dish,the description of the dish, or the name of the dish.
  const filteredMenuItems = menuItems.filter(item => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesDishName = item.dishName.toLowerCase().includes(lowerCaseQuery);
    const matchesDescription = item.description.toLowerCase().includes(lowerCaseQuery);
    const matchesCourse = item.course.toLowerCase().includes(lowerCaseQuery);
    const matchesPrice = item.price.toString().includes(lowerCaseQuery); // Converting price to string for comparison

    return matchesDishName || matchesDescription || matchesCourse || matchesPrice;
  });

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <ImageBackground 
        source={require('./assets/R6.jpg')} 
        style={styles.background}
        resizeMode="cover">
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.course}>Course: {item.course}</Text>
        <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
        <Button title="Select" color={'#ff6f00'} onPress={() => navigation.navigate('MenuDetail', { item })} />
      </ImageBackground>
    </View>
  );

  return (
    <ImageBackground 
      source={require('./assets/R.jpeg')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search name, description, course, or price"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.container1}>
            <Button title="Search" onPress={() => {}} color={'#ffffff'} />
          </View>
          <View style={styles.container1}>
            <Button 
              title={filtering ? "Unfilter" : "Filter"} 
              color={'#ffffff'} 
              onPress={() => setFiltering(!filtering)} 
            />
          </View>
        </View>

        {filtering ? (
          <>
            {selectedCourse !== null && (
              <View style={styles.close}>
                <Button 
                  title="Close" 
                  onPress={() => setSelectedCourse(null)} 
                  color={'#ffff'} 
                />
              </View>
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
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </View>
            ))}
          </>
        ) : (
          <>
            {filteredMenuItems.length > 0 ? (
              <FlatList
                data={filteredMenuItems}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text style={styles.noResults}>No dishes found.</Text>
            )}
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 5, 
    shadowOpacity: 1,
    shadowColor: '#032c30',
    borderColor: '#4a2200',
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  container1: {
    backgroundColor: 'rgb(255, 145, 0)', 
    padding: 10,
    width: 100,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4a2200',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 10,
  },
  close: {
    backgroundColor: 'rgb(255, 145, 0)', 
    padding: 10,
    width: 100,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4a2200',
  },
  menuItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: '#4a2200',
    borderRadius: 10,
    shadowOpacity: 1,
    shadowColor: '#032c30',
    alignItems: 'center',
    backgroundColor: '#d6720f',
    marginBottom: 20,
  },
  dishName: {
    color: '#00fff7',
    fontWeight: 'bold',
    fontSize: 25,
    textShadowRadius:23,
    textShadowColor:'#2f0505',
  },
  description: {
    color: '#ccff00',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 25,
    textShadowRadius:23,
    textShadowColor:'#2f0505',
  },
  course: {
    color: '#e7fafa',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 25,
    textShadowRadius:23,
    textShadowColor:'#2f0505',
  },
  price: {
    color: '#55ff00',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 25,
    textShadowRadius:23,
    textShadowColor:'#2f0505',
  },
  courseButton: {
    backgroundColor: 'rgb(255, 123, 0)',
    padding: 10,
    borderRadius: 10,
    width: 300,
    borderWidth: 3,
    borderColor: '#4a2200',
    shadowOpacity: 1,
    shadowColor: '#032c30',
    marginVertical: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  noResults: {
    color: '#ff0000',
    fontSize: 38,
    textAlign: 'center',
    marginTop: 20,
    textShadowRadius:23,
    textShadowColor:'#2f0505',
  },
});

export default FilterScreen;