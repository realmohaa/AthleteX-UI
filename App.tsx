import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import Home from './src/screens/Home';
import Tracker from './src/screens/Tracker';
import Calendar from './src/screens/Calendar';
import ExcerciseDetail from './src/screens/ExcerciseDetail';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, SimpleLineIcons  } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { AuthContext } from './src/utils/util';
import {  MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import ApiClient from './src/utils/api_client';
import { retrieve } from './src/utils/token_storage';

const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#55bfa9' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red',zIndex: 1000}}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  )
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screens = {
  Protected: 'Protected',
  Home: 'Home Workout',
  Tracker: 'Progress Tracker',
  Calendar: 'Calendar',
  Login: 'Login',
  Register: 'Register', 
  Detail: 'Detail', 
}

function ProtectedScreens() {
  return (
    <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: 'transparent',
            elevation: 0,
            marginBottom: 10,
          },
          headerShown: false,
          tabBarActiveTintColor: '#55bfa9',
        }}
        tabBar={props => {
          return (
            <View>
              <BottomTabBar {...props} />
            </View>
          );
        }}
        initialRouteName={screens.Home}
      >
      <Tab.Screen options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="basketball-hoop-outline" size={35} color={color} />
          ),
        }} 
        name={screens.Home} 
        component={Home} 
      />
      <Tab.Screen 
        options={{
          tabBarIcon: ({color}) => (
            <Image source={require('./src/assets/images/logo.png')} style={{width: 45, height: 50, tintColor: color}} />
          ),
        }}
        name={screens.Tracker} 
        component={Tracker} 
      />
      <Tab.Screen
       
       options={{
          tabBarIcon: ({color}) => (
            <SimpleLineIcons cons name="calendar" size={35} color={color} />
          ),
        
       }}
        name={screens.Calendar} 
        component={Calendar} 
      />
    </Tab.Navigator>
  );
}

const ProtectedStack = () => {
  return (
    <Stack.Navigator initialRouteName={screens.Protected} screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.Protected} component={ProtectedScreens} />
      <Stack.Screen name={screens.Detail} component={ExcerciseDetail} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={screens.Login} screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.Login} component={Login} />
      <Stack.Screen name={screens.Register} component={Register} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      myOwnColor: '#FFFFFF',
    },
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const apiClient = ApiClient.getInstance();

        const token = await retrieve("accessToken");
        console.log(token);
        const response = await apiClient.get('/api/v1/auth/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {isSignedIn ? <ProtectedStack /> : <AuthStack />}
          <Toast config={toastConfig} />
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
}