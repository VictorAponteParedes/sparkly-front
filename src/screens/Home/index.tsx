import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import RandomCallButton from './components/RandomCallButton';
import CallSimulator from '../CallSimulator';
import { styles } from './styles';
import { Drawer } from '../../components/Drawer/Drawer';

export default function Home() {
    const [isCallActive, setIsCallActive] = useState(false);

    const handleRandomCall = () => {
        setIsCallActive(true);
    };

    const handleCallEnd = () => {
        console.log('Llamada finalizada');
    };

    const handleCloseCall = () => {
        setIsCallActive(false);
    };

    return (
        <Drawer>
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <RandomCallButton onPress={handleRandomCall} />
                </View>

                <CallSimulator
                    visible={isCallActive}
                    onClose={handleCloseCall}
                    onCallEnd={handleCallEnd}
                />
            </ScrollView>
        </Drawer>
    );
}