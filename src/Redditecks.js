import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home.js'
import props from './Settings.js'
import Profile from './Profile.js'

const homeName = 'Home'
const profileName = 'Profile'
const settingsName = 'Settings'

const Tab = createBottomTabNavigator();

class Redditech extends React.Component {
    render() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName = {homeName} screenOptions={({route}) => ({tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline'
                } else if (rn === profileName) {
                    iconName = focused ? 'logo-reddit' : 'logo-reddit'
                } else if (rn === settingsName) {
                    iconName = focused ? 'settings' : 'settings-outline'
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            }})}>
                <Tab.Screen name={homeName} component={Home}/>
                <Tab.Screen name={profileName} component={Profile}/>
                <Tab.Screen name={settingsName} component={props}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
    }
}

export default (Redditech)