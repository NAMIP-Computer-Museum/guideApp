import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom'

class AfficheImage extends React.Component{
  render(){
    const image = this.props.navigation.state.params
    return (
      <View style = {styles.main}>
        <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={Dimensions.get('window').width}
                       imageHeight={Dimensions.get('window').height}>
            <Image style={styles.image} source = {{uri : image.imageURL}}/>
        </ImageZoom>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1
  },
  image:{
    flex : 1,
    resizeMode : 'contain',
  }
})

export default AfficheImage
