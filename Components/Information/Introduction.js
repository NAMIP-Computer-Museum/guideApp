import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View} from 'react-native'
import PageSimple from '../Affichage/PageSimple'
import i18n from '../../Language/Translate'


class Introduction extends React.Component{
  render(){
    return(
      <View style = {styles.main}>
       <PageSimple titre = {i18n.t("TitreIntroduction")} id = {1} description = {i18n.t("DescriptionIntroduction")}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main : {
      flex : 1
    },
})

export default Introduction
