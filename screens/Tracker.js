import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Weather from '../components/Weather';
import SleepTracker from '../components/SleepTracker';

export default function Tracker() {
    return (
        <View style={styles.container}>
            <View style={styles.upperSection}>
                <Text style={styles.title}>Weather</Text>
                <Weather/>
            </View>
            <View style={styles.lowerSection}>
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
        backgroundColor: "#011c3b",
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    upperSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerSection: {
        flex: 1,
        alignItems: 'center',
    },
});
