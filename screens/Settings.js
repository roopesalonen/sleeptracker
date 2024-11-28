import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { logoutAuth } from '../components/Auth';

export default function Settings() {

    const handleLogout = logoutAuth();

    return (
        <View style={styles.container} >
            <View style={styles.container}>
                <Button title="Log out" onPress={handleLogout} />
            </View>
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#011c3b',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
