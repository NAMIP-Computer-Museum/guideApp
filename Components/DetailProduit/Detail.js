import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,ScrollView,Image,TouchableOpacity,ImageBackground} from 'react-native';
import images from '../../assets/database/Images/images.js'

class Detail extends React.Component{
  render(){
    const ordinateur = this.props.navigation.state.params.dataOrdinateur
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
          <View style = {styles.legende}>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/annual.png')}/>
              <Text style = {styles.text}>{ordinateur.time}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/fabricant.png')}/>
              <Text style = {styles.text}>{ordinateur.Fabricant}</Text>
            </View>
          </View>
          <View style = {styles.legende}>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/os.png')}/>
              <Text style = {styles.text}>{ordinateur.OS}</Text>
            </View>
          </View>
          <View style = {styles.legende}>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/cpu.png')}/>
              <Text style = {styles.text}>{ordinateur.CPU}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/ram.png')}/>
              <Text style = {styles.text}>{ordinateur.RAM}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/rom.png')}/>
              <Text style = {styles.text}>{ordinateur.ROM}</Text>
            </View>
          </View>
          <View style={styles.ligne}/>
          <View style = {styles.scroll}>
            <Text style = {styles.description}>{ordinateur.description}</Text>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor : 'black'
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
  legende:{
    flex:1,
    flexDirection: 'row',
  },
  item:{
    margin : 5,
    flexDirection: 'row',
    alignItems : 'center',
  },
  icon:{
    width : 20,
    height : 20,
    margin : 5,
    tintColor : 'white'
  },
  text:{
    fontSize : 20,
    fontWeight : 'bold',
    color:'white',
    marginLeft : 2
  },
  scroll:{
    flex:8
  },
  description:{
    flex:1,
    fontSize : 20,
    marginVertical : 10,
    marginHorizontal : 5,
    color : 'white'
  },
  ligne:{
    borderWidth:1,
    borderColor:'white',
  },
})

export default Detail
