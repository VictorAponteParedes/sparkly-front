import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Layout } from '../../components/Layout';
import { Icon } from '../../components/common/Icon';
import {
    Input,
    TextArea,
    Select,
    MultiSelect,
    DatePicker,
    PasswordInput
} from '../../components/Form';
import { colors } from '../../theme/theme';
import styles from './styles';
import { fotoPerfil } from '../../assets/images';

// Tipos para el formulario
interface ProfileForm {
    name: string;
    age: string;
    gender: string;
    location: string;
    bio: string;
    occupation: string;
    education: string;
    birthDate: string;
    lookingFor: string;
    ageRange: string;
    maxDistance: string;
    interests: string[];
    password: string;
    newPassword: string;
    confirmPassword: string;
}

const Profile = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        defaultValues: {
            name: "Sofia",
            age: "28",
            gender: "female",
            location: "Madrid, España",
            bio: "Amante del café, los viajes y las buenas conversaciones. Siempre buscando nuevas aventuras y experiencias que me hagan crecer.",
            occupation: "Diseñadora Gráfica",
            education: "Universidad Complutense",
            lookingFor: "relationship",
            ageRange: "25-35",
            maxDistance: "50",
            interests: ["travel", "photography", "yoga"]
        }
    });

    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(fotoPerfil);
    const [galleryPhotos, setGalleryPhotos] = useState([
        fotoPerfil,
        fotoPerfil,
        fotoPerfil
    ]);
    const [imagePickerModal, setImagePickerModal] = useState(false);

    // Opciones para los selects
    const genderOptions = [
        { label: "Mujer", value: "female" },
        { label: "Hombre", value: "male" },
        { label: "No binario", value: "non_binary" },
        { label: "Prefiero no decir", value: "prefer_not_say" }
    ];

    const lookingForOptions = [
        { label: "Una relación seria", value: "relationship" },
        { label: "Algo casual", value: "casual" },
        { label: "Nuevos amigos", value: "friends" },
        { label: "Aún no lo sé", value: "not_sure" }
    ];

    const interestOptions = [
        { label: "Viajar", value: "travel" },
        { label: "Fotografía", value: "photography" },
        { label: "Yoga", value: "yoga" },
        { label: "Música", value: "music" },
        { label: "Café", value: "coffee" },
        { label: "Senderismo", value: "hiking" },
        { label: "Lectura", value: "reading" },
        { label: "Cocina", value: "cooking" },
        { label: "Deportes", value: "sports" },
        { label: "Arte", value: "art" },
        { label: "Cine", value: "cinema" },
        { label: "Tecnología", value: "technology" }
    ];

    const onSubmit = (data: ProfileForm) => {
        console.log('Datos del perfil:', data);
        setIsEditing(false);
        Alert.alert("Éxito", "Perfil actualizado correctamente");
    };

    const onCancel = () => {
        setIsEditing(false);
    };

    const handleImageChange = () => {
        setImagePickerModal(true);
    };

    const handleTakePhoto = () => {
        setImagePickerModal(false);
        // Aquí iría la lógica para abrir la cámara
        Alert.alert("Cámara", "Funcionalidad de cámara por implementar");
    };

    const handleChooseFromGallery = () => {
        setImagePickerModal(false);
        // Aquí iría la lógica para abrir la galería
        Alert.alert("Galería", "Funcionalidad de galería por implementar");
    };

    const handleAddGalleryPhoto = () => {
        if (galleryPhotos.length < 7) {
            setGalleryPhotos([...galleryPhotos, fotoPerfil]);
        } else {
            Alert.alert("Límite alcanzado", "Máximo 7 fotos permitidas");
        }
    };

    const handleRemoveGalleryPhoto = (index: number) => {
        const newPhotos = galleryPhotos.filter((_, i) => i !== index);
        setGalleryPhotos(newPhotos);
    };

    const renderImagePickerModal = () => (
        <Modal
            visible={imagePickerModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setImagePickerModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Cambiar foto de perfil</Text>

                    <TouchableOpacity
                        style={styles.modalOption}
                        onPress={handleTakePhoto}
                    >
                        <Icon name="camera" size={24} color={colors.pink[500]} />
                        <Text style={styles.modalOptionText}>Tomar foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalOption}
                        onPress={handleChooseFromGallery}
                    >
                        <Icon name="imageHeart" size={24} color={colors.pink[500]} />
                        <Text style={styles.modalOptionText}>Elegir de galería</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modalCancel}
                        onPress={() => setImagePickerModal(false)}
                    >
                        <Text style={styles.modalCancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <Layout
            title="Mi Perfil"
            leftIcon
            leftIconName="arrowLeft" // Nombre correcto del icono
            rightIcon
            rightIconName={isEditing ? "save" : "edit"}
            onRightIconPress={() => isEditing ? handleSubmit(onSubmit)() : setIsEditing(true)}
        >
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Sección Foto de Perfil */}
                <View style={styles.section}>
                    <View style={styles.photoSection}>
                        <TouchableOpacity
                            style={styles.photoContainer}
                            onPress={isEditing ? handleImageChange : undefined}
                            disabled={!isEditing}
                        >
                            <Image
                                source={profileImage}
                                style={styles.profileImage}
                                resizeMode="cover"
                            />
                            {isEditing && (
                                <View style={styles.cameraIcon}>
                                    <Icon name="camera" size={20} color={colors.black} />
                                </View>
                            )}
                        </TouchableOpacity>
                        <Text style={styles.photoText}>
                            {isEditing ? "Toca para cambiar tu foto" : "Tu foto de perfil"}
                        </Text>
                    </View>
                </View>

                {/* Sección Información Básica */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información Básica</Text>

                    <Input
                        control={control}
                        name="name"
                        label="Nombre"
                        error={errors.name?.message}
                        required
                        editable={isEditing}
                        placeholder="Tu nombre completo"
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Input
                                control={control}
                                name="age"
                                label="Edad"
                                error={errors.age?.message}
                                required
                                editable={isEditing}
                                keyboardType="numeric"
                                placeholder="Tu edad"
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Select
                                control={control}
                                name="gender"
                                label="Género"
                                error={errors.gender?.message}
                                required
                                options={genderOptions}
                                placeholder="Selecciona tu género"
                            />
                        </View>
                    </View>

                    <Input
                        control={control}
                        name="location"
                        label="Ubicación"
                        error={errors.location?.message}
                        required
                        editable={isEditing}
                        placeholder="Tu ciudad y país"
                    />
                </View>

                {/* Sección Sobre Mí */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sobre Mí</Text>

                    <TextArea
                        control={control}
                        name="bio"
                        label="Biografía"
                        error={errors.bio?.message}
                        required
                        maxLength={250}
                        placeholder="Cuéntanos sobre ti..."
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Input
                                control={control}
                                name="occupation"
                                label="Ocupación"
                                error={errors.occupation?.message}
                                editable={isEditing}
                                placeholder="Tu profesión"
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Input
                                control={control}
                                name="education"
                                label="Educación"
                                error={errors.education?.message}
                                editable={isEditing}
                                placeholder="Tu formación"
                            />
                        </View>
                    </View>

                    <DatePicker
                        control={control}
                        name="birthDate"
                        label="Fecha de Nacimiento"
                        error={errors.birthDate?.message}
                        maximumDate={new Date()}
                    />
                </View>

                {/* Sección Galería de Fotos */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mis Fotos</Text>
                    <Text style={styles.gallerySubtitle}>
                        {galleryPhotos.length}/7 fotos • Puedes agregar hasta 7 fotos
                    </Text>

                    <View style={styles.galleryContainer}>
                        {galleryPhotos.map((photo, index) => (
                            <View key={index} style={styles.galleryPhotoContainer}>
                                <Image
                                    source={photo}
                                    style={styles.galleryPhoto}
                                    resizeMode="cover"
                                />
                                {isEditing && (
                                    <TouchableOpacity
                                        style={styles.removePhotoButton}
                                        onPress={() => handleRemoveGalleryPhoto(index)}
                                    >
                                        <Icon name="close" size={16} color={colors.white} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}

                        {isEditing && galleryPhotos.length < 7 && (
                            <TouchableOpacity
                                style={styles.addPhotoButton}
                                onPress={handleAddGalleryPhoto}
                            >
                                <Icon name="plus" size={24} color={colors.gray[400]} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Sección Intereses */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Intereses</Text>

                    <MultiSelect
                        control={control}
                        name="interests"
                        label="Tus intereses"
                        error={errors.interests?.message}
                        options={interestOptions}
                        maxSelections={10}
                    />
                </View>

                {/* Sección Preferencias */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferencias</Text>

                    <Select
                        control={control}
                        name="lookingFor"
                        label="Buscando"
                        error={errors.lookingFor?.message}
                        options={lookingForOptions}
                        placeholder="¿Qué estás buscando?"
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Input
                                control={control}
                                name="ageRange"
                                label="Rango de edad"
                                error={errors.ageRange?.message}
                                editable={isEditing}
                                placeholder="Ej: 25-35"
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Input
                                control={control}
                                name="maxDistance"
                                label="Distancia máxima (km)"
                                error={errors.maxDistance?.message}
                                editable={isEditing}
                                keyboardType="numeric"
                                placeholder="Ej: 50"
                            />
                        </View>
                    </View>
                </View>

                {/* Sección Seguridad (solo en modo edición) */}
                {isEditing && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Seguridad</Text>

                        <PasswordInput
                            control={control}
                            name="password"
                            label="Contraseña actual"
                            error={errors.password?.message}
                            placeholder="Ingresa tu contraseña actual"
                        />

                        <PasswordInput
                            control={control}
                            name="newPassword"
                            label="Nueva contraseña"
                            error={errors.newPassword?.message}
                            placeholder="Ingresa nueva contraseña"
                        />

                        <PasswordInput
                            control={control}
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            error={errors.confirmPassword?.message}
                            placeholder="Confirma tu nueva contraseña"
                        />
                    </View>
                )}

                {/* Botones de acción (solo en modo edición) */}
                {isEditing && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Espacio al final */}
                <View style={styles.spacer} />
            </ScrollView>

            {/* Modal para seleccionar foto */}
            {renderImagePickerModal()}
        </Layout>
    );
};

export default Profile;