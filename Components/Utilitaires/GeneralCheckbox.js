import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox'

class GeneralCheckbox extends React.Component{
    constructor(props){
      super(props);
      this.state={
        value:this.props.value,
        name :this.props.name
      }
    }

    render(){
      return(
        <View style = {styles.checkbox}>
          <CheckBox
            tintColors = {{true : 'white',false : 'lightgray'}}
            tintColor = {{true : 'white',false : 'lightgray'}}
            value={this.state.value}
            onValueChange={(newValue) => this.setState({value : newValue},() => {this.props.actualiserType(this.state.value,this.state.name)})}
          />
          <Text style={styles.CheckText}>{this.state.name}</Text>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  checkbox:{
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 10
  },
  CheckText:{
    color:'white',
    fontWeight:'bold',
    fontSize : 12,
    marginRight : 15,
    marginLeft : 2,
  },
})

export default GeneralCheckbox;
