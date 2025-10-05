import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../../theme/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.95)',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        zIndex: 10,
    },
    closeButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    modalTitle: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
    placeholder: {
        width: 40,
    },
    swiperContainer: {
        flex: 1,
        marginHorizontal: -20, // Compensa el padding para swiper completo
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    fullImage: {
        width: SCREEN_WIDTH - 40, // Resta el padding
        height: '80%',
        maxHeight: SCREEN_HEIGHT * 0.7,
    },
    thumbnailsContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    thumbnailsScroll: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
        opacity: 0.6,
    },
    thumbnailActive: {
        borderColor: colors.pink[500],
        opacity: 1,
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
});