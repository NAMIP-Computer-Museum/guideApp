import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View,StyleSheet,Dimensions,Platform} from 'react-native'
import {WebView} from 'react-native-webview'

const index =
`<html>
  <body>
    <h1><center>Contact NAM-IP</center></h1>
    <img src = "../../assets/icon.png">
    <a href = https://www.google.fr/>Site Internet</a>
  </body>
</html>`

class Contact extends React.Component{
  render(){
    return(
      <WebView
        style = {styles.main}
        originWhitelist={['*']}
        source={{html : index}}
      />
    )
  }
}

const styles = StyleSheet.create({
    main : {
      flex : 1,
      width:Dimensions.get('window').width
    }
})

export default Contact
