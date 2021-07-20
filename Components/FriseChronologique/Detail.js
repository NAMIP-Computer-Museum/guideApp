import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,TouchableHighlight} from 'react-native';

class Detail extends React.Component{
  render(){
    //console.log(this.props.navigation)
    const ordinateur = this.props.navigation.state.params.dataOrdinateur
    return(
      <View style = {styles.main}>
          <TouchableHighlight style={styles.touche} onPress = {() => {this.props.navigation.navigate("Image",{imageURL: ordinateur.imageUrl})}}>
            <Image style={styles.image} source = {{uri : ordinateur.imageUrl}}/>
          </TouchableHighlight>
          <Text style = {styles.titre}> {ordinateur.title}</Text>
          <Text style = {styles.annee}> {ordinateur.time}</Text>
          <Text style = {styles.description}> {ordinateur.overview}</Text>
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
    paddingTop : 10,
    fontSize : 30,
    fontWeight : 'bold'
  },
  annee:{
    flex:1,
    paddingTop : 10,
    fontSize : 20
  },
  description:{
    flex:8,
    fontSize : 20

  }
})

export default Detail
