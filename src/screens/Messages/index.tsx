import React, { useState } from 'react';
import {
    View,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Layout } from '../../components/Layout';
import { MessageBubble } from './components/MessageBubble';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInput } from './components/ChatInput';
import { colors } from '../../theme/theme';
import styles from './styles';

interface Message {
    id: number;
    content: string;
    isOwn: boolean;
    timestamp: string;
}
const Messages: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            content: "Hola! Qué bueno conectar contigo 😊",
            isOwn: false,
            timestamp: "10:32",
        },
        {
            id: 2,
            content: "Hola! Igualmente, me encantó tu perfil",
            isOwn: true,
            timestamp: "10:33",
        },
        {
            id: 3,
            content: "Muchas gracias! Vi que también te gusta viajar",
            isOwn: false,
            timestamp: "10:34",
        },
        {
            id: 4,
            content: "Sí! Es una de mis pasiones. Cuál ha sido tu lugar favorito?",
            isOwn: true,
            timestamp: "10:35",
        },
        {
            id: 5,
            content: "Difícil elegir solo uno... pero creo que Lisboa me robó el corazón ❤️",
            isOwn: false,
            timestamp: "10:36",
        },
        {
            id: 6,
            content: "Lisboa es increíble! Los atardeceres desde el mirador de Santa Lucía son inolvidables",
            isOwn: true,
            timestamp: "10:37",
        },
    ]);

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
            title="Sofía"
            leftIcon
            rightIcon
            onRightIconPress={() => console.log('Notificaciones')}
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

export default Messages;