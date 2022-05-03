import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,Modal,ScrollView, Text, View,Pressable,Image,TouchableOpacity} from 'react-native';
import Legende from './Legende.js'
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import images from '../../assets/database/Images/images.js'
import videos from '../../assets/database/Videos/ListeVideosFr.js'
import i18n from '../../Language/Translate'

class DetailExpop extends React.Component{
  constructor(props){
    super(props);
    this.state={
      video:false,
      dataVideo : [],
      ordinateur : this.props.navigation.state.params.dataOrdinateur,
      modal : false,
      donneesModal : null,
      precedantPage : this.props.navigation.state.params.precedantPage
    }
    console.log("Valeur de la props ordinateur : ")
    console.log(this.state.ordinateur)
    this.testDonneeVideo();
  }

  //Fonction qui vérifie si une vidéo est disponible pour l'objet
  //Parcours des objets du tableau vidéos à la recherche d'une possédant le même id que l'objet courant
  testDonneeVideo = () =>{
    const ordinateurID = this.props.navigation.state.params.dataOrdinateur.id;
    for(let i = 0;i<videos.length;i++){
      if(videos[i].id == ordinateurID){
        this.state.video = true
        this.state.dataVideo = videos[i];
        break;
      }
    }
  }

  //Fonction qui gère l'affichage de la description en traitant les potentiels mots clés
  traiterDescription = (description,index) =>{
      return <Text key = {index} style = {styles.description}>{description}</Text>
  }

  render(){
    return(
      <View style = {{
        flex:1,
        backgroundColor : '#b42e32'
      }}>
        <ScrollView>
          <TouchableOpacity style={styles.photo} onPress = {() => {this.props.navigation.navigate("Image",{id : this.state.ordinateur.id})}}>
            <Image style={styles.image} source = {images[this.state.ordinateur.id]}/>
          </TouchableOpacity>
          <View style={styles.ligne}/>
          <Text style = {styles.titre}>{this.state.ordinateur.title}</Text>
          <View style={styles.ligne}/>
          <View>
            <Text style = {styles.text}></Text>
          </View>
          <Text style = {styles.description}>{this.state.ordinateur.description}</Text>
          {this.state.video &&
            <View style={styles.multimedia}>
              <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("AfficheVideo",{videoUrl : this.state.dataVideo.videoURL})}}>
                <Text style={styles.text_button}>Video</Text>
              </Pressable>
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_modal : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor: '#b42e32'
  },
  modal:{
    backgroundColor : 'white',
    width : "80%",
    borderRadius : 15
  },
  modal_touch : {
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center',
    margin : 5,
    width : 50,
    height : 50
  },
  modal_image:{
    margin : 5,
    resizeMode : 'contain',
    width : 50,
    height : 50
  },
  modal_title : {
    marginHorizontal : 5,
    marginTop : 5,
    fontWeight : 'bold',
    textDecorationLine: 'underline',
    fontStyle : 'italic',
  },
  modal_description :{
    margin : 5
  },
  modal_button:{
    backgroundColor : 'white',
    borderRadius : 10,
    borderWidth : 2,
    borderColor : 'lightgray',
    width : 200,
    height : 50,
    marginVertical : 5,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center'
  },
  photo:{
    resizeMode : 'contain',
    alignItems : 'center',
  },
  image:{
    resizeMode : 'contain',
    height : 275
  },
  titre:{
    margin : 20,
    marginTop : 5,
    fontSize : 25,
    fontWeight : 'bold',
    fontStyle : 'italic',
    color : 'white',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'white'
  },
  text:{
    marginLeft : 10
  },
  description:{
    marginLeft : 20,
    marginRight : 20,
    fontSize : 17,
    color : 'white',
    textAlign: 'center'
  },
  MotCle:{
    fontSize : 20,
    color : 'lightblue',
  },
  multimedia:{
    justifyContent : 'center',
  },
  button:{
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

export default DetailExpop
