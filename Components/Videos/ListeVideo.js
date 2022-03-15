import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,FlatList} from 'react-native';
import VideoItem from './VideoItem Liste'
import listeFr from '../../assets/database/Videos/ListeVideosFr.js'
import listeEn from '../../assets/database/Videos/ListeVideosEn.js'
import i18n from '../../Language/Translate'

class ListeVideo extends React.Component{

  //Fonction qui renvoie les objets vidéos en fonction de la langue
  testLocale(){
    if(i18n.locale === 'fr-FR'){
      return (listeFr)
    }
    return (listeEn)
  }

  //Fonction qui permet la navigation vers la page qui affiche les vidéos
  lireVideo = (videoUrl) =>{
    this.props.navigation.navigate("AfficheVideo",{videoUrl : videoUrl})
  }

    render(){
      return (
        <View style={styles.main}>
          <View style = {styles.titre}>
            <Text style={styles.text}>{i18n.t('listeVideoTexte')}</Text>
          </View>
          <View style = {styles.flatlist}>
            <FlatList
                //Données récupérées à partir d'une fonction qui renvoie un tableau avec les objets vidéos
                //Correspond aux objets en français si la locale est en français sinon en anglais
                data={this.testLocale()}
                keyExtractor={(item) => item.id.toString()}
                // pour chaque item, un appel au composant VidéoItem est effectué avec pour props l’item et une fonction lireVidéo pour naviguer à la page de visualisation..
                renderItem= {({item}) => <VideoItem video={item} lireVideo = {this.lireVideo}/>}
            />
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  main:{
    flex: 1,
    backgroundColor : 'black'
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
  flatlist:{
    flex : 9
  }
})

export default ListeVideo
