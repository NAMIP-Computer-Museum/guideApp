import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';

class VideoItem extends React.Component{
  render(){
    const video = this.props.video
    const lireVideo = this.props.lireVideo
    return(
      <TouchableOpacity style = {styles.main} onPress={() => lireVideo(video.videoURL)}>
        <Image style = {styles.image} source = {require('./playCircle.png')}/>
        <View style = {styles.textuel}>
          <Text style = {styles.titre}>{video.title}</Text>
          <Text style = {styles.description} numberOfLines={2}>{video.description}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    paddingTop:10,
    paddingBottom:10,
    margin:5,
    height:100,
    flexDirection:'row'
  },
  image:{
    width:100,
    height:90,
    margin:5
  },
  textuel:{
    flex:1,
    margin:5
  },
  titre:{
    flex:1,
    fontWeight:'bold',
    fontSize:18,
    paddingBottom:5
  },
  description:{
    flex:2,
    fontSize:15,
    color:'gray'
  }
})

export default VideoItem
