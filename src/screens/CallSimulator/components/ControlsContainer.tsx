import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";

interface ControlsContainerProps {
    onEndCall: () => void;
}

const ControlsContainer: React.FC<ControlsContainerProps> = ({ onEndCall }) => {
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
};

export default ControlsContainer;