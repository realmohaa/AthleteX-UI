import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import Home from './src/screens/Home';
import Tracker from './src/screens/Tracker';
import Calendar from './src/screens/Calendar';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { FontAwesome6, MaterialCommunityIcons, SimpleLineIcons  } from '@expo/vector-icons';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screens = {
  Protected: 'Protected',
  Home: 'Home Workout',
  Tracker: 'Progress Tracker',
  Calendar: 'Calendar',
  Login: 'Login',
  Register: 'Register', 
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
            <FontAwesome6 name="x-twitter" size={35} color={color} />
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={screens.Login}
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name={screens.Login} component={Login} />
        <Stack.Screen name={screens.Register} component={Register} />
        <Stack.Screen name={screens.Protected} component={ProtectedScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}