import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6FF',
    },
    localVideoContainer: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 120,
        height: 160,
        zIndex: 10,
        backgroundColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
    },
    localVideo: {
        flex: 1,
    },
    remoteVideosContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    remoteVideoContainer: {
        width: width - 40,
        height: height * 0.6,
        backgroundColor: '#000',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
    },
    remoteVideo: {
        flex: 1,
    },
    videoPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    videoLabel: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: 4,
        borderRadius: 4,
        fontSize: 12,
        zIndex: 5,
    },
    controlsContainer: {
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    controlsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    controlButtonOff: {
        backgroundColor: '#FF3B30',
    },
    endCallButton: {
        backgroundColor: '#FF3B30',
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    controlText: {
        fontSize: 20,
        color: 'white',
    },
    endCallText: {
        fontSize: 14,
    },
    localControls: {
        position: 'absolute',
        bottom: 8,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    waitingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    connectedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 10,
    },
    waitingText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    meetingIdText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 10,
    },
    inviteText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 5,
    },
    statusText: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    placeholderText: {
        color: 'white',
        fontSize: 16,
    },
    placeholderSubtext: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6FF',
        padding: 20,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    hintText: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
        fontStyle: 'italic',
    },
    meetingId: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
});