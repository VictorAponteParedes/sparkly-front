import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon } from '../../../../components/common/Icon';
import { colors } from '../../../../theme/theme';
import { UserProfile } from '../../../../mocks/slidesMatchMock';
import styles from './styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ModalGalleryProps {
    visible: boolean;
    onClose: () => void;
    profile: UserProfile | null;
    initialIndex: number;
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({
    visible,
    onClose,
    profile,
    initialIndex,
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    if (!profile) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <StatusBar backgroundColor="rgba(0,0,0,0.95)" barStyle="light-content" />
            <View style={styles.modalContainer}>
                {/* Header del modal */}
                <View style={styles.modalHeader}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <Icon name="close" size={24} color={colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>
                        {profile.name} - {currentIndex + 1}/{profile.photosGalery.length}
                    </Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Galería completa con Swiper */}
                <View style={styles.swiperContainer}>
                    <Swiper
                        loop={false}
                        index={initialIndex}
                        onIndexChanged={setCurrentIndex}
                        showsPagination={false}
                        // Configuración para mejorar gestos
                        scrollEnabled={true}
                        loadMinimal={true}
                        loadMinimalSize={1}
                    >
                        {profile.photosGalery.map((photo, index) => (
                            <View key={index} style={styles.slide}>
                                <Image
                                    source={{ uri: photo }}
                                    style={styles.fullImage}
                                    resizeMode="contain"
                                />
                            </View>
                        ))}
                    </Swiper>
                </View>

                {/* Miniaturas en la parte inferior */}
                <View style={styles.thumbnailsContainer}>
                    <View style={styles.thumbnailsScroll}>
                        {profile.photosGalery.map((photo, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentIndex(index)}
                                style={[
                                    styles.thumbnail,
                                    index === currentIndex && styles.thumbnailActive
                                ]}
                            >
                                <Image
                                    source={{ uri: photo }}
                                    style={styles.thumbnailImage}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};