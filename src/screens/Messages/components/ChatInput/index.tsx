import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { Icon } from '../../../../components/common/Icon';
import { colors } from '../../../../theme/theme';
import styles from './styles';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.container} >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Escribe un mensaje..."
                    placeholderTextColor={colors.gray[400]}
                    multiline
                    maxLength={500}
                />
                <TouchableOpacity
                    style={
                        [
                            styles.sendButton,
                            !message.trim() ? styles.sendButtonDisabled : null
                        ]
                    }
                    onPress={handleSend}
                    disabled={!message.trim()
                    }
                >
                    <Icon
                        name="send"
                        size={20}
                        color={message.trim() ? colors.white : colors.gray[400]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};