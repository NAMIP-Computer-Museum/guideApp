import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';

class VideoItem extends React.Component{
  render(){
    const video = this.props.video
    const lireVideo = this.props.lireVideo
    return(
      <View>
      <TouchableOpacity style = {styles.main} onPress={() => lireVideo(video.videoURL)}>
        <View style = {styles.left}>
          <Image style = {styles.image} source = {require('../../assets/Video/playCircle.png')}/>
        </View>
        <View style = {styles.right}>
          <Text style = {styles.titre} numberOfLines={1}>{video.title}</Text>
          <Text style = {styles.description} numberOfLines={3}>{video.description}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.ligne}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex : 1,
    margin:5,
    height:100,
    flexDirection:'row'
  },
  left:{
    flex : 1,
    margin : 5,
    alignItems : 'center'
  },
  image:{
    width:90,
    height:90,
    tintColor : 'white'
  },
  right:{
    flex:3,
    margin:5,
  },
  titre:{
    flex:1,
    fontWeight:'bold',
    color : 'white',
    fontSize:18,
    marginRight : 10
  },
  description:{
    flex:2,
    fontSize:15,
    color:'lightgray',
    marginRight : 10
  },
  ligne:{
    borderWidth: 1,
    borderColor: 'white',
    marginLeft : 30,
    marginRight : 30,
  },
})

export default VideoItem
