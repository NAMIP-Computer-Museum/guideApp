import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {StyleSheet,View,Pressable,Text, Modal, ImageBackground} from 'react-native';
import i18n from '../../Language/Translate'

class QuizChoiceLevel extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <View style = {styles.main}>
      <ImageBackground style={styles.ImageBackground} resizeMode = 'cover' source = {require('../../assets/Accueil/binaryBackground.png')}>
        <View style={styles.centeredView}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{i18n.t("choiceLevelQuiz")}</Text>
                <View>
                <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("Quiz", {levelQuiz :"facile"})}}>
                  <Text style={styles.text_button}> {i18n.t('levelQuizFacile')} </Text>
                </Pressable>
                <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("Quiz",{levelQuiz:"difficile"})}}>
                  <Text style={styles.text_button}> {i18n.t('levelQuizDifficile')} </Text>
                </Pressable>
                </View>
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
  ImageBackground:{
    flex : 1,
    backgroundColor : 'black'

  },
  buttonNext:{
    backgroundColor : '#00C5EC',
    borderRadius : 4,
    width : 200,
    height : 45,
    marginVertical : 5,
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom: 100
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color : 'black',
    fontWeight: 'bold',
    fontSize : 30

  }
})

export default QuizChoiceLevel;
