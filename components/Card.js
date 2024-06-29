import React from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";

export default function Card({content,navigation}){
    return (
        <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('DetailPage',{idx:content.idx})}}>
            <Image style={styles.cardImage} source={{uri:content.image}}/>
            <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={5}>{content.desc}</Text>
                <Text style={styles.cardCelebs} numberOfLines={1}>{content.celebs}</Text>
            </View>
        </TouchableOpacity>
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
        marginTop:10,
        fontSize:15
      },
      cardCelebs: {
        marginTop:10,
        fontSize:15,
        color:"green",
      }    
  })