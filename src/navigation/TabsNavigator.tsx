import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './routes';

// Views
import Home from '../screens/Home';
import { MessagesList } from '../screens/Messages/MessagesList';
import { Icon } from '../components/common/Icon';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();

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
                name={Routes.MessagesList}
                component={MessagesList}
                options={{
                    title: 'Mensajes',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name="message" size={size} color={color} />
                    ),
                }}
            />
            {/* Quita Settings de aquí - estará en el Drawer */}
        </Tab.Navigator>
    );
}