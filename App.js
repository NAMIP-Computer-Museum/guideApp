import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation'
import i18n from 'i18n-js'

export default class App extends React.Component {
  render(){
    return (
      <Navigation/>
    );
  }
}
