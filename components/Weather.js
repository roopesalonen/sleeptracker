import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const Weather = () => {
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    //OpenWeatherMap API key
    const API_KEY = "";

    useEffect(() => {
        (async () => {
            //Request location permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            //Get location
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            //Fetch weather with coords
            if (location) {
                fetchWeather(location.coords.latitude, location.coords.longitude);
            }
        })();
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            setErrorMsg("Couldn't fetch weather data");
        }
    }

    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        )
    }

    if (!API_KEY) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Invalid API key</Text>
            </View>
        )
    }

    if (!weather) {
        return (
            <View style={styles.flexcenter}>
                <ActivityIndicator size={70} color="#005fb3" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.desc}>{weather.weather[0].description}</Text>
            <Image style={styles.icon} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    flexcenter: {
        flex: 1,
        alignItems: 'center',
    },
    temp: {
        fontSize: 30,
        color: '#ffffff'
    },
    desc: {
        fontSize: 20,
        color: '#ffffff'
    },
    icon: {
        width: 120,
        height: 120,
    },
    errorText: {
        color: 'red',
        fontSize: 20,
    },
})

export default Weather;
