import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,Modal,ScrollView, Text, View,Pressable,Image,TouchableOpacity,ImageBackground} from 'react-native';
import Legende from './Legende.js'
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import images from '../../assets/database/Images/images.js'
import videos from '../../assets/database/Videos/ListeVideosFr.js'
import i18n from '../../Language/Translate'

class Detail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      video:false,
      dataVideo : [],
      ordinateur : this.props.navigation.state.params.dataOrdinateur,
      description : this.props.navigation.state.params.dataOrdinateur.descMotCle.split("|"),
      motCle : this.props.navigation.state.params.motCle,
      modal : false,
      donneesModal : null,
      precedantPage : this.props.navigation.state.params.precedantPage
    }
    this.testDonneeVideo();
  }

  //Fonction qui vérifie si une vidéo est disponible pour l'objet
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
    if(isNaN(description) == true){
      return <Text key = {index} style = {styles.description}>{description}</Text>
    }
    else{
      let indexDesc = parseInt(description);
      let texte;
      let tableauMotCle = [...this.state.motCle]
      for(let i=0;i<tableauMotCle.length;i++){
        if(tableauMotCle[i].IDMotCle == indexDesc && this.state.ordinateur.id == tableauMotCle[i].IDObjetDesc && tableauMotCle[i].MotCle != this.state.precedantPage){
          texte = tableauMotCle[i].MotCle
        }
        else if (tableauMotCle[i].IDMotCle == indexDesc && this.state.ordinateur.id == tableauMotCle[i].IDObjetDesc && tableauMotCle[i].MotCle === this.state.precedantPage){
          texte = tableauMotCle[i].MotCle
          return <Text key = {index} style = {styles.description}>{texte}</Text>
        }
      }
      return <Text key = {index} onPress = {() => {this.showModal(indexDesc)}} style = {styles.MotCle}>{texte}</Text>
    }
  }

  //Renvoie la requete à executer pour récupérer les données du mot clé cliqué
  getRequete = () =>{
    let requete;
    switch(i18n.locale){
      case "en":
        requete = "SELECT ID as id,TYPE,Annee as 'time',Nom as title,DescEN as description,DescMotEN as descMotCle FROM GENERAL "+
                  "WHERE ID = ?";
        break;
      case "nl-NL":
        requete = "SELECT ID as id,TYPE,Annee as 'time',Nom as title,DescNL as description,DescMotNL as descMotCle FROM GENERAL "+
                  "WHERE ID = ?"
        break;
      default:
        requete = "SELECT ID as id,TYPE,Annee as 'time',Nom as title,DescFR as description,DescMotFR as descMotCle FROM GENERAL "+
                  "WHERE ID = ?";
        break;
    }
    return requete;
  }

  //Fonction qui récupére les données du mot clé cliqué
  showModal = async(index) =>{
    db = SQLite.openDatabase("namip.db");
    let requete = this.getRequete()
    db.transaction((tx) => {
      tx.executeSql(requete,[index],
        (tx,results)=>{
          this.setState({donneesModal : results.rows.item(0)})
        },
        (tx,error)=>{
          console.log('error',error)
        }
      )
    })
    this.setState({modal : true})
  }

  //Fonction qui renvoie vers la page Détail du mot clé
  changerPage = () =>{
    this.setState({modal : false})
    this.props.navigation.push("Detail",{dataOrdinateur : this.state.donneesModal,motCle : this.state.motCle,precedantPage : this.state.ordinateur.title})
  }

  render(){
    return(
      <View style = {{
        flex:1,
        backgroundColor : 'black',
        opacity : this.state.modal == true ? 0.7:1.0
      }}>
        {this.state.donneesModal != null &&
          <Modal
            animationType = "slide"
            transparent={true}
            visible ={this.state.modal}
            onRequestClose={() =>{this.setState({modal : false})}}
          >
          <View style = {styles.main_modal}>
            <View style = {styles.modal}>
              <TouchableOpacity style = {styles.modal_touch} onPress = {() => {this.setState({modal : false})}}>
                <Image style={styles.modal_image} source = {require('../../assets/Detail/xmark.png')}/>
              </TouchableOpacity>
              <Text style = {styles.modal_title}>{this.state.donneesModal.title}</Text>
              <Text style = {styles.modal_description}>{this.state.donneesModal.description}</Text>
              <Pressable style={styles.modal_button} onPress = {() => {this.changerPage()}}>
                <Text style={styles.text_button}>{i18n.t("MoreDetail")}</Text>
              </Pressable>
            </View>
          </View>
          </Modal>
        }
        <ScrollView>
          <TouchableOpacity style={styles.photo} onPress = {() => {this.props.navigation.navigate("Image",{id : this.state.ordinateur.id})}}>
            <Image style={styles.image} source = {images[this.state.ordinateur.id]}/>
          </TouchableOpacity>
          <View style={styles.ligne}/>
          <Text style = {styles.titre}>{this.state.ordinateur.title}</Text>
          <Legende id = {this.state.ordinateur.id} type={this.state.ordinateur.TYPE} time = {this.state.ordinateur.time}/>
          <View style={styles.ligne}/>
          <View>
            <Text style = {styles.text}>
            {
              this.state.description.map((description,index) => this.traiterDescription(description,index))
            }
            </Text>
          </View>
          <View style={styles.ligne}/>
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
    textDecorationLine : 'underline',
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
  ligne:{
    borderWidth:1,
    borderColor:'white',
  },
  photo:{
    alignItems : 'center',
  },
  image:{
    resizeMode : 'contain',
    height : 180
  },
  titre:{
    margin : 5,
    fontSize : 25,
    fontWeight : 'bold',
    textDecorationLine : 'underline',
    fontStyle : 'italic',
    color : 'white'
  },
  text:{
    margin : 5
  },
  description:{
    fontSize : 20,
    color : 'white'
  },
  MotCle:{
    fontSize : 20,
    color : 'lightblue',
    textDecorationLine : 'underline'
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

export default Detail
