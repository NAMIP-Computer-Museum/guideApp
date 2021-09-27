import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,ScrollView, Text, View,Pressable,Image,TouchableOpacity,ImageBackground} from 'react-native';
import Legende from './Legende.js'
import images from '../../assets/database/Images/images.js'
import videos from '../../assets/database/Videos/ListeVideosFr.js'

class Detail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      video:false,
      dataVideo : [],
      ordinateur : this.props.navigation.state.params.dataOrdinateur != undefined ? this.props.navigation.state.params.dataOrdinateur : null
    }
    this.testDonneeVideo();
  }

  testDonneeVideo = () =>{
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
    return(
      <View style = {styles.main}>
        <ScrollView>
          <TouchableOpacity style={styles.photo} onPress = {() => {this.props.navigation.navigate("Image",{id : this.state.ordinateur.id})}}>
            <Image style={styles.image} source = {images[this.state.ordinateur.id]}/>
          </TouchableOpacity>
          <View style={styles.ligne}/>
          <Text style = {styles.titre}>{this.state.ordinateur.title}</Text>
          <Legende id = {this.state.ordinateur.id} type={this.state.ordinateur.TYPE} time = {this.state.ordinateur.time}/>
          <View style={styles.ligne}/>
          <View style = {styles.text}>
            <Text style = {styles.description}>{this.state.ordinateur.description}</Text>
          </View>
          <View style={styles.ligne}/>
          {this.state.video &&
            <View style={styles.multimedia}>
              <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("AfficheVideo",{videoUrl : this.state.dataVideo.videoURL})}}>
                <Text style={styles.text_button}>Video</Text>
              </Pressable>
            </View>
          }
        </ScrollView>
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
    alignItems : 'center',
  },
  image:{
    resizeMode : 'contain',
    height : 180
  },
  titre:{
    margin : 5,
    fontSize : 25,
    fontWeight : 'bold',
    textDecorationLine : 'underline',
    fontStyle : 'italic',
    color : 'white'
  },
  description:{
    fontSize : 20,
    marginVertical : 10,
    marginHorizontal : 5,
    color : 'white'
  },
  multimedia:{
    justifyContent : 'center',
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
