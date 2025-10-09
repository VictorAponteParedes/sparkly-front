import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Modal,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { LocalVideoTrack, createLocalTracks } from 'twilio-video';
import { Layout } from '../../components/Layout';
import { Icon } from '../../components/common/Icon';
import { colors } from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

interface CallSimulatorProps {
    visible: boolean;
    onClose: () => void;
    onCallEnd: () => void;
}

const CallSimulator: React.FC<CallSimulatorProps> = ({
    visible,
    onClose,
    onCallEnd,
}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [hasPermissions, setHasPermissions] = useState(false);
    const [remoteConnected, setRemoteConnected] = useState(false);
    const [localTrack, setLocalTrack] = useState<LocalVideoTrack | null>(null);
    const timerRef = useRef<NodeJS.Timeout>();

    // NOTA: Esta es una simulación sin backend. Cuando tengas un backend, necesitarás un accessToken y roomName de Twilio.

    useEffect(() => {
        if (visible) {
            requestPermissions();
            initializeTwilio();
        } else {
            leaveRoom();
        }

        return () => {
            leaveRoom();
        };
    }, [visible]);

    useEffect(() => {
        if (isConnected) {
            timerRef.current = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);

            // Simular conexión de un usuario remoto después de 3 segundos
            const remoteTimeout = setTimeout(() => {
                setRemoteConnected(true);
            }, 3000);

            return () => clearTimeout(remoteTimeout);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            setRemoteConnected(false);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isConnected]);

    const initializeTwilio = async () => {
        try {
            if (!hasPermissions && Platform.OS === 'android') {
                await requestPermissions();
            }

            if (!hasPermissions) {
                console.log('No se otorgaron permisos, continuando con simulación sin cámara/micrófono');
                return;
            }

            try {
                const tracks = await createLocalTracks({
                    audio: true,
                    video: { facingMode: 'user' },
                });
                const videoTrack = tracks.find(track => track.kind === 'video') as LocalVideoTrack;
                setLocalTrack(videoTrack);
                console.log('Pistas locales inicializadas correctamente');
            } catch (trackError) {
                console.warn('Error creando pistas locales:', trackError);
                Alert.alert(
                    'Advertencia',
                    'No se pudo acceder a la cámara o micrófono. Continuando en modo simulación.',
                );
                // Continuar con la simulación aunque no haya pistas
                setLocalTrack(null);
            }
        } catch (error) {
            console.error('Error inicializando Twilio:', error);
            Alert.alert('Error', 'No se pudo inicializar la videollamada. Verifica tu dispositivo o permisos.');
        }
    };

    const requestPermissions = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
                const audioGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';

                const permissionsGranted = cameraGranted && audioGranted;
                setHasPermissions(permissionsGranted);

                if (!permissionsGranted) {
                    Alert.alert(
                        'Permisos requeridos',
                        'La app necesita acceso a cámara y micrófono para las videollamadas'
                    );
                    return false;
                }
                console.log('Permisos otorgados:', { camera: cameraGranted, audio: audioGranted });
                return true;
            } catch (err) {
                console.warn('Error solicitando permisos:', err);
                return false;
            }
        } else {
            // En iOS, los permisos se solicitan automáticamente al usar createLocalTracks
            setHasPermissions(true);
            return true;
        }
    };

    const joinRoom = async () => {
        if (!hasPermissions) {
            const permissionsGranted = await requestPermissions();
            if (!permissionsGranted) {
                console.log('No hay permisos, iniciando simulación sin cámara/micrófono');
            }
        }

        try {
            // Simulación: activamos la conexión y mostramos el video local (si está disponible)
            setIsConnected(true);
            console.log('Simulación: conectado a la videollamada');
        } catch (error) {
            console.error('Error en la simulación:', error);
            Alert.alert('Error', 'No se pudo iniciar la videollamada simulada');
        }
    };

    const leaveRoom = async () => {
        if (localTrack) {
            localTrack.stop();
            setLocalTrack(null);
        }
        setIsConnected(false);
        setRemoteConnected(false);
        setCallDuration(0);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartCall = async () => {
        await joinRoom();
    };

    const handleEndCall = async () => {
        await leaveRoom();
        onCallEnd();
        Alert.alert(
            'Llamada finalizada',
            `Duración: ${formatTime(callDuration)}`,
            [{ text: 'OK', onPress: onClose }]
        );
    };

    const toggleVideo = async () => {
        if (!localTrack || !hasPermissions) {
            Alert.alert('Advertencia', 'No se puede alternar video sin permisos o pista local');
            return;
        }

        try {
            if (isVideoOn) {
                localTrack.disable();
            } else {
                localTrack.enable();
            }
            setIsVideoOn(!isVideoOn);
        } catch (error) {
            console.error('Error toggle video:', error);
        }
    };

    const toggleAudio = async () => {
        if (!hasPermissions) {
            Alert.alert('Advertencia', 'No se puede alternar audio sin permisos');
            return;
        }

        try {
            const tracks = await createLocalTracks({
                audio: true,
                video: false,
            });
            const audioTrack = tracks.find(track => track.kind === 'audio');
            if (audioTrack) {
                if (isAudioOn) {
                    audioTrack.disable();
                } else {
                    audioTrack.enable();
                }
                setIsAudioOn(!isAudioOn);
            }
        } catch (error) {
            console.error('Error toggle audio:', error);
            Alert.alert('Error', 'No se pudo alternar el audio');
        }
    };

    const renderLocalVideo = () => {
        if (!hasPermissions) {
            return (
                <View style={styles.videoPlaceholder}>
                    <Text style={styles.videoPlaceholderText}>🔒 Sin permisos</Text>
                </View>
            );
        }

        if (!isVideoOn || !localTrack) {
            return (
                <View style={styles.videoOffContainer}>
                    <Icon name="profile" size={40} color={colors.gray[400]} />
                    <Text style={styles.videoOffText}>Cámara apagada</Text>
                </View>
            );
        }

        return (
            <VideoTrack
                style={styles.video}
                track={localTrack}
                enabled={isVideoOn}
            />
        );
    };

    const renderRemoteVideo = () => {
        if (!isConnected) {
            return (
                <View style={styles.videoPlaceholder}>
                    <Text style={styles.videoPlaceholderText}>👤 Conectando...</Text>
                </View>
            );
        }

        if (!remoteConnected) {
            return (
                <View style={styles.videoPlaceholder}>
                    <Text style={styles.videoPlaceholderText}>🔍 Buscando persona...</Text>
                </View>
            );
        }

        return (
            <View style={styles.videoPlaceholder}>
                <Text style={styles.videoPlaceholderText}>👤 Simulación de usuario remoto</Text>
            </View>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            statusBarTranslucent
        >
            <View style={styles.container}>
                {/* Video local (tu cámara) */}
                <View style={styles.localVideoContainer}>
                    {renderLocalVideo()}
                </View>

                {/* Video remoto (persona aleatoria) */}
                <View style={styles.remoteVideoContainer}>
                    <View style={styles.remoteVideo}>
                        {renderRemoteVideo()}
                    </View>
                </View>

                {/* Información de la llamada */}
                <View style={styles.callInfo}>
                    <Text style={styles.durationText}>
                        {isConnected ? formatTime(callDuration) : '00:00'}
                    </Text>
                    <Text style={styles.statusText}>
                        {isConnected
                            ? remoteConnected
                                ? 'Conectado'
                                : 'Buscando persona...'
                            : hasPermissions
                                ? 'Listo para iniciar'
                                : 'Solicitando permisos...'}
                    </Text>
                </View>

                {/* Controles de la llamada */}
                <View style={styles.controlsContainer}>
                    {!isConnected ? (
                        <TouchableOpacity
                            style={[styles.controlButton, styles.startButton]}
                            onPress={handleStartCall}
                            disabled={false} // Permitir iniciar incluso sin permisos para simulación
                        >
                            <LinearGradient
                                colors={
                                    hasPermissions
                                        ? [colors.pink[500], colors.amethyst[500]]
                                        : [colors.gray[500], colors.gray[600]]
                                }
                                style={styles.gradientButton}
                            >
                                <Icon
                                    name="videoCall"
                                    size={28}
                                    color={hasPermissions ? colors.white : colors.gray[400]}
                                />
                            </LinearGradient>
                            <Text
                                style={[
                                    styles.controlButtonText,
                                    !hasPermissions && { color: colors.gray[400] },
                                ]}
                            >
                                {hasPermissions ? 'Iniciar' : 'Iniciar (Sin permisos)'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.controlButton}
                                onPress={toggleAudio}
                            >
                                <LinearGradient
                                    colors={
                                        isAudioOn
                                            ? [colors.gray[600], colors.gray[700]]
                                            : [colors.red[500], colors.red[600]]
                                    }
                                    style={styles.gradientButton}
                                >
                                    <Icon
                                        name={isAudioOn ? 'microfone' : 'microfoneOff'}
                                        size={24}
                                        color={colors.white}
                                    />
                                </LinearGradient>
                                <Text style={styles.controlButtonText}>
                                    {isAudioOn ? 'Mute' : 'Sonido'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.controlButton}
                                onPress={toggleVideo}
                            >
                                <LinearGradient
                                    colors={
                                        isVideoOn
                                            ? [colors.gray[600], colors.gray[700]]
                                            : [colors.red[500], colors.red[600]]
                                    }
                                    style={styles.gradientButton}
                                >
                                    <Icon
                                        name={isVideoOn ? 'camera' : 'cameraOff'}
                                        size={24}
                                        color={colors.white}
                                    />
                                </LinearGradient>
                                <Text style={styles.controlButtonText}>
                                    {isVideoOn ? 'Video' : 'Cámara'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.controlButton, styles.endCallButton]}
                                onPress={handleEndCall}
                            >
                                <LinearGradient
                                    colors={[colors.red[500], colors.red[600]]}
                                    style={styles.gradientButton}
                                >
                                    <Icon name="phoneOff" size={24} color={colors.white} />
                                </LinearGradient>
                                <Text style={styles.controlButtonText}>Colgar</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};


export default CallSimulator;