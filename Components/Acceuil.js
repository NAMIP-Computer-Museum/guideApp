import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View ,Pressable,ImageBackground} from 'react-native';
import {IconButton} from 'react-native-paper'
import i18n from '../Language/Translate'

//Alors bonjour

class Acceuil extends React.Component{
  render(){
    const changeLangue = (lng) => {
      i18n.locale = lng
      this.forceUpdate()
    }

    return (
        <ImageBackground style={styles.image} source = {require('./fond.jpg')}>
        <View style={styles.main_top}>
          <IconButton style={styles.icon} size={30} color='white' icon={require('./fr.png')} onPress={() => {changeLangue("fr-FR")}}/>
          <IconButton style={styles.icon} size={30} color='white' icon={require('./en.png')} onPress={() => {changeLangue("en")}}/>
          <Text style={styles.text}>{i18n.t('acceuilTitre')} </Text>
        </View>
        <View style = {styles.main_bottom}>
          <Pressable style={styles.button_Frise} onPress = {() => {this.props.navigation.navigate("Frise")}}>
            <Text style={styles.text_button}> {i18n.t('acceuilBoutonFrise')} </Text>
          </Pressable>
          <Pressable style={styles.button_Video} onPress = {() => {this.props.navigation.navigate("ListeVideo")}}>
            <Text style={styles.text_button}> {i18n.t('acceuilBoutonVideo')} </Text>
          </Pressable>
        </View>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  image:{
    flex : 1,
  },
  main_top:{
    flex : 1
  },
  icon:{
    top : 30,
  },
  text:{
    fontSize : 40,
    top : 50,
    fontWeight : 'bold',
    color : 'white',
    textAlign : 'center',
  },
  main_bottom:{
    flex : 1,
  },
  button_Frise:{
    backgroundColor : 'white',
    borderRadius : 6,
    width : 200,
    height : 50,
    top : 100,
    marginVertical : 10,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center'
  },
  button_Video:{
    backgroundColor : 'white',
    borderRadius : 6,
    width : 200,
    height : 50,
    top:100,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center'
  },
  text_button:{
    textAlign : 'center',
    fontSize : 20,
    fontWeight : 'bold'
  }
})

export default Acceuil
