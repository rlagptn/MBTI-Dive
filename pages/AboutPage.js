import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import { StatusBar } from 'expo-status-bar';

export default function AboutPage({ navigation, route }) {
    const aboutImage = "https://firebasestorage.googleapis.com/v0/b/mbti-dive.appspot.com/o/images%2FMain.jpeg?alt=media&token=4c123702-8884-4710-ae12-6a8678e59bba"

    const handlePress = () => {
        Linking.openURL('https://www.16personalities.com/');
    };

    useEffect(() => {
        navigation.setOptions({
            title: "About MBTI",
            headerStyle: {
                backgroundColor: '#1F266A',
                shadowColor: "#1F266A",
            },
            headerTintColor: "#fff",
        })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>What is 'MBTI'?</Text>


            <View style={styles.textContainer}>
                <Image style={styles.aboutImage} source={{ uri: aboutImage }} resizeMode={"contain"} />
                <Text style={styles.desc01}>'MBTI' is a personality inventory that classifies individuals into 16 types.</Text>
                <Text style={styles.desc02}>It is based on preferences in four dimensions: Extraversion-Introversion, Sensing-Intuition, Thinking-Feeling, and Judging-Perceiving.</Text>
                <Text style={styles.desc03}>Understanding MBTI can help in recognizing and appreciating different personality traits in oneself and others.</Text>
                <Text style={styles.desc04}>For more detailed information, please refer to the website by clicking the button below.</Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>16Personalities</Text>
                </TouchableOpacity>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F266A",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#fff",
        paddingLeft: 30,
        paddingTop: 50,
        paddingRight: 30
    },
    textContainer: {
        width: 300,
        height: 500,
        backgroundColor: "#fff",
        marginTop: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    aboutImage: {
        width: 280,
        height: 180
    },
    desc01: {
        fontSize: 17,
        fontWeight: "700",
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 15
    },
    desc02: {
        fontSize: 15,
        fontWeight: "650",
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 10
    },
    desc03: {
        fontSize: 15,
        fontWeight: "650",
        padding: 10
    },
    desc04: {
        fontSize: 15,
        fontWeight: "650",
        padding: 5,
        color: "gray"
    },
    button: {
        backgroundColor: "orange",
        padding: 20,
        borderRadius: 15,
        marginTop: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700"
    }
})