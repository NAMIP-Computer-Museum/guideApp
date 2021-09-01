import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';
import imagesPage from '../../assets/PageSimple/imagesPages.js'

class PageSimple extends React.Component{
  render(){
    const props = this.props;
    return(
      <View style  = {styles.main}>
        <View style = {styles.titre}>
          <Text style = {styles.text}>{props.titre}</Text>
        </View>
        <View style = {styles.reste}>
          <Image style = {styles.image} source = {imagesPage[props.id]}/>
          <Text style = {styles.description}>{props.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex : 1,
    backgroundColor : 'black',
  },
  titre:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 2,
    borderColor : 'white'
  },
  text:{
    textAlign : 'center',
    color : 'white',
    fontWeight: 'bold',
    fontSize : 30,
    margin : 5,
  },
  reste : {
    flex : 9
  },
  image : {
    resizeMode : 'contain',
    alignSelf : 'center',
    margin : 5,
    width : 100,
    height : 100
  },
  description : {
    color : 'white',
    fontSize : 20,
    marginHorizontal : 5
  }
})
export default PageSimple
