import { StyleSheet, Platform } from 'react-native';
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
    pickerContainer: {
        backgroundColor: colors.gray[50],
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 16,
        overflow: 'hidden',
    },
    pickerError: {
        borderColor: colors.red[500],
        backgroundColor: colors.red[50],
    },
    picker: {
        color: colors.gray[800],
        height: Platform.OS === 'ios' ? 200 : 50,
    },
    errorText: {
        fontSize: 12,
        color: colors.red[500],
        marginTop: 4,
        marginLeft: 4,
    },
});