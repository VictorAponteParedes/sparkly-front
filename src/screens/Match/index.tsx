import { View, Text } from "react-native";
import { Layout } from "../../components/Layout";


const Match = () => {
    return (
        <Layout
            title="Matchs"
            leftIcon
            rightIcon
        >
            <View>
                <Text style={{ color: 'red' }}>Match Screen</Text>
            </View>
        </Layout>
    );
}

export default Match;