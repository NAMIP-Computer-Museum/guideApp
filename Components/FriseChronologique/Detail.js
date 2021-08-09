import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,TouchableHighlight} from 'react-native';

class Detail extends React.Component{
  render(){
    //console.log(this.props.navigation.state.params.dataOrdinateur)
    const ordinateur = this.props.navigation.state.params.dataOrdinateur
    return(
      <View style = {styles.main}>
          <TouchableHighlight style={styles.touche} onPress = {() => {this.props.navigation.navigate("Image",{imageURL: ordinateur.imageUrl})}}>
            <Image style={styles.image} source = {{uri : ordinateur.imageUrl}}/>
          </TouchableHighlight>
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
          <Text style = {styles.description}>{ordinateur.overview}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    flex:1
  },
  touche:{
    flex:4
  },
  image:{
    flex:1,
    resizeMode : 'contain'
  },
  titre:{
    flex:1,
    margin : 5,
    fontSize : 30,
    fontWeight : 'bold',
    textDecorationLine : 'underline'
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
    margin : 5
  },
  text:{
    fontSize : 20,
    fontWeight : 'bold'
  },
  description:{
    flex:8,
    fontSize : 20

  }
})

export default Detail
