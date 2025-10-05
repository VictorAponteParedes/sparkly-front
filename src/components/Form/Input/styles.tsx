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
    input: {
        backgroundColor: colors.gray[50],
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.gray[800],
        minHeight: 48,
    },
    inputError: {
        borderColor: colors.red[500],
        backgroundColor: colors.red[50],
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    errorText: {
        fontSize: 12,
        color: colors.red[500],
        marginTop: 4,
        marginLeft: 4,
    },
});