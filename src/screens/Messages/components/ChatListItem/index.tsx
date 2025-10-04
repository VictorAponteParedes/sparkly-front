import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { colors } from '../../../../theme/theme';
import styles from './styles';

interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
    online: boolean;
}

interface ChatListItemProps {
    chat: Chat;
    onPress: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onPress }) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                chat.unread && styles.unreadContainer
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <View style={[
                    styles.avatar,
                    !chat.avatar && styles.avatarFallback
                ]}>
                    {chat.avatar ? (
                        <Image
                            source={{ uri: chat.avatar }}
                            style={styles.avatarImage}
                        />
                    ) : (
                        <Text style={styles.avatarText}>
                            {getInitials(chat.name)}
                        </Text>
                    )}
                </View>

                {/* Online Status */}
                {chat.online && <View style={styles.onlineIndicator} />}
            </View>

            {/* Información del chat */}
            <View style={styles.chatInfo}>
                <View style={styles.headerRow}>
                    <Text
                        style={[
                            styles.name,
                            chat.unread && styles.unreadName
                        ]}
                        numberOfLines={1}
                    >
                        {chat.name}
                    </Text>
                    <Text
                        style={[
                            styles.timestamp,
                            chat.unread && styles.unreadTimestamp
                        ]}
                    >
                        {chat.timestamp}
                    </Text>
                </View>

                <Text
                    style={[
                        styles.lastMessage,
                        chat.unread && styles.unreadLastMessage
                    ]}
                    numberOfLines={2}
                >
                    {chat.lastMessage}
                </Text>
            </View>

            {/* Indicador de no leído */}
            {chat.unread && <View style={styles.unreadIndicator} />}
        </TouchableOpacity>
    );
};