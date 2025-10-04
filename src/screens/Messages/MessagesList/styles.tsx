import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[200],
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray[100],
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: colors.gray[800],
    },
    listContent: {
        padding: 8,
    },
});