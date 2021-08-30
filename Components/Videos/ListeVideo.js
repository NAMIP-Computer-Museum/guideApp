import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,FlatList} from 'react-native';
import VideoItem from './VideoItem Liste'
import listeFr from '../../assets/database/Videos/ListeVideosFr.js'
import listeEn from '../../assets/database/Videos/ListeVideosEn.js'
import i18n from '../../Language/Translate'

class ListeVideo extends React.Component{
  testLocale(){
    if(i18n.locale === 'en'){
      return (listeEn)
    }
    return (listeFr)
  }

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
