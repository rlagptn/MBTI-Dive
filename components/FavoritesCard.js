import React from 'react';
import {Alert,View, Image, Text, StyleSheet,TouchableOpacity,Platform} from 'react-native'
import {firebase_db} from "../firebaseConfig"
const isIOS = Platform.OS === 'ios';
import * as Application from 'expo-application';
export default function FavoritesCard({content,navigation,mbti,setMbti}){

    const detail = () => {
        navigation.navigate('DetailPage',{idx:content.idx})
    }

    const remove = async (cidx) => {
      let userUniqueId;
      if (isIOS) {
        let iosId = await Application.getIosIdForVendorAsync();
          userUniqueId = iosId
      } else {
          userUniqueId = await Application.androidId
      }

      console.log(userUniqueId)
      firebase_db.ref('/Favorites/'+userUniqueId+'/'+cidx).remove().then(function(){
        Alert.alert("It is removed.");
        let result = mbti.filter((data,i)=>{
          return data.idx !== cidx
        })
        console.log(result)
        setMbti(result)
      })
    }

    return(
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri:content.image}}/>
            <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={5}>{content.desc}</Text>
                <Text style={styles.cardCelebs} numberOfLines={1}>{content.celebs}</Text>
                
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={()=>detail()}><Text style={styles.buttonText}>More Info</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>remove(content.idx)}><Text style={styles.buttonText}>Remove</Text></TouchableOpacity>
              
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10
    },
    cardImage: {
        flex:1,
        width:50,
        height:145
    },
    cardText: {
      flex:2,
      flexDirection:"column",
      marginLeft:10,
    },
    cardTitle: {
      fontSize:20,
      fontWeight:"700"
    },
    cardDesc: {
      marginTop:3,
      fontSize:15
    },
    cardCelebs: {
        marginTop:7,
        fontSize:11,
        color:"green",
    },
    buttonGroup: {
        flexDirection:"row",
    },
    button:{
        width:100,
        marginTop:20,
        marginRight:10,
        marginLeft:10,
        padding:10,
        borderWidth:1,
        borderColor:'deeppink',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:7
    },
    buttonText:{
        color:'deeppink',
        textAlign:'center'
    }
});