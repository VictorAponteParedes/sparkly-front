import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '../../theme/theme';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    statusBarGradient: {
        paddingTop: Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight || 0),
        ...Platform.select({
            ios: {
                shadowColor: colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 56,
    },
    title: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        flex: 1,
        marginHorizontal: 8,
    },
    iconButton: {
        padding: 8,
        minWidth: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
    },
});