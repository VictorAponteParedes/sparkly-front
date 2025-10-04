import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';

import { TabsNavigator } from './TabsNavigator';
import Call from '../screens/Call';
import Match from '../screens/Match';
import Profile from '../screens/Profile';
import { Drawer } from '../components/Drawer/Drawer';

const Stack = createNativeStackNavigator();

// Solo el TabsNavigator debe tener el Drawer
const TabsWithDrawer = () => (
    <Drawer>
        <TabsNavigator />
    </Drawer>
);

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* Pantalla principal con Tabs + Drawer */}
            <Stack.Screen
                name={Routes.MAIN_TABS}
                component={TabsWithDrawer}
            />

            {/* Pantallas modales/sin tabs */}
            <Stack.Screen
                name={Routes.Call}
                component={Call}
            />
            <Stack.Screen
                name={Routes.Match}
                component={Match}
            />
            <Stack.Screen
                name={Routes.PROFILE}
                component={Profile}
            />
        </Stack.Navigator>
    );
}