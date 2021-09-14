import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Dimensions} from 'react-native'
import {Video} from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import YoutubePlayer from 'react-native-youtube-iframe'

class AfficheVideo extends React.Component{
  render(){
    const videoURL = this.props.navigation.state.params.videoUrl
    if(typeof videoURL=== 'string' && (videoURL.includes("youtu.be") || videoURL.includes("youtube"))){
      const split = videoURL.split("=");
      const id = split[1];
      return(
        <View style={styles.main}>
          <YoutubePlayer
            play = {true}
            videoId = {id}
            width = {"100%"}
            height = {"100%"}
            webViewStyle = {{
              flex : 1,
              marginTop : Dimensions.get('window').height/3,
              height : '100%',
              width : '100%',
              alignSelf : 'center'
            }}
          />
        </View>
      )
    }
    else if (typeof videoURL=== 'string'){
      return(
        <View style={styles.main}>
          <Video
            source = {{uri : videoURL}}
            shouldPlay
            style = {styles.video}
            resizeMode="contain"
            useNativeControls
            isLooping
            onFullscreenUpdate={onFullscreenUpdate}
          />
        </View>
      )
    }
    else{
      return(
        <View style={styles.main}>
          <Video
            source = {videoURL}
            shouldPlay
            style = {styles.video}
            resizeMode="contain"
            useNativeControls
            isLooping
            onFullscreenUpdate={onFullscreenUpdate}
          />
        </View>
      )
    }
  }
}

const onFullscreenUpdate = async ({fullscreenUpdate}: VideoFullscreenUpdateEvent) => {
    switch (fullscreenUpdate) {
        case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
            break;
        case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
            break;
    }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor : 'black',
    justifyContent:'center',
    alignItems : 'center'
  },
  video:{
    flex:1,
    height:"100%",
    width : "100%"
  },
})

export default AfficheVideo
