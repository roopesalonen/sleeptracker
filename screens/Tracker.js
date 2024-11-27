import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from '../components/Weather';
import SleepTracker from '../components/SleepTracker';

export default function Tracker() {
    return (
        <View style={styles.container}>
            <View style={{flex: 1, width: "100%", backgroundColor: "#abc"}}>
                <Weather/>
            </View>
            <View style={{flex: 2}}>
                <Text><SleepTracker/></Text>
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
