// src/components/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text, Alert, Image } from 'react-native';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Chef' | 'Customer' | null>(null);

  const handleLogin = () => {
    const trimmedPassword = password.trim();

    // Check credentials based on the selected role
    if (selectedRole === 'Chef' && trimmedPassword === 'chef') {
      navigation.navigate('Home');
    } else if (selectedRole === 'Customer' && trimmedPassword === 'diner') {
      navigation.navigate('Filter');
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <ImageBackground 
      source={require('./assets/R.jpeg')} 
      style={styles.background}
      resizeMode="cover" 
    >
      
        

        <View style={styles.buttonContainer}>
        
        <ImageBackground 
      source={require('./assets/chef3.png')} 
      style={styles.buttonbackground1}
      resizeMode="stretch" 
    >
          <Button 
            title="Chef" 
            onPress={() => setSelectedRole('Chef')}
            color={selectedRole === 'Chef' ? 'rgb(55, 255, 0)' : 'rgba(255, 255, 255, 0.7)'} 
          />
          </ImageBackground>
          
            
            <ImageBackground 
          source={require('./assets/customer.jpg')} 
        style={styles.buttonbackground2}
        resizeMode="stretch" 
    >
          <Button 
            title="Diner" 
            onPress={() => setSelectedRole('Customer')}
            color={selectedRole === 'Customer' ? 'rgb(55, 255, 0)' : 'rgba(255, 255, 255, 0.7)'} 
          />
          </ImageBackground>


        </View>

        <View style={styles.container}>
        <TextInput
          placeholder="Password" 
          secureTextEntry 
          onChangeText={setPassword} 
          style={styles.input} 
        />
        <View style={styles.buttonContainer2}>
        <Button 
          title="Login" 
          onPress={handleLogin} 
          color={'rgb(55, 255, 0)'} 
        />
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
    backgroundColor: 'rgba(197, 137, 16, 0.86)', 
    top: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth:5, 
    shadowOpacity:1,
    shadowColor:'#032c30',
    borderColor:'#4a2200',
    alignItems: 'center',
    margin: 5,
  },
  buttonContainer: {
    top:-40,
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-between', // Space between buttons
    width: '100%', // Full width to better space buttons
     // Space below buttons

  },

  buttonContainer1: {
    top:-30,
    marginLeft:5, 
    padding: 30,
    width:'48%',
    height:'350%',
    borderRadius: 50,
    alignItems:'center',
    borderWidth:2,
    borderColor:'#25a71f',
      
},

buttonbackground1:{
  flex: 1,
  justifyContent: 'center',
  top:30,
  marginLeft:4, 
  marginRight:4,
  borderWidth:5, 
  shadowOpacity:1,
  shadowColor:'#032c30',
  borderColor:'#4a2200',
  width:'auto',
  height:'auto',
  paddingVertical: 150,
  paddingHorizontal: 40,
},

buttonbackground2:{
  flex: 1,
  justifyContent: 'center',
  top:30,
  marginLeft:4, 
  marginRight:4,
  borderWidth:5, 
  shadowOpacity:1,
  shadowColor:'#032c30',
  borderColor:'#4a2200',
  width:'auto',
  height:'auto',
  paddingVertical: 150,
  paddingHorizontal: 40,
},

buttonContainer2: {
  marginRight:5,
  top:-10,
  backgroundColor: 'rgb(109, 64, 6)', 
    padding: 10,
    width:'48%',
    borderRadius: 50,
    alignItems:'center',
    borderWidth:5, 
    shadowOpacity:1,
    shadowColor:'#032c30',
    borderColor:'#4a2200',
},

  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'rgb(0, 225, 255)',
    fontFamily: 'arial',
    borderWidth:5, 
    shadowOpacity:1,
    shadowColor:'#032c30',
    borderColor:'#4a2200',
  },
  input: {
    height: 40,
    borderWidth:5, 
    shadowOpacity:1,
    shadowColor:'#032c30',
    borderColor:'#4a2200',
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 5,
    color: 'rgb(0, 225, 255)',
    fontSize: 25,
    
  },
});

export default LoginScreen;