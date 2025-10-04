import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme/theme';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 20,
        backgroundColor: colors.gray[50],
    },
    unreadContainer: {
        backgroundColor: colors.pink[50],
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.pink[100],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.gray[200],
    },
    avatarFallback: {
        backgroundColor: colors.pink[500],
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    avatarText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: colors.white,
    },
    chatInfo: {
        flex: 1,
        marginRight: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray[800],
        flex: 1,
        marginRight: 8,
    },
    unreadName: {
        color: colors.gray[900],
    },
    timestamp: {
        fontSize: 12,
        color: colors.gray[500],
    },
    unreadTimestamp: {
        color: colors.pink[500],
        fontWeight: '500',
    },
    lastMessage: {
        fontSize: 14,
        color: colors.gray[600],
        lineHeight: 18,
    },
    unreadLastMessage: {
        color: colors.gray[700],
        fontWeight: '500',
    },
    unreadIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.pink[500],
    },
});