import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme/theme';

export default StyleSheet.create({
    container: {
        marginVertical: 4,
        maxWidth: '80%',
    },
    ownContainer: {
        alignSelf: 'flex-end',
    },
    otherContainer: {
        alignSelf: 'flex-start',
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        marginBottom: 4,
    },
    ownBubble: {
        backgroundColor: colors.pink[400],
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: colors.gray[100],
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    ownText: {
        color: colors.white,
    },
    otherText: {
        color: colors.gray[800],
    },
    timestamp: {
        fontSize: 12,
        marginTop: 2,
    },
    ownTimestamp: {
        color: colors.gray[500],
        textAlign: 'right',
    },
    otherTimestamp: {
        color: colors.gray[400],
        textAlign: 'left',
    },
});