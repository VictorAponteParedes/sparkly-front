import { useState, useRef, useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { LocalVideoTrack, LocalAudioTrack, createLocalTracks } from 'twilio-video';
import { formatTime } from '../../../utils/timeUtils';

interface CallSimulatorState {
    isConnected: boolean;
    callDuration: number;
    isVideoOn: boolean;
    isAudioOn: boolean;
    hasPermissions: boolean;
    remoteConnected: boolean;
    localVideoTrack: LocalVideoTrack | null;
    localAudioTrack: LocalAudioTrack | null;
    joinRoom: () => Promise<void>;
    leaveRoom: () => Promise<void>;
    handleStartCall: () => Promise<void>;
    handleEndCall: () => Promise<void>;
    toggleVideo: () => Promise<void>;
    toggleAudio: () => Promise<void>;
}

export const useCallSimulator = (
    visible: boolean,
    onClose: () => void,
    onCallEnd: () => void,
): CallSimulatorState => {
    const [isConnected, setIsConnected] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [hasPermissions, setHasPermissions] = useState(false);
    const [remoteConnected, setRemoteConnected] = useState(false);
    const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | null>(null);
    const [localAudioTrack, setLocalAudioTrack] = useState<LocalAudioTrack | null>(null);
    const timerRef = useRef<NodeJS.Timeout>();

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
                const audioTrack = tracks.find(track => track.kind === 'audio') as LocalAudioTrack;
                setLocalVideoTrack(videoTrack);
                setLocalAudioTrack(audioTrack);
                console.log('Pistas locales inicializadas correctamente');
            } catch (trackError) {
                console.warn('Error creando pistas locales:', trackError);
                Alert.alert(
                    'Advertencia',
                    'No se pudo acceder a la cámara o micrófono. Continuando en modo simulación.',
                );
                setLocalVideoTrack(null);
                setLocalAudioTrack(null);
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
            setIsConnected(true);
            console.log('Simulación: conectado a la videollamada');
        } catch (error) {
            console.error('Error en la simulación:', error);
            Alert.alert('Error', 'No se pudo iniciar la videollamada simulada');
        }
    };

    const leaveRoom = async () => {
        if (localVideoTrack) {
            localVideoTrack.stop();
            setLocalVideoTrack(null);
        }
        if (localAudioTrack) {
            localAudioTrack.stop();
            setLocalAudioTrack(null);
        }
        setIsConnected(false);
        setRemoteConnected(false);
        setCallDuration(0);
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
        if (!localVideoTrack || !hasPermissions) {
            Alert.alert('Advertencia', 'No se puede alternar video sin permisos o pista local');
            return;
        }

        try {
            if (isVideoOn) {
                localVideoTrack.disable();
            } else {
                localVideoTrack.enable();
            }
            setIsVideoOn(!isVideoOn);
        } catch (error) {
            console.error('Error toggle video:', error);
            Alert.alert('Error', 'No se pudo alternar el video');
        }
    };

    const toggleAudio = async () => {
        if (!localAudioTrack || !hasPermissions) {
            Alert.alert('Advertencia', 'No se puede alternar audio sin permisos o pista local');
            return;
        }

        try {
            if (isAudioOn) {
                localAudioTrack.disable();
            } else {
                localAudioTrack.enable();
            }
            setIsAudioOn(!isAudioOn);
        } catch (error) {
            console.error('Error toggle audio:', error);
            Alert.alert('Error', 'No se pudo alternar el audio');
        }
    };

    return {
        isConnected,
        callDuration,
        isVideoOn,
        isAudioOn,
        hasPermissions,
        remoteConnected,
        localVideoTrack,
        localAudioTrack,
        joinRoom,
        leaveRoom,
        handleStartCall,
        handleEndCall,
        toggleVideo,
        toggleAudio,
    };
};