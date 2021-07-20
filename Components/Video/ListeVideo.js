import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,FlatList} from 'react-native';
import VideoItem from './VideoItem'
import listeFr from '../../Data/DonneesVideos/VideoFr'
import listeEn from '../../Data/DonneesVideos/VideoEn'
import i18n from '../../Language/Translate'

class ListeVideo extends React.Component{
  testLocale(){
    if(i18n.locale === 'en'){
      //console.log(listeEn)
      return (listeEn)
    }
    return (listeFr)
    //console.log(listeFr)
  }

  lireVideo = (videoUrl) =>{
    //console.log(videoUrl)
    this.props.navigation.navigate("AfficheVideo",{videoUrl : videoUrl})
  }

    render(){
      return (
        <View style={styles.main}>
          <Text style={styles.text}>{i18n.t('listeVideoTexte')}</Text>
          <FlatList
              style = {styles.flatlist}
              data={this.testLocale()}
              keyExtractor={(item) => item.id.toString()}
              renderItem= {({item}) => <VideoItem video={item} lireVideo = {this.lireVideo}/>}
          />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  main:{
    flex: 1
    },
  text:{
    flex:0.1,
    textAlign : 'center',
    backgroundColor : 'black',
    color : 'white',
    fontWeight: 'bold',
    fontSize : 40,
    paddingTop : 10,
    paddingBottom : 15
  }
})

export default ListeVideo
