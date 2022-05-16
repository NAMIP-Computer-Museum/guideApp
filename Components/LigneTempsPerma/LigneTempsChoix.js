import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {StyleSheet,View,Pressable,Text, Modal, ImageBackground} from 'react-native';
import i18n from '../../Language/Translate'

class LigneTempsChoix extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <View style = {styles.main}>
        <ImageBackground style={styles.ImageBackground} resizeMode = 'cover' source = {require('../../assets/Accueil/binaryBackground.png')}>
        <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Lignes du temps</Text>
                <View>
                <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("LigneTempsPerma")}}>
                  <Text style={styles.text_button}> Permanente </Text>
                </Pressable>
                <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("Frise")}}>
                  <Text style={styles.text_button}> Micro-Ordinateurs </Text>
                </Pressable>
                </View>
              </View>
        </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main : {
    flex : 1,
  },
  button:{
    backgroundColor : '#822125',
    borderRadius : 15,
    width : 200,
    height : 45,
    marginVertical : 5,
    justifyContent : 'center',
    alignItems : 'center',
    marginTop: 10
  },
  text_button:{
    textAlign : 'center',
    fontSize : 20,
    color : 'white'
  },
  titre:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderBottomWidth : 2,
    borderRightWidth : 2,
    borderLeftWidth : 2,
    borderColor : 'white'
  },
  text:{
    textAlign : 'center',
    color : 'white',
    fontWeight: 'bold',
    fontSize : 20,
    margin : 5,
  },
  centeredView: {
  flex: 5,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
},
 modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#0000",
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
ImageBackground:{
  flex : 1,
},
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color : 'black',
    fontWeight: 'bold',
    fontSize : 30

  }
})

export default LigneTempsChoix;
