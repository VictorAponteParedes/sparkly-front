import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../../theme/theme';
import styles from './styles';

export const TypingIndicator: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <View style={styles.dotsContainer}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
            </View>
        </View>
    );
};