import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    View,
    Alert,
    Platform,
} from "react-native";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    RTCView,
} from "@videosdk.live/react-native-sdk";
import { createMeeting, token } from "../../services/sdkServices";

interface CallSimulatorProps {
    visible: boolean;
    onClose: () => void;
    onCallEnd: () => void;
}

function ControlsContainer({ onEndCall }) {
    const { leave, toggleWebcam, toggleMic, localWebcamOn, localMicOn } = useMeeting();

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 20, backgroundColor: "#fff" }}>
            <TouchableOpacity
                style={{ backgroundColor: localWebcamOn ? "#007AFF" : "#FF4444", padding: 10, borderRadius: 5 }}
                onPress={toggleWebcam}
            >
                <Text style={{ color: "#fff" }}>{localWebcamOn ? "📹" : "📹❌"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: localMicOn ? "#007AFF" : "#FF4444", padding: 10, borderRadius: 5 }}
                onPress={toggleMic}
            >
                <Text style={{ color: "#fff" }}>{localMicOn ? "🎤" : "🎤❌"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: "#FF4444", padding: 10, borderRadius: 5 }}
                onPress={() => {
                    leave();
                    onEndCall();
                }}
            >
                <Text style={{ color: "#fff" }}>📞 Salir</Text>
            </TouchableOpacity>
        </View>
    );
}

function ParticipantView({ participantId }) {
    const { webcamStream, webcamOn, displayName, isLocal } = useParticipant(participantId);

    if (isLocal) return null; // No renderizar el participante local aquí

    console.log(`Rendering participant ${participantId}:`, { webcamOn, hasWebcamStream: !!webcamStream, displayName });

    return (
        <View style={{ flex: 1, margin: 10, backgroundColor: "#000" }}>
            <Text style={{ color: "#fff", padding: 5 }}>{displayName || "Usuario remoto"}</Text>
            {webcamOn && webcamStream ? (
                <RTCView
                    streamURL={webcamStream.toURL()} // Usar directamente webcamStream.toURL()
                    style={{ flex: 1 }}
                    objectFit="cover"
                />
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#333" }}>
                    <Text style={{ color: "#fff" }}>Cámara apagada</Text>
                </View>
            )}
        </View>
    );
}

function MeetingView({ onEndCall, meetingId }) {
    const {
        join,
        participants,
        localParticipant,
        localWebcamOn,
        localMicOn,
        enableWebcam,
        toggleMic,
    } = useMeeting({
        onMeetingJoined: () => console.log("✅ Evento onMeetingJoined disparado"),
        onMeetingLeft: () => {
            console.log("🏃 Evento onMeetingLeft disparado");
            onEndCall();
        },
        onError: (error) => {
            console.error("❌ Error en useMeeting:", error);
            if (error.message.includes("3033") || error.message.includes("camera")) {
                console.warn("⚠️ Warning de cámara ignorado (ERROR_CAMERA_ACCESS_UNAVAILABLE)");
            } else {
                Alert.alert(
                    "Error en la reunión",
                    error.message.includes("401") || error.message.includes("token")
                        ? "El token proporcionado no es válido. Verifica tu configuración en VideoSDK."
                        : error.message || "Ocurrió un error desconocido"
                );
            }
        },
        onParticipantJoined: (participant) => console.log("👤 Participante unido:", participant.id, participant.displayName),
        onParticipantLeft: (participant) => console.log("👤 Participante salió:", participant.id),
    });

    const participantIds = [...participants.keys()].filter((id) => !participants.get(id)?.isLocal);
    const isJoined = !!localParticipant;

    useEffect(() => {
        if (!isJoined) {
            console.log("🔄 Intentando unirse a la reunión:", meetingId);
            const joinMeeting = async () => {
                try {
                    console.log("🎯 Verificando estado de useMeeting:", {
                        enableWebcamExists: !!enableWebcam,
                        toggleMicExists: !!toggleMic,
                        localWebcamOn,
                        localMicOn,
                    });

                    if (!localWebcamOn && enableWebcam) {
                        await enableWebcam();
                        console.log("✅ Cámara habilitada");
                    }

                    if (!localMicOn && toggleMic) {
                        console.log("⚠️ enableMic no disponible, usando toggleMic...");
                        await toggleMic();
                        console.log("✅ Micrófono toggled");
                    }

                    await join();
                    console.log("✅ Unión completada con éxito");
                } catch (error) {
                    console.error("❌ Error al unirse a la reunión:", error);
                    Alert.alert("Error", "No se pudo unirse a la reunión. Verifica los permisos y el token.");
                }
            };
            const timer = setTimeout(joinMeeting, 2000);
            return () => clearTimeout(timer);
        }
    }, [isJoined, join, enableWebcam, toggleMic, localWebcamOn, localMicOn, meetingId]);

    if (!isJoined) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F6FF" }}>
                <Text>Uniéndose a la reunión {meetingId}...</Text>
            </View>
        );
    }

    console.log("✅ RENDER MEETING - User is joined! Participants:", participantIds.length);

    return (
        <View style={{ flex: 1 }}>
            {/* Video local */}
            {localParticipant && (
                <View style={{ position: "absolute", top: 50, right: 10, width: 100, height: 150, zIndex: 1, backgroundColor: "#000" }}>
                    <Text style={{ color: "#fff", padding: 5 }}>Tu cámara</Text>
                    {localWebcamOn ? (
                        <RTCView
                            streamURL="local" // Stream local
                            style={{ flex: 1, mirror: true }}
                            objectFit="cover"
                        />
                    ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#333" }}>
                            <Text style={{ color: "#fff" }}>Cámara apagada</Text>
                        </View>
                    )}
                </View>
            )}

            {/* Videos remotos */}
            <View style={{ flex: 1 }}>
                {participantIds.length > 0 ? (
                    participantIds.map((participantId) => <ParticipantView key={participantId} participantId={participantId} />)
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#333" }}>
                        <Text style={{ color: "#fff" }}>Esperando participantes (ID: {meetingId})</Text>
                    </View>
                )}
            </View>

            <ControlsContainer onEndCall={onEndCall} />
        </View>
    );
}

