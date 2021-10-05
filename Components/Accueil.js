import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,ScrollView, Text, View ,Pressable,ImageBackground,TouchableOpacity,Image} from 'react-native';
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import i18n from '../Language/Translate'

class Acceuil extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      locale : i18n.locale
    }
    this.clearDB()
  }

  clearDB = async() => {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + "SQLite/",{idempotent : true})
    const internalDbName = "namip.db"; // Call whatever you want
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
        await FileSystem.makeDirectoryAsync(sqlDir, {intermediates: true});
        const asset = Asset.fromModule(require("../assets/database/NAMIP.db"));
        await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }
  }

  changeLangue = (locale) =>{
    i18n.locale = locale;
    this.setState({locale : i18n.locale})
  }


  render(){
    return (
        <ImageBackground style={styles.ImageBackground} resizeMode = 'contain' source = {require('../assets/Accueil/affiche.jpg')}>
        <View style={styles.main_top}>
        </View>
        <View style={styles.main_middle}>
          <TouchableOpacity style = {styles.icon} onPress={() => {this.changeLangue("fr-FR")}}>
            <Image style={styles.image} source = {require('../assets/Accueil/france.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.icon} onPress={() => {this.changeLangue("en")}}>
            <Image style={styles.image} source = {require('../assets/Accueil/united-kingdom.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.icon} onPress={() => {this.changeLangue("nl-NL")}}>
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
          <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("Quiz")}}>
            <Text style={styles.text_button}> {i18n.t('accueilBoutonQuiz')} </Text>
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
    marginHorizontal : 5,
    width:60,
    height:40,
    borderWidth : 3,
    borderColor : 'white',
    borderRadius : 25,
  },
  image:{
    width : 50,
    height : 35,
    resizeMode : 'contain',
    alignSelf : 'center'
  },
  main_bottom:{
    flex : 3,
    alignItems : 'center',
  },
  button:{
    backgroundColor : 'white',
    borderRadius : 10,
    width : 200,
    height : 45,
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
