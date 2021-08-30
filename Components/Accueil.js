import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View ,Pressable,ImageBackground,TouchableOpacity,Image} from 'react-native';
import i18n from '../Language/Translate'


class Acceuil extends React.Component{
  render(){
    const changeLangue = (lng) => {
      i18n.locale = lng
      this.forceUpdate()
    }

    return (
        <ImageBackground style={styles.ImageBackground} resizeMode = 'contain' source = {require('../assets/Accueil/affiche.png')}>
        <View style={styles.main_top}>
          <TouchableOpacity style = {styles.icon} onPress={() => {changeLangue("fr-FR")}}>
            <Image style={styles.image} source = {require('../assets/Accueil/france.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.icon} onPress={() => {changeLangue("en")}}>
            <Image style={styles.image} source = {require('../assets/Accueil/united-kingdom.png')}/>
          </TouchableOpacity>
          <Text style={styles.text}></Text>
        </View>
        <View style = {styles.main_bottom}>
          <Pressable style={styles.button_Frise} onPress = {() => {this.props.navigation.navigate("Frise")}}>
            <Text style={styles.text_button}> {i18n.t('acceuilBoutonFrise')} </Text>
          </Pressable>
          <Pressable style={styles.button_Video} onPress = {() => {this.props.navigation.navigate("ListeVideo")}}>
            <Text style={styles.text_button}> {i18n.t('acceuilBoutonVideo')} </Text>
          </Pressable>
          <Pressable style={styles.button_Contact} onPress = {() => {this.props.navigation.navigate("APropos")}}>
            <Text style={styles.text_button}> {i18n.t('acceuilBoutonContact')} </Text>
          </Pressable>
        </View>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  ImageBackground:{
    flex : 1,
    backgroundColor : 'black'

  },
  main_top:{
    flex : 1
  },
  icon:{
    top : 40,
    marginLeft: 10,
    width:40,
    height:40
  },
  image:{
    width:40,
    height:40
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
    borderRadius : 10,
    width : 200,
    height : 50,
    marginVertical : 5,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center'
  },
  button_Video:{
    backgroundColor : 'white',
    borderRadius : 10,
    width : 200,
    height : 50,
    marginVertical : 5,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center'
  },
  button_QRCode:{
    backgroundColor : 'white',
    borderRadius : 10,
    width : 200,
    height : 50,
    marginVertical : 5,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center'
  },
  button_Contact:{
    backgroundColor : 'white',
    borderRadius : 10,
    width : 200,
    height : 50,
    marginVertical : 5,
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
