import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { app, auth } from '../firebaseConfig';
import { getDatabase, ref, set } from 'firebase/database';
import { format } from 'date-fns';

export default function App() {
    const [sleepTime, setSleepTime] = useState(null);
    const [wakeTime, setWakeTime] = useState(null);
    const [sleepPicker, setSleepPicker] = useState(false);
    const [wakePicker, setWakePicker] = useState(false);
    

    const database = getDatabase(app);

    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const saveSleepData = () => {

        // Confirm user is logged in
        if (!userId) {
            Alert.alert('Error', 'User not authenticated.');
            return;
        }

        if (sleepTime && wakeTime) {

            let fixedWakeTime = new Date(wakeTime);

                // Check if wake time is before sleep time
            if (wakeTime <= sleepTime) {
                // Add one day to wake time
                fixedWakeTime.setDate(fixedWakeTime.getDate() + 1);
            }

            // Get sleep time in hours and minutes
            const sleepInMinutes = (fixedWakeTime - sleepTime) / (1000 * 60);
            const sleepInHours = sleepInMinutes / 60;
            const sleepHours = Math.floor(sleepInHours);
            const sleepMinutes = sleepInMinutes % 60;

            // DD-MM-YYYY format
            const date = format(new Date(sleepTime), 'dd-MM-yyyy');

            const sleepDataRef = ref(database, `users/${userId}/sleep/${date}`);

            // Save data
            set(sleepDataRef, {
                hours: sleepHours,
                minutes: sleepMinutes,
                onlyHours: sleepInHours,
                onlyMinutes: sleepInMinutes,
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
        // Confirm time is set
        if (event.type === 'set' && selectedDate) {
            setSleepTime(selectedDate);
        }
    };

    // Set wake time
    const onChangeWakeTime = (event, selectedDate) => {
        setWakePicker(false);
        // Confirm time is set
        if (event.type === 'set' && selectedDate) {
            setWakeTime(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Button
                    onPress={() => setSleepPicker(true)}
                    title="Choose sleep time"
                />
                {sleepPicker && (
                    <DateTimePicker
                        value={sleepTime || new Date()}
                        mode="time"
                        display="spinner"
                        onChange={onChangeSleepTime}
                    />
                )}
                <Text style={styles.time}>
                    Sleep time: {sleepTime ? sleepTime.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }) : ''}
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
                        display="spinner"
                        onChange={onChangeWakeTime}
                    />
                )}
                <Text style={styles.time}>
                    Wake time: {wakeTime ? wakeTime.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }) : ''}
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
        padding: 20,
    },
    time: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff',
    },
    pickerContainer: {
        marginBottom: 20,
        marginRight: '20%',
        marginLeft: '20%'
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
});
