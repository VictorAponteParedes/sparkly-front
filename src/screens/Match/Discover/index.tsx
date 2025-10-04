import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Layout } from '../../../components/Layout';
import { Icon } from '../../../components/common/Icon';
import { colors } from '../../../theme/theme';
import { slidesMatchMock, UserProfile } from '../../../mocks/slidesMatchMock';
import styles from './styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Match: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleLike = () => {
        console.log('Like a:', slidesMatchMock[currentIndex].name);
        // Lógica para like
    };

    const handleDislike = () => {
        console.log('Dislike a:', slidesMatchMock[currentIndex].name);
        // Lógica para dislike
    };

    const handleMessage = () => {
        console.log('Mensaje a:', slidesMatchMock[currentIndex].name);
        // Lógica para mensaje
    };

    const renderProfile = (profile: UserProfile) => (
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Card 1: Foto principal con información */}
            <View style={styles.photoCard}>
                <Image
                    source={{ uri: profile.principalPhoto }}
                    style={styles.mainPhoto}
                    resizeMode="cover"
                />

                {/* Gradient overlay */}
                <View style={styles.gradientOverlay} />

                {/* Información superpuesta */}
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
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.galleryContainer}
                >
                    {profile.photosGalery.map((photo, index) => (
                        <Image
                            key={index}
                            source={{ uri: photo }}
                            style={styles.galleryPhoto}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );

    return (
        <Layout title="Descubrir" leftIcon>
            <View style={styles.container}>
                {/* Swiper de perfiles */}
                <Swiper
                    style={styles.swiper}
                    showsButtons={false}
                    showsPagination={false}
                    loop={false}
                    onIndexChanged={setCurrentIndex}
                    cardStyle={styles.swiperCard}
                >
                    {slidesMatchMock.map((profile) => (
                        <View key={profile.id} style={styles.swiperSlide}>
                            {renderProfile(profile)}
                        </View>
                    ))}
                </Swiper>

                {/* Botones de acción */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.dislikeButton]}
                        onPress={handleDislike}
                    >
                        <Icon name="close" size={28} color={'red'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.likeButton]}
                        onPress={handleLike}
                    >
                        <Icon name="heart" size={32} color={colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.messageButton]}
                        onPress={handleMessage}
                    >
                        <Icon name="message" size={28} color={colors.pink[500]} />
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
                </View>
            </View>
        </Layout>
    );
};

export default Match;