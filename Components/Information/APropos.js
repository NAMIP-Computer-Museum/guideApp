import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,ScrollView} from 'react-native'
import PageSimple from '../Affichage/PageSimple'
import i18n from '../../Language/Translate'


class Contact extends React.Component{
  render(){
    return(
      <View style = {styles.main}>
        <PageSimple titre = {i18n.t("TitreApropos")} id = {2} description = {i18n.t("DescriptionApropos")}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main : {
      flex : 1,
    },
})

export default Contact
