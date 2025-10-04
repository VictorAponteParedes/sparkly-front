import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { colors } from '../../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
        paddingBottom: 10,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[200],
    },
    menuButton: {
        padding: 8,
    },
    content: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    drawer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: colors.pink[600],
        zIndex: 2,
        shadowColor: colors.black,
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    drawerContent: {
        flex: 1,
    },
    drawerHeader: {
        paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 4,
    },
    drawerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    drawerTitle: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    drawerBody: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    drawerItemText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 15,
    },
    drawerFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
    },
    versionText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default styles;
export { DRAWER_WIDTH, SCREEN_WIDTH };