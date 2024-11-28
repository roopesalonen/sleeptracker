import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ref, onValue } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import { format, subDays } from 'date-fns';

export default function SleepChart () {
    const [sleepData, setSleepData] = useState({
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
    });
    const [averageSleep, setAverageSleep] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            // If user is authed
            if (auth.currentUser) {
                // Save snapshot from database as data
                onValue(ref(database, `users/${auth.currentUser.uid}/sleep`), (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const labels = [];
                        const sleepHours = [];
                        // Get dates by looping days from farthest to current
                        for (let i = 6; i >= 0; i--) {
                            const date = format(subDays(new Date(), i), 'dd-MM-yyyy');
                            // Adds shortened versions of the day names to labels array
                            labels.push(format(subDays(new Date(), i), 'EEE'));
                            // Push data to sleepHours array if date found and onlyHours is number
                            if (data[date] && typeof data[date].onlyHours === 'number') {
                                sleepHours.push(data[date].onlyHours);
                            } else {
                                // Push 0 if no data
                                sleepHours.push(0);
                            }
                        }
                        setSleepData({
                            labels,
                            datasets: [{ data: sleepHours }],
                        });

                        // Excluding days with 0 hours
                        const countedSleepHours = sleepHours.filter(hours => hours > 0);

                        // Calculate total sleep hours in array
                        const totalSleep = countedSleepHours.reduce((sum, hours) => sum + hours, 0);
                        // Calculate average sleep hours with decimals
                        const averageDecimal = countedSleepHours.length > 0 ? totalSleep / countedSleepHours.length : 0;

                        // Calculate hours and minutes separately
                        const hours = Math.floor(averageDecimal);
                        const minutes = Math.round((averageDecimal - hours) * 60);
                        setAverageSleep({ hours, minutes });
                    }
                });
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <LineChart style={styles.chart}
                data={sleepData}
                width={Dimensions.get('window').width}
                height={250}
                yAxisInterval={1}
                withHorizontalLabels={false}

                chartConfig={{
                    backgroundGradientFrom: '#011c3b',
                    backgroundGradientTo: '#011c3b',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                // Render hours and minutes slept to the chart
                renderDotContent={({ x, y, index }) => {
                    // Convert total hours to hours and minutes
                    const totalHours = sleepData.datasets[0].data[index];
                    const hours = Math.floor(totalHours);
                    const minutes = Math.round((totalHours - hours) * 60);
                    return (
                        <Text
                            key={index}
                            style={{
                                position: 'absolute',
                                top: y - 20,
                                left: x - 10,
                                color: '#ffffff',
                                fontSize: 10,
                            }}>
                            {hours}h {minutes}m
                        </Text>
                    )
                }
                }
            />
            <Text style={styles.text}>
                Past week average sleep time: {averageSleep.hours}h {averageSleep.minutes}m
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chart: {
        marginLeft: -40,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#ffffff',
        textAlign: 'center'
    },
});
