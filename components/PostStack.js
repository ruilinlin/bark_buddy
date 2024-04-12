import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PostNavigator from './PostNavigator';
import PostScreen from '../screens/PostScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../helper/Color';

const Stack = createStackNavigator();

export default function PostStack() {
   const [showPostScreen, setShowPostScreen] = useState(false);

  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen
          name="Posts"
          component={PostScreen}
          options={{
            headerTitle: "Posts",
            headerShown: false,
          }}
          
          />
        <Stack.Screen
          name="PostNavigator"
          component={PostNavigator}
          options={{
            headerTitle: "Post",
            headerShown: false,

          }}
          />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