const CallSimulator: React.FC<CallSimulatorProps> = ({ visible, onClose, onCallEnd }) => {
    const [meetingId, setMeetingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log("CallSimulator state:", { visible, meetingId, isLoading });

    useEffect(() => {
        if (visible && !meetingId && !isLoading) {
            console.log("Iniciando creación de la reunión...");
            Alert.alert(
                "Permisos requeridos",
                `Esta aplicación necesita acceso a la cámara y al micrófono. Habilita en configuración:\n\n${Platform.OS === "android" ? "- Android: Configuración > Apps > [App] > Permisos" : "- iOS: Configuración > [App] > Cámara/Micrófono"}`,
                [
                    { text: "Cancelar", style: "cancel", onPress: onClose },
                    { text: "OK", onPress: initializeMeeting },
                ]
            );
        }
    }, [visible, meetingId, isLoading]);

    const initializeMeeting = async () => {
        setIsLoading(true);
        try {
            console.log("Creando reunión...");
            const newMeetingId = await createMeeting();
            console.log("Meeting ID creado:", newMeetingId);
            setMeetingId(newMeetingId);
        } catch (error) {
            console.error("Error al crear la reunión:", error);
            Alert.alert("Error", "No se pudo crear la reunión. Verifica tu conexión.");
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    const handleEndCall = () => {
        console.log("Llamada finalizada, limpiando...");
        setMeetingId(null);
        onCallEnd();
        onClose();
    };

    if (isLoading || !meetingId || !visible) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
            <MeetingProvider
                config={{
                    meetingId,
                    micEnabled: true,
                    webcamEnabled: true,
                    name: "Usuario Sparkly",
                }}
                token={token}
                onError={(error) => {
                    console.error("❌ Error en MeetingProvider:", error);
                    if (error.message.includes("3033") || error.message.includes("camera")) {
                        console.warn("⚠️ Warning de cámara ignorado");
                    } else {
                        Alert.alert(
                            "Error de reunión",
                            error.message.includes("401") || error.message.includes("token")
                                ? "El token proporcionado no es válido. Verifica tu configuración en VideoSDK."
                                : error.message || "Error desconocido"
                        );
                    }
                }}
            >
                <MeetingView onEndCall={handleEndCall} meetingId={meetingId} />
            </MeetingProvider>
        </SafeAreaView>
    );
};

export default CallSimulator;