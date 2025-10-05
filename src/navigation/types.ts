import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    // Main Tabs
    MAIN_TABS: undefined;

    // App Routes
    Home: undefined;
    Details: undefined;
    Profile: undefined;
    Settings: undefined;
    Call: undefined;
    MESSAGES_DETAIL: {
        chatId: number;
        chatName: string;
    };
    MessagesList: undefined;
    Match: undefined;

    // Auth Routes
    Login: undefined;
    Register: undefined;

    // Drawer
    DRAWER_VIEWS: undefined;
};

// Tipos para useNavigation
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Tipos específicos para rutas con parámetros
export type MessagesDetailRouteProp = RouteProp<RootStackParamList, 'MESSAGES_DETAIL'>;