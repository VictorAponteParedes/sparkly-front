import React, { useState, useEffect } from "react";
import { Modal, SafeAreaView, Alert } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import { createMeeting, token } from "../../services/sdkServices";
import MeetingView from "./components/MeetingView";
import LoadingView from "./components/LoadingView";
import styles from './styles';

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
    const [meetingId, setMeetingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log("CallSimulator state:", { visible, meetingId, isLoading });

    useEffect(() => {
        if (visible && !meetingId && !isLoading) {
            console.log("Initializing meeting creation...");
            initializeMeeting();
        }
    }, [visible, meetingId, isLoading]);

    const initializeMeeting = async () => {
        setIsLoading(true);
        try {
            console.log("Creating meeting...");
            const newMeetingId = await createMeeting();
            console.log('Meeting ID created:', newMeetingId);
            setMeetingId(newMeetingId);
        } catch (error) {
            console.error('Error creating meeting:', error);
            Alert.alert('Error', 'No se pudo crear la reunión');
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    const handleEndCall = () => {
        console.log("Call ended, cleaning up...");
        setMeetingId(null);
        onCallEnd();
        onClose();
    };

    const handleClose = () => {
        console.log("Modal closed, cleaning up...");
        setMeetingId(null);
        onClose();
    };

    // Loading mientras crea la reunión
    if (isLoading) {
        return (
            <Modal visible={visible} animationType="slide">
                <LoadingView
                    message="Creando reunión..."
                    showMeetingId={false}
                />
            </Modal>
        );
    }

    // No mostrar nada si no hay meetingId
    if (!meetingId) {
        return null;
    }

    return (
        <Modal
            visible={visible && !!meetingId}
            animationType="slide"
            presentationStyle="fullScreen"
            statusBarTranslucent
            onRequestClose={handleClose}
        >
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
                        console.error("❌ MeetingProvider error:", error);
                        Alert.alert("Error de reunión", error.message || "Error desconocido");
                    }}
                >
                    <MeetingView
                        onEndCall={handleEndCall}
                        meetingId={meetingId}
                    />
                </MeetingProvider>
            </SafeAreaView>
        </Modal>
    );
};

export default CallSimulator;