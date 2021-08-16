import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,Platform,Dimensions} from 'react-native'
//import {WebView} from 'react-native-webview'
import RenderHtml from 'react-native-render-html';
import {Asset} from 'expo-asset'


const index = Asset.fromModule(require('../../assets/index.html')).uri


class Contact extends React.Component{
  render(){
    return(
      <RenderHtml
        contentWidth = {Dimensions.get('window').width}
        style = {styles.main}
        source={{uri : index}}
      />
    )
  }
}

const styles = StyleSheet.create({
    main : {
      flex : 1,
      borderBottomWidth : 2,
      borderColor : 'white'
    },
})

export default Contact
