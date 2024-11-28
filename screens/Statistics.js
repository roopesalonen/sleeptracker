import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ChartStats from '../components/ChartStats'
import CalendarStats from '../components/CalendarStats'

export default function Statistics() {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, width: "100%" }}>
                <CalendarStats />
            </View>
            <View style={{ flex: 1, width: "100%" }}>
                <ChartStats />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011c3b',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
