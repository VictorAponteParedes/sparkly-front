import { StyleSheet } from 'react-native';
import { colors } from '../../../../theme/theme';

export default StyleSheet.create({
    container: {
        marginVertical: 4,
        alignSelf: 'flex-start',
        maxWidth: '80%',
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: colors.gray[100],
        borderBottomLeftRadius: 4,
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.gray[400],
        marginHorizontal: 2,
    },
});