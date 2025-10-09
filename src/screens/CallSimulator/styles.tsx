import { StyleSheet } from "react-native";
import { colors } from "../../theme/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    localVideoContainer: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 120,
        height: 160,
        borderRadius: 12,
        overflow: 'hidden',
        zIndex: 10,
        borderWidth: 2,
        borderColor: colors.white,
    },
    remoteVideoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    remoteVideo: {
        width: '90%',
        height: '60%',
        borderRadius: 20,
        overflow: 'hidden',
    },
    video: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    videoPlaceholder: {
        flex: 1,
        backgroundColor: colors.gray[800],
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlaceholderText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
    videoOffContainer: {
        flex: 1,
        backgroundColor: colors.gray[900],
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoOffText: {
        color: colors.gray[400],
        fontSize: 14,
        marginTop: 8,
    },
    connectionText: {
        color: colors.gray[400],
        fontSize: 14,
        marginTop: 8,
    },
    callInfo: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    durationText: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    statusText: {
        color: colors.gray[400],
        fontSize: 16,
        marginTop: 4,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        gap: 20,
    },
    controlButton: {
        alignItems: 'center',
    },
    gradientButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    startButton: {},
    endCallButton: {},
    controlButtonText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '500',
    },
});

export default styles;