import React from 'react';
import { View, ScrollView } from 'react-native';
import RandomCallButton from './components/RandomCallButton';
import { styles } from './styles';
import { Drawer } from '../../components/Drawer/Drawer';

export default function Home() {
    const handleRandomCall = () => {
        // Lógica para iniciar videollamada aleatoria
        console.log('Iniciando videollamada...');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
            </View>

            <RandomCallButton onPress={handleRandomCall} />


        </ScrollView>
    );
}
