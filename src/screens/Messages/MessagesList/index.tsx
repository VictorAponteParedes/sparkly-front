import React, { useState } from 'react';
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import { Layout } from '../../../components/Layout';
import { ChatListItem } from '../components/ChatListItem';
import { Icon } from '../../../components/common/Icon';
import { colors } from '../../../theme/theme';
import styles from './styles';
import { chats } from '../../../mocks/chatsList';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigation/routes';

export interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
    online: boolean;
}

export const MessagesList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();


    const filteredChats = chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChatPress = (chat: Chat) => {
        navigation.navigate(Routes.MESSAGES_DETAIL, {
            chatId: chat.id,
            chatName: chat.name
        });

    };
    return (
        <Layout
            title="Mensajes"
            rightIcon
            leftIcon
            onRightIconPress={() => console.log('Filtros')}
        >
            <View style={styles.container}>
                {/* Barra de búsqueda */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Icon name="search" size={20} color={colors.gray[400]} />
                        <TextInput
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Buscar conversaciones..."
                            placeholderTextColor={colors.gray[400]}
                        />
                    </View>
                </View>

                {/* Lista de chats */}
                <FlatList
                    data={filteredChats}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ChatListItem
                            chat={item}
                            onPress={() => handleChatPress(item)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Layout>
    );
};