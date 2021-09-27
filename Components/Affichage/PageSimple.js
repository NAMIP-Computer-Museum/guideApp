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
          {imagesPage[props.id] != undefined &&
            <Image style = {styles.image} source = {imagesPage[props.id]}/>
          }
          <Text style = {styles.description}>{props.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    backgroundColor : 'black',
  },
  titre:{
    justifyContent : 'center',
    height : 80,
    alignItems : 'center',
    borderLeftWidth : 2,
    borderRightWidth :2,
    borderBottomWidth : 2,
    borderColor : 'white'
  },
  text:{
    textAlign : 'center',
    color : 'white',
    fontWeight: 'bold',
    fontSize : 30,
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
    marginBottom : 10
  }
})
export default PageSimple
