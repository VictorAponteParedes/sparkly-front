import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Navigators
import AppNavigator from './AppNavigation';
import AuthNavigator from './AuthNavigation';


export default function RouteNavigation() {

    const isLoggedIn = true;

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}
