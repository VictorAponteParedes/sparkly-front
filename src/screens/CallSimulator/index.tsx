import React from 'react';
import { Modal, View } from 'react-native';
import { useCallSimulator } from './hooks/useCallSimulator';
import { LocalVideo } from './components/LocalVideo';
import { RemoteVideo } from './components/RemoteVideo';
import { CallInfo } from './components/CallInfo';
import { CallControls } from './components/CallControls';
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
    const {
        isConnected,
        callDuration,
        isVideoOn,
        isAudioOn,
        hasPermissions,
        remoteConnected,
        localVideoTrack,
        handleStartCall,
        toggleAudio,
        toggleVideo,
        handleEndCall,
    } = useCallSimulator(visible, onClose, onCallEnd);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            statusBarTranslucent
        >
            <View style={styles.container}>
                <View style={styles.localVideoContainer}>
                    <LocalVideo
                        hasPermissions={hasPermissions}
                        isVideoOn={isVideoOn}
                        localVideoTrack={localVideoTrack}
                    />
                </View>
                <View style={styles.remoteVideoContainer}>
                    <View style={styles.remoteVideo}>
                        <RemoteVideo isConnected={isConnected} remoteConnected={remoteConnected} />
                    </View>
                </View>
                <CallInfo
                    isConnected={isConnected}
                    callDuration={callDuration}
                    remoteConnected={remoteConnected}
                    hasPermissions={hasPermissions}
                />
                <CallControls
                    isConnected={isConnected}
                    hasPermissions={hasPermissions}
                    isAudioOn={isAudioOn}
                    isVideoOn={isVideoOn}
                    handleStartCall={handleStartCall}
                    toggleAudio={toggleAudio}
                    toggleVideo={toggleVideo}
                    handleEndCall={handleEndCall}
                />
            </View>
        </Modal>
    );
};

export default CallSimulator;