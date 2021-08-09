import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Dimensions} from 'react-native'
import {Video} from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'


class AfficheVideo extends React.Component{
  render(){
    //console.log(this.props.navigation.state.params.videoUrl)
    const videoURL = this.props.navigation.state.params.videoUrl
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
  }
})

export default AfficheVideo
