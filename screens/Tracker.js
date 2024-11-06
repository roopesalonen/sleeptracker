import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from '../components/Weather';

export default function Tracker() {
    return (
        <View style={styles.container}>
            <View style={{flex: 1, width: "100%", backgroundColor: "#abc"}}>
                <Weather/>
            </View>
            <View style={{flex: 1}}>
                <Text>2</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>3</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
