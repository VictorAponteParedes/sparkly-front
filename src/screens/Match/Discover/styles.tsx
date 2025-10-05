import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../theme/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    swiper: {
        height: SCREEN_HEIGHT * 0.82, // Más espacio para los cards
    },
    swiperCard: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    swiperSlide: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20, // Espacio al final del scroll
        gap: 16, // Espacio entre cards
    },
    // Card de foto principal
    photoCard: {
        height: SCREEN_HEIGHT * 0.5,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        position: 'relative',
    },
    mainPhoto: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: 'transparent',
        // backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
    },
    profileInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 6,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    location: {
        fontSize: 16,
        color: colors.white,
        marginLeft: 6,
        fontWeight: '500',
    },
    distance: {
        fontSize: 14,
        color: colors.gray[300],
        fontWeight: '400',
    },
    // Cards generales (Bio, Intereses, Galería)
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: colors.gray[100],
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.gray[800],
        marginBottom: 16,
    },
    cardText: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.gray[600],
        textAlign: 'left',
    },
    // Intereses
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    interestBadge: {
        backgroundColor: colors.pink[50],
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.pink[200],
    },
    interestText: {
        fontSize: 14,
        color: colors.pink[600],
        fontWeight: '600',
    },
    // Galería
    galleryContainer: {
        gap: 12,
        paddingRight: 20,
    },
    galleryPhoto: {
        width: 120,
        height: 120,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.gray[200],
    },

    // Botones de acción
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray[200],
    },
    actionButton: {
        // Contenedor del botón
    },

    actionButtonGradient: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    dislikeButton: {
        // Estilos específicos para el botón de dislike
        borderWidth: 0, // Ya no necesita borde porque tiene gradient
    },
    likeButton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        shadowColor: colors.pink[500],
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    messageButton: {
        // Estilos específicos para el botón de mensaje
        borderWidth: 0, // Ya no necesita borde porque tiene gradient
    },


    // Indicador de progreso
    progressIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        backgroundColor: colors.white,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.gray[300],
    },
    progressDotActive: {
        backgroundColor: colors.pink[500],
        width: 24,
    },

    counterText: {
        fontSize: 14,
        color: colors.gray[500],
        fontWeight: '600',
        marginLeft: 12,
    },

});