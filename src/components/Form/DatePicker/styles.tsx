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
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.gray[50],
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48,
    },
    dateButtonError: {
        borderColor: colors.red[500],
        backgroundColor: colors.red[50],
    },
    dateText: {
        fontSize: 16,
        color: colors.gray[800],
    },
    placeholderText: {
        color: colors.gray[400],
    },
    errorText: {
        fontSize: 12,
        color: colors.red[500],
        marginTop: 4,
        marginLeft: 4,
    },
});