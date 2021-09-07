import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View ,Pressable,ImageBackground,TouchableOpacity,Image} from 'react-native';
import i18n from '../Language/Translate'

class Acceuil extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      locale : "fr-FR"
    }
  }

  changeLangue = () =>{
    i18n.locale = this.state.locale;
    this.forceUpdate()
  }


  render(){
    return (
        <ImageBackground style={styles.ImageBackground} resizeMode = 'contain' source = {require('../assets/Accueil/affiche.jpg')}>
        <View style={styles.main_top}>
        </View>
        <View style={styles.main_middle}>
          <TouchableOpacity style = {styles.icon} onPress={() => {this.setState({locale : "fr-FR"},() => {this.changeLangue()})}}>
            <Image style={styles.image} source = {require('../assets/Accueil/france.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.icon} onPress={() => {this.setState({locale : "en"},() => {this.changeLangue()})}}>
            <Image style={styles.image} source = {require('../assets/Accueil/united-kingdom.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.icon} onPress={() => {this.setState({locale : "nl-NL"},() => {this.changeLangue()})}}>
            <Image style={styles.image} source = {require('../assets/Accueil/netherlands.png')}/>
          </TouchableOpacity>
        </View>
        <View style = {styles.main_bottom}>
          <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("Introduction")}}>
            <Text style={styles.text_button}> {i18n.t('accueilBoutonIntro')} </Text>
          </Pressable>
          <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("Frise")}}>
            <Text style={styles.text_button}> {i18n.t('accueilBoutonFrise')} </Text>
          </Pressable>
          <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("ListeVideo")}}>
            <Text style={styles.text_button}> {i18n.t('accueilBoutonVideo')} </Text>
          </Pressable>
          <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("APropos")}}>
            <Text style={styles.text_button}> {i18n.t('accueilBoutonContact')} </Text>
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
    flex : 2,
  },
  main_middle:{
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'flex-end'
  },
  icon:{
    marginBottom : 10,
    marginLeft: 5,
    width:50,
    height:35,
    borderWidth : 3,
    borderColor : 'white',
    borderRadius : 25
  },
  image:{
    width:40,
    height:30,
    resizeMode : 'contain'
  },
  main_bottom:{
    flex : 3,
    alignItems : 'center'
  },
  button:{
    backgroundColor : 'white',
    borderRadius : 10,
    width : 200,
    height : 50,
    marginVertical : 5,
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
