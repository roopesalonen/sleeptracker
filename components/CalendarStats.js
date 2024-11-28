import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ref, onValue } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { format } from 'date-fns';


const CalendarStats = () => {
    const [markedDates, setMarkedDates] = useState({});
    const [sleepData, setSleepData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            // If user is authed
            if (auth.currentUser) {
                // Save snapshot from database as data
                onValue(ref(database, `users/${auth.currentUser.uid}/sleep`), (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const formattedData = Object.keys(data).map((date) => ({
                            // Format date to correctly work on calendar
                            date: formatDate(date),
                            hours: data[date].hours,
                            minutes: data[date].minutes,
                        }));
                        setSleepData(formattedData);
                    }
                });
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const dates = {};
        sleepData.forEach((item) => {
            dates[item.date] = {
                customStyles: {
                    container: {
                        backgroundColor: getBackgroundColor(item.hours),
                    },
                    text: {
                        color: '#ffffff',
                    },
                },
            };
        });
        setMarkedDates(dates);
    }, [sleepData]);

    // Color by sleep hours
    const getBackgroundColor = (hours) => {
        if (hours >= 8) return '#2389fc';
        if (hours >= 6) return '#0077ff';
        if (hours >= 4) return '#005dc7';
        if (hours >= 2) return '#004a9e';
    };

    const handleDayPress = (day) => {
        const sleepRecord = sleepData.find((item) => item.date === day.dateString);
        const formattedDate = format(new Date(day.dateString), 'EEEE, MMMM dd, yyyy');

        if (sleepRecord) {
            const { hours, minutes } = sleepRecord;
            Alert.alert(
                formattedDate, `Sleep time ${hours} hours ${minutes} minutes.`);
        } else {
            Alert.alert(formattedDate, 'No sleep data for this day.');
        }
    };

    return (
        <View style={styles.container}>
            <Calendar
                markingType={'custom'}
                markedDates={markedDates}
                onDayPress={handleDayPress}
                theme={{
                    calendarBackground: '#011c3b',
                    textSectionTitleColor: '#ffffff',
                    dayTextColor: '#ffffff',
                    todayTextColor: '#ffffff',
                    textDisabledColor: '#2d4150',
                    arrowColor: '#ffffff',
                    monthTextColor: '#ffffff',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textMonthFontWeight: 'bold',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default CalendarStats;
