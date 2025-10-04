import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { colors } from '../../../theme/theme';


import HomeIcon from '../../../assets/icons/home.svg';
import VideCall from '../../../assets/icons/videoCall.svg';
import Profile from '../../../assets/icons/profile.svg';
import Message from '../../../assets/icons/message.svg';
import Settings from '../../../assets/icons/settings.svg';
import Close from '../../../assets/icons/close.svg';
import Menu from '../../../assets/icons/menu.svg';
import Info from '../../../assets/icons/info.svg';
import Match from '../../../assets/icons/match.svg';
import Notifications from '../../../assets/icons/notifications.svg';
import CarouselHorizontal from '../../../assets/icons/carousel-horizontal.svg';
import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import Send from '../../../assets/icons/send.svg';
import Search from '../../../assets/icons/search.svg';
import Location from '../../../assets/icons/location.svg';
import Heart from '../../../assets/icons/heart.svg';

const iconComponents = {
    home: HomeIcon,
    videoCall: VideCall,
    profile: Profile,
    message: Message,
    settings: Settings,
    close: Close,
    menu: Menu,
    info: Info,
    match: Match,
    notifications: Notifications,
    carouselHorizontal: CarouselHorizontal,
    arrowLeft: ArrowLeft,
    send: Send,
    search: Search,
    location: Location,
    heart: Heart
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