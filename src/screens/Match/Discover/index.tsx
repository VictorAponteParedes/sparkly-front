import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { Layout } from '../../../components/Layout';
import { Icon } from '../../../components/common/Icon';
import { colors } from '../../../theme/theme';
import { slidesMatchMock, UserProfile } from '../../../mocks/slidesMatchMock';
import { ModalGallery } from '../components/ModalGallery';
import styles from './styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Match: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [galleryModalVisible, setGalleryModalVisible] = useState(false);
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
    const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

    const horizontalGalleryRef = useRef<ScrollView>(null);
    const swiperRef = useRef<Swiper>(null);

    const handleLike = () => {
        console.log('Like a:', slidesMatchMock[currentIndex].name);
        goToNextProfile();
    };

    const handleDislike = () => {
        console.log('Dislike a:', slidesMatchMock[currentIndex].name);

        // Aquí iría tu lógica para guardar el dislike
        // Por ejemplo: guardarDislikeEnBackend(slidesMatchMock[currentIndex].id);

        // Navegar al siguiente perfil
        goToNextProfile();
    };

    const handleMessage = () => {
        console.log('Mensaje a:', slidesMatchMock[currentIndex].name);
        // Lógica para mensaje (esto no cambia de perfil)
    };

    const goToNextProfile = () => {
        if (swiperRef.current) {
            // Si hay más perfiles, ir al siguiente
            if (currentIndex < slidesMatchMock.length - 1) {
                swiperRef.current.scrollBy(1);
            } else {
                // Si es el último perfil, volver al inicio o mostrar mensaje
                console.log('¡No hay más perfiles!');
                // Opcional: volver al primer perfil
                // swiperRef.current.scrollTo(0);
            }
        }
    };

    const openGallery = (profile: UserProfile, index: number = 0) => {
        setCurrentProfile(profile);
        setSelectedGalleryIndex(index);
        setGalleryModalVisible(true);
    };

    const closeGallery = () => {
        setGalleryModalVisible(false);
        setCurrentProfile(null);
        setSelectedGalleryIndex(0);
    };

    const handleGalleryPhotoPress = (profile: UserProfile, index: number) => {
        openGallery(profile, index);

        // Scroll horizontal para mostrar la foto seleccionada
        setTimeout(() => {
            if (horizontalGalleryRef.current) {
                horizontalGalleryRef.current.scrollTo({
                    x: index * 132, // 120 (ancho foto) + 12 (gap)
                    animated: true
                });
            }
        }, 100);
    };

    const renderProfile = (profile: UserProfile) => (
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Card 1: Foto principal */}
            <View style={styles.photoCard}>
                <Image
                    source={{ uri: profile.principalPhoto }}
                    style={styles.mainPhoto}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                    locations={[0, 0.5, 1]}
                    style={styles.gradientOverlay}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>
                        {profile.name}, {profile.age}
                    </Text>
                    <View style={styles.locationContainer}>
                        <Icon name="location" size={16} color={colors.white} />
                        <Text style={styles.location}>{profile.location}</Text>
                    </View>
                    {profile.distance && (
                        <Text style={styles.distance}>{profile.distance} de distancia</Text>
                    )}
                </View>
            </View>

            {/* Card 2: Biografía */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Sobre mí</Text>
                <Text style={styles.cardText}>{profile.bio}</Text>
            </View>

            {/* Card 3: Intereses */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Intereses</Text>
                <View style={styles.interestsContainer}>
                    {profile.interests.map((interest, index) => (
                        <View key={index} style={styles.interestBadge}>
                            <Text style={styles.interestText}>{interest}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Card 4: Galería de fotos */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Galería de fotos</Text>
                <ScrollView
                    ref={horizontalGalleryRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.galleryContainer}
                >
                    {profile.photosGalery.map((photo, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleGalleryPhotoPress(profile, index)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={{ uri: photo }}
                                style={styles.galleryPhoto}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );

    return (
        <Layout title="Descubrir" leftIcon rightIcon rightIconName='info'>
            <View style={styles.container}>
                {/* Swiper de perfiles con ref */}
                <Swiper
                    ref={swiperRef}
                    style={styles.swiper}
                    showsButtons={false}
                    showsPagination={false}
                    loop={false}
                    onIndexChanged={setCurrentIndex}
                    cardStyle={styles.swiperCard}
                    scrollEnabled={true}
                >
                    {slidesMatchMock.map((profile) => (
                        <View key={profile.id} style={styles.swiperSlide}>
                            {renderProfile(profile)}
                        </View>
                    ))}
                </Swiper>

                {/* Botones de acción con LinearGradient */}
                <View style={styles.actionButtons}>
                    {/* Botón Dislike con gradient */}
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleDislike}
                    >
                        <LinearGradient
                            colors={[colors.gray[100], colors.gray[200]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.actionButtonGradient, styles.dislikeButton]}
                        >
                            <Icon name="close" size={28} color={'red'} />
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Botón Like con gradient principal */}
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleLike}
                    >
                        <LinearGradient
                            colors={[colors.pink[400], colors.pink[600], colors.amethyst[500]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.actionButtonGradient, styles.likeButton]}
                        >
                            <Icon name="heart" size={32} color={colors.white} />
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Botón Message con gradient */}
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleMessage}
                    >
                        <LinearGradient
                            colors={[colors.pink[50], colors.pink[100]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.actionButtonGradient, styles.messageButton]}
                        >
                            <Icon name="message" size={28} color={colors.pink[500]} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Indicador de progreso */}
                <View style={styles.progressIndicator}>
                    {slidesMatchMock.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.progressDot,
                                index === currentIndex && styles.progressDotActive
                            ]}
                        />
                    ))}

                    {/* Contador de perfiles */}
                    <Text style={styles.counterText}>
                        {currentIndex + 1}/{slidesMatchMock.length}
                    </Text>
                </View>

                {/* Modal de galería */}
                <ModalGallery
                    visible={galleryModalVisible}
                    onClose={closeGallery}
                    profile={currentProfile}
                    initialIndex={selectedGalleryIndex}
                />
            </View>
        </Layout>
    );
};

export default Match;