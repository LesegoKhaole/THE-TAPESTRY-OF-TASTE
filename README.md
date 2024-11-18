
# The Tapestry of Taste Mobile App

The Tapestry of Taste app is designed to enhance the dining experience by providing users with an intuitive interface to explore, filter, and manage menu items from a variety of courses. This React Native application allows users to view detailed information about dishes, manage their selections, and gain insights into total revenue and average pricing.

## Table of Contents
- [Features](#features)
- [Capabilities and Advantages](#capabilities-and-advantages)
- [Disabilities and Disadvantages](#disabilities-and-disadvantages)
- [Key Changes](#key-changes)
- [Elaboration on the Adjustments to the Code](#elaboration-on-the-adjustments-to-the-code)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **Dynamic Menu Management:** Users can easily add, edit, or remove menu items, ensuring the menu is always up-to-date.
- **Search and Filter Options:** The app allows users to search for specific dishes and filter menu items by course, making it easy to find exactly what they want.
- **Revenue Tracking:** Provides insights into total revenue and average pricing, helping business owners make informed decisions.

## Capabilities and Advantages
- **User-Friendly Interface:** The app is designed with a clean and intuitive interface, making it easy for users of all ages to navigate through the menu.
- **Cross-Platform Compatibility:** Built with React Native, the app runs seamlessly on both iOS and Android devices, reaching a wider audience.
- **Real-Time Updates:** Changes made to the menu are reflected in real-time, ensuring that users always see the latest information.
- **Visual Appeal:** The use of background images and styled components enhances user engagement and promotes the brand's aesthetic.

## Disabilities and Disadvantages
- **Limited Offline Functionality:** The app requires an internet connection for full functionality, which might limit usability in areas with poor connectivity.
- **Initial Setup Complexity:** New users might find the initial setup process, including adding menu items and configuring settings, a bit overwhelming.
- **Performance on Older Devices:** The app may experience performance issues on older mobile devices due to the graphical elements and real-time data processing.

## Key Changes
1. **Added a new function** `calculateAveragePricePerCourse()` that groups the menu items by course and calculates the average price for each course.
2. **Updated the function** `calculateAveragePrice()` to calculate the overall average price.
3. **In the return statement,** added a section to display the overall average price and the average price for each course.
4. **Now, the home screen will display** the total number of menu items, the total revenue, the overall average price, and the average price for each course.

## Elaboration on the Adjustments to the Code

1. **Context Usage**
   ```javascript
   const context = useContext(MenuContext);
   if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
   const { menuItems, setMenuItems } = context;
   ```
   - **Change:** This block verifies that the `MenuContext` is being used correctly within a `MenuProvider`.
   - **Impact:** Ensures access to the menu context, improving error handling and debugging.

2. **Total Revenue Calculation**
   ```javascript
   const totalRevenue = menuItems.reduce((sum: number, item: MenuItem) => sum + item.price, 0);
   ```
   - **Change:** The calculation of total revenue is streamlined using `reduce`.
   - **Impact:** Direct calculation enhances performance and readability.

3. **Average Price Calculation**
   ```javascript
   const calculateAveragePrice = () => {
       if (menuItems.length === 0) return 0;
       const total = menuItems.reduce((sum, item) => sum + item.price, 0);
       return (total / menuItems.length).toFixed(2);
   };
   ```
   - **Change:** Removed duplicate check for `menuItems.length`.
   - **Impact:** Efficient average price calculation.

4. **Grouping Menu Items by Course**
   ```javascript
   const groupedMenuItems = menuItems.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
       if (!acc[item.course]) {
           acc[item.course] = [];
       }
       acc[item.course].push(item);
       return acc;
   }, {});
   ```
   - **Change:** Logic for grouping menu items is clearly structured.
   - **Impact:** Easier management and display of items by course.

5. **Average Price Calculation Per Course**
   ```javascript
   const calculateAveragePricePerCourse = () => {
       const averages: Record<string, number> = {};
       Object.keys(groupedMenuItems).forEach((course) => {
           const courseItems = groupedMenuItems[course];
           const total = courseItems.reduce((sum, item) => sum + item.price, 0);
           averages[course] = courseItems.length > 0 ? (total / courseItems.length) : 0;
       });
       return averages;
   };
   ```
   - **Change:** Introduced a new function for average prices per course.
   - **Impact:** Provides granular pricing information.

6. **Rendering Menu Items**
   ```javascript
   const renderMenuItem = ({ item }: { item: MenuItem }) => (
       <View style={styles.menuItem}>
           <Text style={styles.dishName}>{item.dishName}</Text>
           <Text style={styles.description}>{item.description}</Text>
           <Text style={styles.course}>Course: {item.course}</Text>
           <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
           <Button title="Remove" color={'#ffffff'} onPress={() => removeMenuItem(item.id)} />
           <Button title="Edit" color={'#ffffff'} onPress={() => navigation.navigate('EditMenu', { item })} />
           <Button title="Select" color={'#ffffff'} onPress={() => navigation.navigate('MenuDetail', { item })} />
           <ImageBackground 
               source={require('./assets/R7.jpg')} 
               style={styles.background}
               resizeMode="cover">
               {/* ... */}
           </ImageBackground>
       </View>
   );
   ```
   - **Change:** Updated to include an `ImageBackground`.
   - **Impact:** Enhances visual appeal.

7. **Filtering Functionality**
   ```javascript
   <Button 
       title={filtering ? "Unfilter" : "Filter"}
       color={'#ffffff'} 
       onPress={() => setFiltering(!filtering)} 
   />
   ```
   - **Change:** Added a button to toggle filtering.
   - **Impact:** Improves user interaction.

8. **Displaying Course Buttons**
   ```javascript
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
               />
           )}
       </View>
   ))}
   ```
   - **Change:** Conditional rendering based on `selectedCourse`.
   - **Impact:** Makes navigation more intuitive.

9. **Displaying Summary Information**
   ```javascript
   <View style={styles.container2}>
       <Text style={styles.Text}>Total Menu Items: {menuItems.length}</Text>
       <Text style={styles.Text}>Total Revenue: R{totalRevenue.toFixed(2)}</Text>
       <Text style={styles.Text}>Average Price: R{calculateAveragePrice()}</Text>
       <Text style={styles.Text}>Overall Average Price: R{overallAveragePrice.toFixed(2)}</Text>
       {Object.keys(averagePricePerCourse).map((course) => (
           <Text key={course} style={styles.Text}>Average {course} Price: R{averagePricePerCourse[course].toFixed(2)}</Text>
       ))}
   </View>
   ```
   - **Change:** Added a summary section.
   - **Impact:** Provides valuable insights at a glance.

10. **Styling Adjustments**
    ```javascript
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
    ```
    - **Change:** Adjustments for various components.
    - **Impact:** Improved aesthetics and user interface consistency.

## Installation
To set up the project locally, follow these instructions:

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/repo-name.git
   ```

2. **Change to the project directory**
   ```bash
   cd repo-name
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## Usage
Once the app is installed, you can run it on your mobile device or emulator. The main screen will display the menu, where you can add, edit, or remove items. Use the search bar to find specific dishes, and explore filtering options to narrow down your selections.

## Contributing
Contributions are welcome! If you would like to contribute to the Tapestry of Taste app, please follow these steps:
1. **Fork the repository.**
2. **Create your feature branch** (`git checkout -b feature/YourFeature`).
3. **Commit your changes** (`git commit -m 'Add some feature'`).
4. **Push to the branch** (`git push origin feature/YourFeature`).
5. **Open a pull request.**

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any inquiries, please contact:
- **Name:** Lesego Khaole
- **Email:** lesegokhaole@icloud.com or st10455441@imconnect.edu.za

**YouTube Video:** [Watch Here](https://youtu.be/DjHkxlJLvjI?si=zykDOMeunRVmbLHi)

© 2024 The Tapestry of Taste. All rights reserved.
