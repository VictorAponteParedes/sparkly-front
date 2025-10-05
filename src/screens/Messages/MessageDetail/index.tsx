import React, { useState } from 'react';
import {
    View,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Layout } from '../../../components/Layout';
import { MessageBubble } from '../components/MessageBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { ChatInput } from '../components/ChatInput';
import { colors } from '../../../theme/theme';
import styles from './styles';
import { chatDetail } from '../../../mocks/chatDetail';
import { useRoute } from '@react-navigation/native';

interface Message {
    id: number;
    content: string;
    isOwn: boolean;
    timestamp: string;
}
const MessagesDetail: React.FC = () => {
    const route = useRoute();

    const { chatId, chatName } = route?.params;

    const [messages, setMessages] = useState<Message[]>(chatDetail);

    const [isTyping, setIsTyping] = useState(true);

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            id: messages.length + 1,
            content,
            isOwn: true,
            timestamp: new Date().toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            }),
        };
        setMessages([...messages, newMessage]);
        setIsTyping(false);
    };

    return (
        <Layout
            title={chatName}
            leftIcon
            onRightIconPress={() => console.log('Notificaciones')}
            rightIconName='info'
            rightIcon
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Lista de mensajes */}
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <MessageBubble
                            content={item.content}
                            isOwn={item.isOwn}
                            timestamp={item.timestamp}
                        />
                    )}
                    contentContainerStyle={styles.messagesList}
                    inverted={false}
                    showsVerticalScrollIndicator={false}
                />

                {/* Indicador de typing */}
                {isTyping && <TypingIndicator />}

                {/* Input de chat */}
                <ChatInput onSendMessage={handleSendMessage} />
            </KeyboardAvoidingView>
        </Layout>
    );
};

export default MessagesDetail;