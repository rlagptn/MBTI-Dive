import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, Share, Platform } from 'react-native';
import * as Linking from 'expo-linking';
import {firebase_db} from "../firebaseConfig"
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';

export default function DetailPage({navigation,route}) {

    // Initial value settings to prevent errors
    const [mbti, setMbti] = useState({
            "idx":0,
            "category":"Analysts",
            "title":"Architect",
            "image": "https://i.ibb.co/7JRCXSF/INTJ.png",
            "desc":"INTJ (Architect) is a personality type with the Introverted, Intuitive, Thinking, and Judging traits. These thoughtful tacticians love perfecting the details of life, applying creativity and rationality to everything they do. Their inner world is often a private, complex one.",
            "celebs":"Elon Musk, Hillary Clinton, Mark Zuckerberg, Arnold Schwarzenegger, Samantha Power"
        })

    useEffect(()=>{
        console.log(route)
        navigation.setOptions({
            title:route.params.title,
            headerStyle: {
                backgroundColor: '#000',
                shadowColor: "#000",
            },
            headerTintColor: "#fff",
        })
        const { idx } = route.params;
        firebase_db.ref('/mbti/'+ idx).once('value').then((snapshot) => {
            let mbti = snapshot.val();
            setMbti(mbti)
        });
    },[])

    const Favorites = async () => {
        let userUniqueId;
        if(isIOS) {
            let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        } else {
            userUniqueId = await Application.androidId
        }

        console.log(userUniqueId)
	       firebase_db.ref('/Favorites/'+userUniqueId+'/'+ mbti.idx).set(mbti,function(error) {
             console.log(error)
             Alert.alert("Added to Favorites!")
         });
    }

    const share = () => {
        Share.share({
            message:`${mbti.title} \n\n ${mbti.desc} \n\n ${mbti.celebs} \n\n ${mbti.image}`,
        });
    }

    const link = () => {
        Linking.openURL("https://www.16personalities.com/")
    }

    return ( 
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={{uri:mbti.image}}/>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{mbti.title}</Text>
                <Text style={styles.desc}>{mbti.desc}</Text>
                <Text style={styles.celebs}>{mbti.celebs}</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={()=>Favorites()}><Text style={styles.buttonText}>Add to Favorites</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>share()}><Text style={styles.buttonText}>Share</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>link()}><Text style={styles.buttonText}>More Info</Text></TouchableOpacity>
                </View>
            
            </View>

        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#000"
    },
    image:{
        height:250,
        margin:100,
        marginTop:50,
        marginBottom:10,
        borderRadius:30
    },
    textContainer:{
        padding:20,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontSize:20,
        fontWeight:'700',
        color:"#eee"
    },
    desc:{
        fontSize:17,
        marginTop:18,
        color:"#eee"
    },
    celebs:{
        fontSize:18,
        marginTop:15,
        color:"skyblue"
    },
    buttonGroup: {
        flexDirection:"row",
        marginTop:10
    },
    button:{
        width:100,
        marginTop:20,
        marginRight:10,
        marginLeft:10,
        padding:10,
        borderWidth:1,
        borderColor:'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:7
    },
    buttonText:{
        color:'#fff',
        textAlign:'center'
    }
})