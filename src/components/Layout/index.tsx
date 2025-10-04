import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    SafeAreaView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '../common/Icon';
import { colors } from '../../theme/theme';
import styles from './styles';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    leftIcon?: boolean;
    onLeftIconPress?: () => void;
    rightIcon?: boolean;
    onRightIconPress?: () => void;
    showBackButton?: boolean;
    headerStyle?: any;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    const {
        children,
        title,
        leftIcon,
        onLeftIconPress,
        rightIcon,
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
            {/* StatusBar transparente para que se vea el gradient */}
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            {/* Gradient que cubre StatusBar y Header */}
            <LinearGradient
                colors={[colors.pink[400], colors.amethyst[500]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.statusBarGradient}
            >
                {/* Header dentro del mismo gradient */}
                <View style={[styles.header, headerStyle]}>
                    {leftIcon && (
                        <TouchableOpacity
                            onPress={handleLeftPress}
                            style={styles.iconButton}
                        >
                            <Icon name='arrowLeft' size={22} color={colors.white} />
                        </TouchableOpacity>
                    )}

                    <Text style={styles.title} numberOfLines={1}>
                        {title || ''}
                    </Text>

                    {rightIcon && (
                        <TouchableOpacity
                            onPress={onRightIconPress}
                            style={styles.iconButton}
                        >
                            <Icon name='notifications' size={22} color={colors.white} />
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>

            {/* Contenido */}
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
};