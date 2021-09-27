import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,ScrollView} from 'react-native'
import PageSimple from '../Affichage/PageSimple'
import i18n from '../../Language/Translate'


class Contact extends React.Component{
  render(){
    return(
      <View style = {styles.main}>
       <ScrollView>
        <PageSimple titre = {i18n.t("TitreApropos")} id = {2} description = {i18n.t("DescriptionApropos")}/>
       </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main : {
      flex : 1,
      backgroundColor : 'black'
    },
})

export default Contact
