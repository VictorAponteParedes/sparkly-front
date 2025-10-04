import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { colors } from '../../../theme/theme';


import HomeIcon from '../../../assets/icons/home.svg';
import VideCall from '../../../assets/icons/videoCall.svg';
import Profile from '../../../assets/icons/profile.svg';
import Message from '../../../assets/icons/message.svg';
import Settings from '../../../assets/icons/settings.svg';


const iconComponents = {
    home: HomeIcon,
    videoCall: VideCall,
    profile: Profile,
    message: Message,
    settings: Settings
} as const;

export type IconName = keyof typeof iconComponents;

export interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
    style?: any;
}

export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color = colors.black,
    style,
}) => {
    const IconComponent = iconComponents[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return (
        <View style={[styles.container, style]}>
            <IconComponent
                width={size}
                height={size}
                stroke={color}
            />
        </View>
    );
};