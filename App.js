import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import Navigation from './Navigation/Navigation';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default class App extends React.Component {
  render(){
    return (
      <Navigation/>
    );
  }
}
