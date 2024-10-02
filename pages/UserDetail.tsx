import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RouteStackParamList from "../routes/routePage";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { View, Image } from "react-native";
import styles from "../styles";

type props = NativeStackScreenProps<RouteStackParamList, "email">;

export function UserDetail({route, navigation}: props){
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Card 
                style={{
                    width: "50%",
                }}
                contentStyle={[styles.container]}
            
            >
                <Card.Title 
                    titleVariant="titleLarge"
                    title={route.params.name}
                />
                <Card.Content>
                    <Image 
                        source={{uri: route.params.photo_url}} 
                        style={{width: 200, height: 200, borderRadius: 999}}
                    />
                    <Text 
                        variant="labelMedium"
                        style={[styles.textCenter, styles.muted, styles.padding]}
                    >
                        {route.params.email}
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={navigation.goBack}>Go Back</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

export default UserDetail;