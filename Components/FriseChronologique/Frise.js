import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Pressable,Image,TouchableOpacity} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import * as SQLite from 'expo-sqlite'
//import ordinateur from '../../Data/DonneesOrdinateur/DonneesOrdiFr.js'
//import computer from '../../Data//DonneesOrdinateur/DonneesOrdiEn.js'
import i18n from '../../Language/Translate'

let db;

class Frise extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
    this.fetchOrdinateur = this.fetchOrdinateur.bind(this)
    this.fetchOrdinateur()
  }

  fetchOrdinateur = async() =>{
    let dirInfo;
    try {
      dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
    } catch(err) { Sentry.captureException(err) };
    if (!dirInfo.exists) {
      try {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
      } catch(err) { Sentry.captureException(err) }
    };
    await FileSystem.downloadAsync(Asset.fromModule(require("../../assets/database/Ordinateur.db")).uri,
    `${FileSystem.documentDirectory}SQLite/ordinateur.db`);
    db = SQLite.openDatabase("ordinateur.db");
    let requete;
    if(this.testLocale() === 'EN'){
      requete = 'Select * from ordinateurEN';
    }
    else{
      requete = 'Select * from ordinateurFR';
    }
    db.transaction((tx) => {
        tx.executeSql(requete,null,
          (tx,results)=>{
            var taille = results.rows.length
            let tableau = []
            for(let i=0;i<taille;i++){
              tableau.push(results.rows.item(i))
            }
            //console.log(tableau)
            this.setState({data : tableau})
          },
          (tx,error)=>{
            console.log('error',error)
          }
        )
      })
    }

    renderDetail(rowData,sectionID, rowID){
      let title = <Text style = {styles.title}>{rowData.title}</Text>
      var desc = null
      if(rowData.description && rowData.imageUrl)
        desc = (
          <View style={styles.main_content}>
            <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
            <Text style={[styles.description]} numberOfLines = {5}>{rowData.description}</Text>
        </View>
      )
      return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
    )
  }

  testLocale(){
    if(i18n.locale === 'en'){
      //console.log(computer)
      return ('EN')
    }
    return ('FR')
    //console.log(ordinateur)
  }

    onEventPress = (data) => {
      //console.log(data)
      this.props.navigation.navigate("Detail",{dataOrdinateur: data})
    }
    render(){
      return(
        //console.log(this.state.data),
        <View style={styles.main}>
          <Text style={styles.text}>{i18n.t('friseTexte')}</Text>
          <Timeline style={styles.timeline}
            timeStyle = {styles.time}
            separator={true}
            data={this.state.data}
            onEventPress = {this.onEventPress}
            renderDetail={this.renderDetail}
            />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  main:{
    flex: 1
  },
  text:{
    flex:1,
    textAlign : 'center',
    backgroundColor : 'black',
    color : 'white',
    fontWeight: 'bold',
    fontSize : 40,
    paddingTop : 10
  },
  main_content:{
    flex:1,
    flexDirection: 'row'
  },
  timeline:{
    flex:9,
    paddingTop:30,
  },
  title:{
    paddingBottom : 15,
    fontSize : 20,
    fontWeight : 'bold'
  },
  description:{
    color:'gray',
    flex:2,
    paddingLeft : 10
  },
  time:{
    textAlign : 'center',
    fontWeight : 'bold'
  },
  image:{
    flex:1,
    paddingTop : 50,
    paddingBottom :50,
    borderRadius : 25
  }
})

export default Frise
