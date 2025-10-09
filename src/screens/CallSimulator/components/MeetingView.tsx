import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import LocalVideoView from "./LocalVideoView";
import RemoteVideoView from "./RemoteVideoView";
import MeetingControls from "./MeetingControls";
import LoadingView from "./LoadingView";
import styles from '../styles';

interface MeetingViewProps {
    onEndCall: () => void;
    meetingId: string;
}

const MeetingView: React.FC<MeetingViewProps> = ({ onEndCall, meetingId }) => {
    const {
        join,
        leave,
        localWebcamOn,
        localMicOn,
        toggleWebcam,
        toggleMic,
        participants,
        localParticipant
    } = useMeeting();

    const [joinAttempted, setJoinAttempted] = useState(false);
    const participantIds = [...participants.keys()].filter(id => !participants.get(id)?.isLocal);

    // VERDADERA forma de verificar si está unido
    const isJoined = !!localParticipant;

    console.log("MeetingView state:", {
        isJoined,
        hasLocalParticipant: !!localParticipant,
        meetingId,
        participantsCount: participants.size,
        participantIds,
        joinAttempted
    });

    // Auto-join
    useEffect(() => {
        if (!isJoined && !joinAttempted) {
            console.log("🔄 Attempting to join meeting...");
            setJoinAttempted(true);

            const timer = setTimeout(() => {
                join().then(() => {
                    console.log("✅ Successfully joined meeting");
                }).catch(error => {
                    console.error("❌ Error joining meeting:", error);
                });
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isJoined, joinAttempted, join]);

    const handleEndCall = () => {
        console.log("Ending call...");
        leave();
        onEndCall();
    };

    // Mostrar loading mientras no esté unido
    if (!isJoined) {
        return (
            <LoadingView
                message={joinAttempted ? "Uniéndose a la reunión..." : "Preparando reunión..."}
                showMeetingId={true}
                meetingId={meetingId}
                showHint={joinAttempted}
            />
        );
    }

    console.log("✅ RENDER MEETING - User is joined!");

    return (
        <View style={styles.container}>
            {/* Video local */}
            <LocalVideoView />

            {/* Videos remotos */}
            <View style={styles.remoteVideosContainer}>
                {participantIds.map(participantId => (
                    <RemoteVideoView
                        key={participantId}
                        participantId={participantId}
                    />
                ))}
                {participantIds.length === 0 && (
                    <View style={styles.waitingContainer}>
                        <Text style={styles.connectedText}>✅ Conectado a la sala</Text>
                        <Text style={styles.meetingIdText}>ID: {meetingId}</Text>
                        <Text style={styles.inviteText}>
                            Comparte este ID para invitar a otros
                        </Text>
                        <Text style={styles.statusText}>
                            Estado: Esperando participantes...
                        </Text>
                    </View>
                )}
            </View>

            {/* Controles */}
            <MeetingControls
                onEndCall={handleEndCall}
                meetingId={meetingId}
            />
        </View>
    );
};

export default MeetingView;