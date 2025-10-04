import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './routes';
import { Drawer } from '../components/Drawer/Drawer';

// Views
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Messages from '../screens/Messages';
import { Icon } from '../components/common/Icon';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();

// Crea un componente wrapper que pase la navigation al Drawer
export function TabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.pink[500],
                tabBarInactiveTintColor: colors.gray[400],
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopWidth: 1,
                    borderTopColor: colors.gray[200],
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 60,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={Routes.HOME}
                component={Home}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={Routes.Message}
                component={Messages}
                options={{
                    title: 'Mensajes',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name="message" size={35} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={Routes.SETTINGS}
                component={Settings}
                options={{
                    title: 'Configuracion',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}