import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,ScrollView,Image,TouchableOpacity,ImageBackground} from 'react-native';
import Legende from './Legende.js'
import images from '../../assets/database/Images/images.js'


class Detail extends React.Component{
  render(){
    const ordinateur = this.props.navigation.state.params.dataOrdinateur
    return(
      <View style = {styles.main}>
          <View style={styles.ligne}/>
          <View style = {styles.photo}>
            <ImageBackground style = {styles.image} resizeMode = 'contain' source = {images[ordinateur.id]}>
              <TouchableOpacity style={styles.zoom} onPress = {() => {this.props.navigation.navigate("Image",{id : ordinateur.id})}}>
                <Image style={styles.iconZoom} source = {require('../../assets/Detail/zoom.png')}/>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.ligne}/>
          <Text style = {styles.titre}>{ordinateur.title}</Text>
          <Legende id = {ordinateur.id} type={ordinateur.TYPE} time = {ordinateur.time}/>
          <View style={styles.ligne}/>
          <View style = {styles.scroll}>
            <Text style = {styles.description}>{ordinateur.description}</Text>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor : 'black'
  },
  photo:{
    flex:4,
  },
  image:{
    flex : 1,
    justifyContent : 'flex-end'
  },
  zoom:{
    position : 'absolute',
    width : 40,
    height : 40,
    margin : 5,
  },
  iconZoom:{
    flex : 1,
    width : 40,
    height : 40,
    tintColor : 'white'
  },
  titre:{
    flex:1,
    margin : 5,
    fontSize : 30,
    fontWeight : 'bold',
    textDecorationLine : 'underline',
    fontStyle : 'italic',
    color : 'white'
  },
  scroll:{
    flex:8
  },
  description:{
    flex:1,
    fontSize : 20,
    marginVertical : 10,
    marginHorizontal : 5,
    color : 'white'
  },
  ligne:{
    borderWidth:1,
    borderColor:'white',
  },
})

export default Detail
