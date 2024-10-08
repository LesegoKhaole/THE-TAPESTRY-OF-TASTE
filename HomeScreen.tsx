// src/components/HomeScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Button, FlatList, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { MenuContext } from './App';
import { MenuItem } from './types';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
  const { menuItems, setMenuItems } = context;
  const totalRevenue = menuItems.reduce((sum: number, item: MenuItem) => sum + item.price, 0);

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filtering, setFiltering] = useState(false); // State to track filtering mode

  const removeMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const calculateAveragePrice = () => {
    if (menuItems.length === 0) return 0;
    const total = menuItems.reduce((sum, item) => sum + item.price, 0);
    return (total / menuItems.length).toFixed(2);
  };

  const groupedMenuItems = menuItems.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
    if (!acc[item.course]) {
      acc[item.course] = [];
    }
    acc[item.course].push(item);
    return acc;
  }, {});

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.course}>Course: {item.course}</Text>
      <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
      <Button title="Remove" color={'#ffffff'} onPress={() => removeMenuItem(item.id)} />
      <Button title="Edit" color={'#ffffff'} onPress={() => navigation.navigate('EditMenu', { item })} />
      <Button title="Select" color={'#ffffff'} onPress={() => navigation.navigate('MenuDetail', { item })} />
    </View>
  );

  return (
    <ImageBackground 
      source={require('./assets/R.jpeg')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <View style={styles.container1}>
            <Button title="Add" color={'#ffffff'} onPress={() => navigation.navigate('AddMenu')} />
          </View>
          <View style={styles.container1}>
            <Button 
              title={filtering ? "Unfilter" : "Filter"} // Change button title based on filtering state
              color={'#ffffff'} 
              onPress={() => setFiltering(!filtering)} // Toggle filtering mode
            />
          </View>
          <View style={styles.container1}>
            <Button title="Search" color={'#fff'} onPress={() => navigation.navigate('Filter')} />
          </View>
        </View>

        {!filtering && ( // Only render the main FlatList when not filtering
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.contentContainer} // Ensure last item is fully visible
          />
        )}

        {filtering && ( // Only render the filtering UI when filtering is active
          <>
            {selectedCourse !== null && ( // Show the Close button only if a course is selected
              <Button 
                title="Close" 
                onPress={() => setSelectedCourse(null)} // Reset selected course
                color={'#ff0000'} // Optional: red color for close action
              />
            )}
            {Object.keys(groupedMenuItems).map(course => (
              <View key={course}>
                {selectedCourse === null && ( // Only display buttons if no course is selected
                  <TouchableOpacity onPress={() => setSelectedCourse(course)}>
                    <Text style={styles.courseButton}>{course}</Text>
                  </TouchableOpacity>
                )}
                {selectedCourse === course && ( // Show the dishes for the selected course
                  <FlatList
                    data={groupedMenuItems[course]}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.contentContainer} // Ensure last item is fully visible
                  />
                )}
              </View>
            ))}
          </>
        )}

        <View style={styles.container2}>
          <Text style={styles.Text}>Total Menu Items: {menuItems.length}</Text>
          <Text style={styles.Text}>Total Revenue: R{totalRevenue.toFixed(2)}</Text>
          <Text style={styles.Text}>Average Price: R{calculateAveragePrice()}</Text>
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
  buttonContainer: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-between', // Space between buttons
    width: '100%', // Full width to better space buttons
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
    top: 0, 
  },
  container2: {
    backgroundColor: 'rgb(227, 129, 0)', 
    padding: 10,
    width: "100%",
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4a2200',
    bottom: '1%',
    position: 'relative'
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
    fontSize: 20,
  },

  description: {
    color: '#ccff00',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop:5,
  },

  course: {
    color: '#e7fafa',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:5,
  },

  price: {
    color: '#55ff00',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop:5,
  },

  courseButton: {
    backgroundColor: 'rgb(55, 255, 0)',
    padding: 10,
    borderRadius: 10,
    width: 300,
    borderWidth: 5, 
    shadowOpacity: 1,
    shadowColor: '#032c30',
    borderColor: '#4a2200',
    marginVertical: 5,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  Text: {
    color: '#ffffff',
    fontSize: 20,
  },
  contentContainer: {
    paddingBottom: 100, // Add padding to ensure the last item is fully visible
  },
});

export default HomeScreen;