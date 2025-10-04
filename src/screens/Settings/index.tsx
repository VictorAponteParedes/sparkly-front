import React from 'react';
import { View, Text } from 'react-native';
import { Layout } from '../../components/Layout';

const Settings: React.FC = () => {
    return (
        <Layout
            title="Configuración"
            leftIcon
            rightIcon
        >
            <View style={{ padding: 20 }}>
                <Text>Configuración de la app...</Text>
            </View>
        </Layout>
    );
};

export default Settings;