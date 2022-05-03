import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Text,Image,ImageBackground} from 'react-native';
import imagesPage from '../../assets/PageSimple/imagesPages.js'

class PageSimple extends React.Component{
  render(){
    const props = this.props;
    return(
      <ImageBackground style={styles.ImageBackground} resizeMode = 'cover' source = {require('../../assets/Accueil/binaryBackground.png')}>
        <View style = {styles.titre}>
          <Text style = {styles.text}>{props.titre}</Text>
        </View>
        <View style = {styles.reste}>
          {imagesPage[props.id] != undefined &&
            <Image style = {styles.image} source = {imagesPage[props.id]}/>
          }
          <Text style = {styles.description}>{props.description}</Text>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  ImageBackground:{
    flex : 1,
  },
  titre:{
    justifyContent : 'center',
    height : 100,
    alignItems : 'center',
  },
  text:{
    textAlign : 'center',
    color : '#FEE600',
    fontWeight: 'bold',
    fontSize : 40,
    margin : 5,
  },
  image : {
    resizeMode : 'contain',
    alignSelf : 'center',
    margin : 10,
  },
  description : {
    color : 'white',
    fontSize : 20,
    marginHorizontal : 5,
    marginBottom : 10,
    textAlign : 'center'
  }
})
export default PageSimple
