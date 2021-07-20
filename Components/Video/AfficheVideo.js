import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View} from 'react-native'
import {Video} from 'expo-av'
import VideoPlayer from 'expo-video-player'
class AfficheVideo extends React.Component{
  render(){
    //console.log(this.props.navigation.state.params.videoUrl)
    const videoURL = this.props.navigation.state.params.videoUrl
    return(
      <View style={styles.main}>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          timeVisible : true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source:{uri:videoURL}
        }}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent:'center'
  }
})

export default AfficheVideo
