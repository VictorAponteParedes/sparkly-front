import React from "react";
import { View, Text } from "react-native";
import { useMeeting, RTCView } from "@videosdk.live/react-native-sdk";

const LocalVideoView: React.FC = () => {
    const { localWebcamOn } = useMeeting();

    return (
        <View style={{ position: "absolute", top: 50, right: 10, width: 100, height: 150, zIndex: 1, backgroundColor: "#000" }}>
            <Text style={{ color: "#fff", padding: 5 }}>Tu cámara</Text>
            {localWebcamOn ? (
                <RTCView
                    streamURL="local"
                    style={{ flex: 1, mirror: true }}
                    objectFit="cover"
                />
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#333" }}>
                    <Text style={{ color: "#fff" }}>Cámara apagada</Text>
                </View>
            )}
        </View>
    );
};

export default LocalVideoView;