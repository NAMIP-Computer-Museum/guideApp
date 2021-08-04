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
          <View style = {styles.titre}>
            <Text style={styles.text}>{i18n.t('listeVideoTexte')}</Text>
          </View>
          <View style = {styles.flatlist}>
            <FlatList
              //style = {styles.flatlist}
                data={this.testLocale()}
                keyExtractor={(item) => item.id.toString()}
                renderItem= {({item}) => <VideoItem video={item} lireVideo = {this.lireVideo}/>}
            />
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  main:{
    flex: 1
    },
  titre:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 2,
    borderColor : 'black'
  },
  text:{
    textAlign : 'center',
    color : 'black',
    fontWeight: 'bold',
    fontSize : 30,
    margin : 5,
  },
  flatlist:{
    flex : 9
  }
})

export default ListeVideo
