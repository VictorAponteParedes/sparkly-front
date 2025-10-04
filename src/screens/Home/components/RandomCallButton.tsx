import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '../../../components/common/Icon';

interface Props {
    onPress: () => void;
}

const RandomCallButton = (props: Props) => {
    const { onPress } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                <LinearGradient
                    colors={[colors.pink[400], colors.pink[600]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <View style={styles.content}>
                        <Icon name='videoCall' color={colors.white} size={24} />
                        <Text style={styles.text}>Iniciar Videollamada</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonContainer: {
        borderRadius: 12,
        shadowColor: colors.pink[600],
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8,
    },
    gradient: {
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 12,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default RandomCallButton;