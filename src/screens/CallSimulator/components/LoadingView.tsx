import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from '../styles';

interface LoadingViewProps {
    message: string;
    showMeetingId?: boolean;
    meetingId?: string;
    showHint?: boolean;
}

const LoadingView: React.FC<LoadingViewProps> = ({
    message,
    showMeetingId = false,
    meetingId,
    showHint = false
}) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>{message}</Text>
            {showMeetingId && meetingId && (
                <Text style={styles.meetingIdText}>Sala: {meetingId}</Text>
            )}
            {showHint && (
                <Text style={styles.hintText}>Esto puede tomar unos segundos...</Text>
            )}
        </View>
    );
};

export default LoadingView;