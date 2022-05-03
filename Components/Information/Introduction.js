import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Pressable,Text,ScrollView} from 'react-native'
import PageSimple from '../Affichage/PageSimple'
import i18n from '../../Language/Translate'


class Introduction extends React.Component{
  render(){
    return(
      <View style = {styles.main}>
       <ScrollView>
       <View style={styles.text_introduction}>
        <PageSimple titre = {i18n.t("TitreIntroduction")} id = {1} description = {i18n.t("DescriptionIntroduction")}/>
      </View>
        <View style={{borderTopWidth : 2,borderColor : 'white'}}>
          <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("ModeEmploi")}}>
            <Text style={styles.text_button}> {i18n.t('boutonModeEmploi')} </Text>
          </Pressable>
        </View>
       </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main : {
      flex : 1,
      backgroundColor : '#b42e32'
    },
    text_introduction:{
      textAlign : 'center',
      fontSize : 20,
      fontWeight : 'bold'
    },
    button:{
      backgroundColor : 'white',
      borderRadius : 10,
      width : 200,
      height : 45,
      marginVertical : 5,
      alignSelf : 'center',
      justifyContent : 'center',
      alignItems : 'center',
    },
    text_button:{
      textAlign : 'center',
      fontSize : 20,
      fontWeight : 'bold'
    }
})

export default Introduction
