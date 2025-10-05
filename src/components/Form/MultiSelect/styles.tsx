import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/theme';

export default StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.gray[800],
        marginBottom: 8,
    },
    required: {
        color: colors.red[500],
    },
    selectedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        minHeight: 48,
        backgroundColor: colors.gray[50],
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 16,
        padding: 12,
    },
    selectedTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.pink[500],
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    selectedTagText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '500',
    },
    removeButton: {
        padding: 2,
    },
    toggleButton: {
        padding: 4,
    },
    dropdown: {
        marginTop: 8,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 12,
        maxHeight: 200,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    dropdownScroll: {
        padding: 8,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 4,
    },
    optionSelected: {
        backgroundColor: colors.pink[50],
    },
    optionText: {
        fontSize: 14,
        color: colors.gray[700],
    },
    optionTextSelected: {
        color: colors.pink[600],
        fontWeight: '500',
    },
    counterText: {
        fontSize: 12,
        color: colors.gray[500],
        marginTop: 4,
        textAlign: 'right',
    },
    errorText: {
        fontSize: 12,
        color: colors.red[500],
        marginTop: 4,
        marginLeft: 4,
    },
});