import React,{useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet,Platform} from 'react-native';
import FavoritesCard from '../components/FavoritesCard';
import Loading from '../components/Loading';
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';
import {firebase_db} from "../firebaseConfig"

export default function FavoritesPage({navigation,route}){
    
    const [mbti, setMbti] = useState([])
    const [ready,setReady] = useState(true)

    useEffect(()=>{
        navigation.setOptions({
            title:'Favorties'
        })
        getFavorites()
    },[])

    const getFavorites = async () => {
        let userUniqueId;
        if (isIOS) {
            let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        } else {
            userUniqueId = await Application.androidId
        }

        console.log(userUniqueId)
        firebase_db.ref('/Favorites/' + userUniqueId).once('value').then((snapshot) => {
            console.log("Data from Firebase!");
            let mbti = snapshot.val();
            if (mbti) {
                let mbti_list = Object.values(mbti);
                setMbti(mbti_list);
            }
            setReady(false);
        });
    }

    return (
        <ScrollView style={styles.container}>
           {
               mbti.map((content,i)=>{
                   return(<FavoritesCard key={i} content={content} navigation={navigation} mbti={mbti} setMbti={setMbti}/>)
               })
           }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff"
    }
})