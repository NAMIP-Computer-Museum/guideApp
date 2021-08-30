import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,Pressable,Image,TouchableOpacity,ImageBackground} from 'react-native';
import Legende from './Legende.js'
import images from '../../assets/database/Images/images.js'
import videos from '../../assets/database/Videos/ListeVideosFr.js'

class Detail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      video:false,
      dataVideo : []
    }
    this.verifVideo();
  }

  verifVideo = () =>{
    const ordinateurID = this.props.navigation.state.params.dataOrdinateur.id;
    for(let i = 0;i<videos.length;i++){
      if(videos[i].id == ordinateurID){
        this.state.video = true
        this.state.dataVideo = videos[i];
        break;
      }
    }
  }

  render(){
    const ordinateur = this.props.navigation.state.params.dataOrdinateur;
    return(
      <View style = {styles.main}>
          <View style={styles.ligne}/>
          <View style = {styles.photo}>
            <ImageBackground style = {styles.image} resizeMode = 'contain' source = {images[ordinateur.id]}>
              <TouchableOpacity style={styles.zoom} onPress = {() => {this.props.navigation.navigate("Image",{id : ordinateur.id})}}>
                <Image style={styles.iconZoom} source = {require('../../assets/Detail/zoom.png')}/>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.ligne}/>
          <Text style = {styles.titre}>{ordinateur.title}</Text>
          <Legende id = {ordinateur.id} type={ordinateur.TYPE} time = {ordinateur.time}/>
          <View style={styles.ligne}/>
          <View style = {styles.text}>
            <Text style = {styles.description}>{ordinateur.description}</Text>
          </View>
          <View style={styles.ligne}/>
          {this.state.video && <View style={styles.multimedia}>
            <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("AfficheVideo",{videoUrl : this.state.dataVideo.videoURL})}}>
              <Text style={styles.text_button}>Video</Text>
            </Pressable>
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor : 'black'
  },
  ligne:{
    borderWidth:1,
    borderColor:'white',
  },
  photo:{
    flex:4,
  },
  image:{
    flex : 1,
    justifyContent : 'flex-end'
  },
  zoom:{
    position : 'absolute',
    width : 40,
    height : 40,
    margin : 5,
  },
  iconZoom:{
    flex : 1,
    width : 40,
    height : 40,
    tintColor : 'white'
  },
  titre:{
    flex:1,
    margin : 5,
    fontSize : 30,
    fontWeight : 'bold',
    textDecorationLine : 'underline',
    fontStyle : 'italic',
    color : 'white'
  },
  text:{
    flex:8
  },
  description:{
    flex:1,
    fontSize : 20,
    marginVertical : 10,
    marginHorizontal : 5,
    color : 'white'
  },
  multimedia:{
    flex : 2,
    justifyContent : 'center'
  },
  button:{
    backgroundColor : 'white',
    borderRadius : 10,
    width : 200,
    height : 50,
    marginVertical : 5,
    alignSelf : 'center',
    justifyContent : 'center',
    alignItems : 'center'
  },
  text_button:{
    textAlign : 'center',
    fontSize : 20,
    fontWeight : 'bold'
  }
})

export default Detail
