import { View, Text } from "react-native";
import { Layout } from "../../components/Layout";


const Profile = () => {
    return (
        <Layout
            title="Mi perfil"
            leftIcon
            rightIcon
        >
            <View>
                <Text style={{ color: 'red' }}>Profile Screen</Text>
            </View>
        </Layout>
    );
}

export default Profile;