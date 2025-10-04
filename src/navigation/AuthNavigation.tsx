import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import Login from '../screens/Auth/login';
import Register from '../screens/Auth/register';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={Routes.LOGIN}>
            <Stack.Screen
                name={Routes.LOGIN}
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Routes.REGISTER}
                component={Register}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}