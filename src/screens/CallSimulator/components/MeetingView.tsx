import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import LocalVideoView from "./LocalVideoView";
import RemoteVideoView from "./RemoteVideoView";
import ControlsContainer from "./ControlsContainer";
import LoadingView from "./LoadingView";

interface MeetingViewProps {
    onEndCall: () => void;
    meetingId: string;
}

const MeetingView: React.FC<MeetingViewProps> = ({ onEndCall, meetingId }) => {
    const {
        join,
        participants,
        localParticipant,
        localWebcamOn,
        localMicOn,
        enableWebcam,
        enableMic,
        toggleMic,
    } = useMeeting({
        onMeetingJoined: () => console.log("✅ Evento onMeetingJoined disparado"),
        onMeetingLeft: () => {
            console.log("🏃 Evento onMeetingLeft disparado");
            onEndCall();
        },
        onError: (error) => {
            console.error("❌ Error en useMeeting:", error);
            if (error.message.includes("3033") || error.message.includes("camera access")) {
                console.warn("⚠️ Warning de cámara ignorado (común en SDK, pero join funcionó)");
            } else {
                Alert.alert("Error en la reunión", error.message || "Ocurrió un error desconocido");
            }
        },
        onParticipantJoined: (participant) => console.log("👤 Participante unido:", participant.id, participant.displayName),
        onParticipantLeft: (participant) => console.log("👤 Participante salió:", participant.id),
    });

    const [joinAttempted, setJoinAttempted] = useState(false);
    const participantIds = [...participants.keys()].filter(id => !participants.get(id)?.isLocal);
    const isJoined = !!localParticipant;

    useEffect(() => {
        if (!isJoined && !joinAttempted) {
            console.log("🔄 Intentando unirse a la reunión:", meetingId);
            setJoinAttempted(true);

            const joinMeeting = async () => {
                try {
                    console.log("🎯 Verificando estado de useMeeting:", {
                        enableMicExists: !!enableMic,
                        enableWebcamExists: !!enableWebcam,
                        toggleMicExists: !!toggleMic,
                        localWebcamOn,
                        localMicOn,
                    });

                    // Habilitar cámara si no está activa
                    if (!localWebcamOn && enableWebcam) {
                        await enableWebcam();
                        console.log("✅ Cámara habilitada");
                    }

                    // Habilitar micrófono si no está activo
                    if (!localMicOn) {
                        if (enableMic) {
                            await enableMic();
                            console.log("✅ Micrófono habilitado");
                        } else if (toggleMic) {
                            console.log("⚠️ enableMic no disponible, intentando toggleMic...");
                            await toggleMic();
                            console.log("✅ Micrófono toggled");
                        } else {
                            console.warn("⚠️ Ni enableMic ni toggleMic están disponibles");
                        }
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
    }, [isJoined, joinAttempted, join, enableWebcam, enableMic, toggleMic, localWebcamOn, localMicOn, meetingId]);

    if (!isJoined) {
        return <LoadingView message="Uniéndose a la reunión..." meetingId={meetingId} />;
    }

    console.log("✅ RENDER MEETING - User is joined! Participants:", participantIds.length);

    return (
        <View style={{ flex: 1 }}>
            {/* Video local */}
            <LocalVideoView />

            {/* Videos remotos */}
            <View style={{ flex: 1 }}>
                {participantIds.map((participantId) => (
                    <RemoteVideoView key={participantId} participantId={participantId} />
                ))}
                {participantIds.length === 0 && (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#333" }}>
                        <Text style={{ color: "#fff" }}>Esperando participantes (ID: {meetingId})</Text>
                    </View>
                )}
            </View>

            {/* Controles */}
            <ControlsContainer onEndCall={onEndCall} />
        </View>
    );
};

export default MeetingView;