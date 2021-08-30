import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom'
import images from '../../assets/database/Images/images.js'

class AfficheImage extends React.Component{
  render(){
    const id = this.props.navigation.state.params.id
    return (
      <View style = {styles.main}>
        <ImageZoom style = {styles.image}
                   cropWidth={Dimensions.get('window').width}
                   cropHeight={Dimensions.get('window').height}
                   imageWidth={Dimensions.get('window').width}
                   imageHeight={Dimensions.get('window').height}
                   >
            <Image style = {styles.affichage} source = {images[id]}/>
        </ImageZoom>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor : 'black',
  },
  image:{
    flex : 1,
  },
  affichage:{
    flex:1,
    resizeMode : 'contain',
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height
  }
})

export default AfficheImage
