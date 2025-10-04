import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './routes';

//Views
import Profile from '../screens/Profile';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#007AFF',
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={Routes.HOME}
                component={Home}
                options={{ title: 'Inicio' }}
            />
            <Tab.Screen
                name={Routes.PROFILE}
                component={Profile}
                options={{ title: 'Perfil' }}
            />

        </Tab.Navigator>
    );
}