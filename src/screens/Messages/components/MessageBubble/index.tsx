import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../../theme/theme';
import styles from './styles';

interface MessageBubbleProps {
    content: string;
    isOwn: boolean;
    timestamp: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    content,
    isOwn,
    timestamp,
}) => {
    return (
        <View style={[
            styles.container,
            isOwn ? styles.ownContainer : styles.otherContainer
        ]}>
            <View style={[
                styles.bubble,
                isOwn ? styles.ownBubble : styles.otherBubble
            ]}>
                <Text style={[
                    styles.messageText,
                    isOwn ? styles.ownText : styles.otherText
                ]}>
                    {content}
                </Text>
            </View>
            <Text style={[
                styles.timestamp,
                isOwn ? styles.ownTimestamp : styles.otherTimestamp
            ]}>
                {timestamp}
            </Text>
        </View>
    );
};