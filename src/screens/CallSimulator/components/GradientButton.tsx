import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../theme/theme';
import { Icon } from '../../../components/common/Icon';

interface GradientButtonProps extends TouchableOpacityProps {
    iconName: string;
    iconSize: number;
    iconColor?: string;
    text: string;
    gradientColors: string[];
}

export const GradientButton: React.FC<GradientButtonProps> = ({
    iconName,
    iconSize,
    iconColor = colors.white,
    text,
    gradientColors,
    style,
    ...props
}) => {
    return (
        <TouchableOpacity style={style} {...props}>
            <LinearGradient
                colors={gradientColors}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                }}
            >
                <Icon name={iconName} size={iconSize} color={iconColor} />
            </LinearGradient>
            <Text style={{ color: colors.white, fontSize: 12, fontWeight: '500' }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};