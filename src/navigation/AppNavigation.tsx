import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';

import { TabsNavigator } from './TabsNavigator';


import Call from '../screens/Call';
import Settings from '../screens/Settings';
import Home from '../screens/Home';
import Match from '../screens/Match';
import Profile from '../screens/Profile';




import { Drawer } from '../components/Drawer/Drawer';

const Stack = createNativeStackNavigator();


function AppNavigatorWithDrawer() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={Routes.MAIN_TABS}
                component={TabsNavigator}
            />

            <Stack.Screen
                name={Routes.Call}
                component={Call}
            />
            <Stack.Screen
                name={Routes.SETTINGS}
                component={Settings}
            />
            <Stack.Screen
                name={Routes.Match}
                component={Match}
            />
            <Stack.Screen
                name={Routes.HOME}
                component={Home}
            />
            <Stack.Screen
                name={Routes.PROFILE}
                component={Profile}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Drawer>
            <AppNavigatorWithDrawer />
        </Drawer>
    );
}