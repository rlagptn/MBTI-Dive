import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as Location from "expo-location";
import axios from "axios";
import { firebase_db } from "../firebaseConfig";
import Card from '../components/Card';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';

const main = 'https://i.ibb.co/0GPdWgF/MBTI-Dive.png';
import data from '../data.json';

export default function MainPage({ navigation, route }) {
  const [state, setState] = useState([]);
  const [cateState, setCateState] = useState([]);
  const [weather, setWeather] = useState({
    temp: 0,
    condition: ''
  });
  const [ready, setReady] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });

    setTimeout(() => {
      firebase_db.ref('/mbti').once('value').then((snapshot) => {
        console.log("Data from Firebase")
        let tip = snapshot.val();
        setState(tip);
        setCateState(tip);
        getLocation();
        setReady(false);
      });
    }, 1000);
  }, []);

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const locationData = await Location.getCurrentPositionAsync();
      const latitude = locationData.coords.latitude;
      const longitude = locationData.coords.longitude;
      const API_KEY = process.env.API_KEY;
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const temp = result.data.main.temp;
      const condition = result.data.weather[0].main;

      setWeather({
        temp,
        condition
      });

    } catch (error) {
      Alert.alert("The location cannot be found.", "Turn the app off and on again.");
    }
  };

  const category = (cate) => {
    if (cate == "All") {
      setCateState(state);
    } else {
      setCateState(state.filter((d) => {
        return d.category == cate;
      }));
    }
  };

  return ready ? <Loading /> : (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.weatherContainer}>
        <Text style={styles.weather}>Weather: {weather.temp + '°C  | ' + weather.condition} </Text>
        <TouchableOpacity style={styles.aboutButton} onPress={() => { navigation.navigate('AboutPage') }}>
          <Text style={styles.aboutButtonText}>About MBTI</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.mainImage} source={{ uri: main }} />
      <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
        <TouchableOpacity style={styles.middleButtonAll} onPress={() => { category('All') }}><Text style={styles.middleButtonTextAll}>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton01} onPress={() => { category('Analysts') }}><Text style={styles.middleButtonText}>Analysts</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton02} onPress={() => { category('Diplomats') }}><Text style={styles.middleButtonText}>Diplomats</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton03} onPress={() => { category('Sentinels') }}><Text style={styles.middleButtonText}>Sentinels</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton04} onPress={() => { category('Explorers') }}><Text style={styles.middleButtonText}>Explorers</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton05} onPress={() => { navigation.navigate('FavoritesPage') }}><Text style={styles.middleButtonText}>Favorites</Text></TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
        {cateState.map((content, i) => {
          return (<Card content={content} key={i} navigation={navigation} />)
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 50
  },
  weather: {
    alignSelf: "flex-start",
    fontWeight: "600",
    fontSize: 15,
    padding: 9,
    color: "gray"
  },
  aboutButton: {
    backgroundColor: "#F5DEB3",
    width: 100,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFE4B5",
    alignSelf: "flex-start"
  },
  aboutButtonText: {
    color: "#8B4513",
    textAlign: "center",
    marginTop: 10
  },
  mainImage: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    alignSelf: "center"
  },
  middleContainer: {
    marginTop: 20,
    marginLeft: 10,
    height: 60
  },
  middleButtonAll: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#ffa07a",
    borderRadius: 15,
    margin: 7
  },
  middleButton01: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#b19cd9",
    borderRadius: 15,
    margin: 7
  },
  middleButton02: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderRadius: 15,
    margin: 7
  },
  middleButton03: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#aed9e0",
    borderRadius: 15,
    margin: 7
  },
  middleButton04: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fdc453",
    borderRadius: 15,
    margin: 7
  },
  middleButton05: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#f886a8",
    borderRadius: 15,
    margin: 7
  },
  middleButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },
  middleButtonTextAll: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },
  cardContainer: {
    marginTop: 10,
    marginLeft: 10
  }
});
