import { View, Text } from "react-native";
import { Layout } from "../../components/Layout";


const Call = () => {
    return (
        <Layout
            title="Llamadas"
            leftIcon
            rightIcon
        >
            <View >
                <Text>Call Screen</Text>
            </View>
        </Layout>
    );
}

export default Call;