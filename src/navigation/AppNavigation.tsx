import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';

// Importa el TabsNavigator
import TabsNavigator from './TabsNavigator';


import Call from '../screens/Call';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
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
        </Stack.Navigator>
    );
}