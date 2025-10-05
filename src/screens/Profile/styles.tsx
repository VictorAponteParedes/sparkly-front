import { StyleSheet } from 'react-native';
import { colors } from '../../theme/theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollContent: {
        padding: 16,
    },
    section: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.gray[100],
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.gray[800],
        marginBottom: 20,
    },
    // Sección de foto
    photoSection: {
        alignItems: 'center',
    },
    photoContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: colors.pink[200],
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.pink[500],
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.white,
    },
    photoText: {
        fontSize: 14,
        color: colors.gray[500],
        textAlign: 'center',
    },
    // Layout
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    halfInput: {
        flex: 1,
    },
    // Botones de acción
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
        marginBottom: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cancelButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray[300],
    },
    saveButton: {
        backgroundColor: colors.pink[500],
        shadowColor: colors.pink[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray[700],
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
    },
    spacer: {
        height: 20,
    },
});