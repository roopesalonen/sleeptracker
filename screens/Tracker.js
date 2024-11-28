import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from '../components/Weather';
import SleepTracker from '../components/SleepTracker';

export default function Tracker() {
    return (
        <View style={styles.container}>
            <View style={{flex: 1, width: "100%", backgroundColor: "#abc"}}>
                <Text style={styles.title}>Weather</Text>
                <Weather/>
            </View>
            <View style={{flex: 2, width: "100%", backgroundColor: "#adadad"}}>
                <Text style={styles.title}>Sleep Tracker</Text>
                <SleepTracker/>
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
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20
    }
});
