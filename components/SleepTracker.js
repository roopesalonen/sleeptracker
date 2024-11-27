import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { app } from '../firebaseConfig';
import { getDatabase, ref, set } from 'firebase/database';

export default function App() {
    const [sleepTime, setSleepTime] = useState(null);
    const [wakeTime, setWakeTime] = useState(null);
    const [sleepPicker, setSleepPicker] = useState(false);
    const [wakePicker, setWakePicker] = useState(false);

    const database = getDatabase(app);

    const userId = 'testUser';

    const saveSleepData = () => {
        if (sleepTime && wakeTime) {

            // Get sleep time in hours and minutes
            const sleepOnlyMinutes = (wakeTime - sleepTime) / (1000 * 60);
            const sleepOnlyHours = (wakeTime - sleepTime) / (1000 * 60 * 60);
            const sleepHours = Math.floor(sleepOnlyMinutes / 60);
            const sleepMinutes = sleepOnlyMinutes % 60;

            // 'DD-MM-YYYY' format
            const date = new Date(sleepTime).toLocaleDateString('fi-FI').replace(/\./g, '-');

            const sleepDataRef = ref(database, `users/${userId}/sleep/${date}`);

            // Save data
            set(sleepDataRef, {
                hours: sleepHours,
                minutes: sleepMinutes,
                onlyHours: sleepOnlyHours,
                onlyMinutes: sleepOnlyMinutes,
            })
                .then(() => {
                    Alert.alert('Success', `${sleepHours} hours and ${sleepMinutes} minutes of sleep data saved.`);
                })
                .catch((error) => {
                    Alert.alert('Error', `Error saving sleep data: ${error.message}`);
                });
        } else {
            Alert.alert('Error', 'Choose sleep and wake up times.');
        }
    };

    // Set sleep time
    const onChangeSleepTime = (event, selectedDate) => {
        setSleepPicker(false);
        if (selectedDate) {
            setSleepTime(selectedDate);
        }
    };
    // Set wake time
    const onChangeWakeTime = (event, selectedDate) => {
        setWakePicker(false);
        if (selectedDate) {
            setWakeTime(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sleep Tracker</Text>

            <View style={styles.pickerContainer}>
                <Button
                    onPress={() => setSleepPicker(true)}
                    title="Choose sleep time"
                />
                {sleepPicker && (
                    <DateTimePicker
                        value={sleepTime || new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeSleepTime}
                    />
                )}
                <Text style={styles.time}>
                    Sleep time: {sleepTime ? sleepTime.toLocaleTimeString('fi-FI', {hour: '2-digit', minute: '2-digit'}) : ''}
                </Text>
            </View>

            <View style={styles.pickerContainer}>
                <Button
                    onPress={() => setWakePicker(true)}
                    title="Choose wake time"
                />
                {wakePicker && (
                    <DateTimePicker
                        value={wakeTime || new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeWakeTime}
                    />
                )}
                <Text style={styles.time}>
                    Wake time: {wakeTime ? wakeTime.toLocaleTimeString('fi-FI', {hour: '2-digit', minute: '2-digit'}) : ''}
                </Text>
            </View>

            {sleepTime && wakeTime && (
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={saveSleepData}
                        title="Save"
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    time: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    pickerContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
});
