import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, IconName } from '../common/Icon'; // Asegúrate de exportar IconName
import { colors } from '../../theme/theme';
import styles from './styles';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    leftIcon?: boolean;
    leftIconName?: IconName; // Nuevo: nombre personalizado para left icon
    onLeftIconPress?: () => void;
    rightIcon?: boolean;
    rightIconName?: IconName;
    onRightIconPress?: () => void;
    showBackButton?: boolean;
    headerStyle?: any;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    const {
        children,
        title,
        leftIcon,
        leftIconName = "arrowLeft", // Valor por defecto
        onLeftIconPress,
        rightIcon,
        rightIconName = "settings", // Valor por defecto
        onRightIconPress,
        headerStyle,
    } = props;

    const navigation = useNavigation();

    const handleLeftPress = () => {
        if (onLeftIconPress) {
            onLeftIconPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <LinearGradient
                colors={[colors.pink[400], colors.amethyst[500]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.statusBarGradient}
            >
                <View style={[styles.header, headerStyle]}>
                    {/* Left Icon */}
                    {leftIcon && (
                        <TouchableOpacity
                            onPress={handleLeftPress}
                            style={styles.iconButton}
                        >
                            <Icon name={leftIconName} size={22} color={colors.white} />
                        </TouchableOpacity>
                    )}

                    {/* Title */}
                    <Text style={styles.title} numberOfLines={1}>
                        {title || ''}
                    </Text>

                    {/* Right Icon */}
                    {rightIcon && (
                        <TouchableOpacity
                            onPress={onRightIconPress}
                            style={styles.iconButton}
                        >
                            <Icon name={rightIconName} size={22} color={colors.white} />
                        </TouchableOpacity>
                    )}

                    {/* Placeholder cuando no hay right icon para mantener centrado el título */}
                    {!rightIcon && leftIcon && <View style={styles.iconButton} />}
                </View>
            </LinearGradient>

            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
};