import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
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
    this.fetchOrdinateur('All')
  }

  colorPicker = (data) => {
    const date = parseInt(data.time);
    if(date <= 1980){
      data['lineColor'] = 'rgb(47,250,141)'
      data['circleColor'] = 'rgb(47,250,141)'
    }
    else if(date > 1980 && date <= 1990){
      data['lineColor'] = 'rgb(248,50,185)'
      data['circleColor'] = 'rgb(248,50,185)'
    }
    else if (date > 1990){
      data['lineColor'] = 'rgb(250,190,27)'
      data['circleColor'] = 'rgb(250,190,27)'
    }
    return data;
  }

  fetchRequete = (affichage) =>{
      let requete;
      if(i18n.locale === 'en'){
          switch(affichage){
            case 'All':
              requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS,Descourte as description FROM Ordinateur "+
              "WHERE type LIKE 'Micro' and LENGTH(annee) != 0 ORDER BY annee ASC,title ASC"
              break;
            case 'Phase 1':
              requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS,Descourte as description FROM Ordinateur "+
              "WHERE type LIKE 'Micro' and LENGTH(annee) != 0 and annee <= 1980 ORDER BY annee ASC,title ASC"
              break;
            case 'Phase 2':
              requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS,Descourte as description FROM Ordinateur "+
              "WHERE type LIKE 'Micro' and LENGTH(annee) != 0 and annee > 1980 and annee <= 1990 ORDER BY annee ASC,title ASC"
              break;
            case 'Phase 3':
              requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS,Descourte as description FROM Ordinateur "+
              "WHERE type LIKE 'Micro' and LENGTH(annee) != 0 and annee > 1990 ORDER BY annee ASC,title ASC"
          }
      }
      else{
        switch(affichage){
          case 'All':
            requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS,Descourte as description FROM Ordinateur "+
            "WHERE type LIKE 'Micro' and LENGTH(annee) != 0 ORDER BY annee ASC,title ASC"
            break;
          case 'Phase 1':
            requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS,Descourte as description FROM Ordinateur "+
            "WHERE type LIKE 'Micro' and LENGTH(annee) != 0 and annee <= 1980 ORDER BY annee ASC,title ASC"
            break;
          case 'Phase 2':
            requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS,Descourte as description FROM Ordinateur "+
            "WHERE type LIKE 'Micro' and LENGTH(annee) != 0 and annee > 1980 and annee <= 1990 ORDER BY annee ASC,title ASC"
            break;
          case 'Phase 3':
            requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS,Descourte as description FROM Ordinateur "+
            "WHERE type LIKE 'Micro' and LENGTH(annee) != 0 and annee > 1990 ORDER BY annee ASC,title ASC"
        }
      }
      return requete;
  }

  fetchOrdinateur = async(affichage) =>{
    let dirInfo;
    try {
      dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
    } catch(err) { Sentry.captureException(err) };
    if (!dirInfo.exists) {
      try {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
      } catch(err) { Sentry.captureException(err) }
    };
    await FileSystem.downloadAsync(Asset.fromModule(require("../../assets/database/sqlite.db")).uri,
    `${FileSystem.documentDirectory}SQLite/ordinateur.db`);
    db = SQLite.openDatabase("ordinateur.db");
    let requete = this.fetchRequete(affichage)
    db.transaction((tx) => {
        tx.executeSql(requete,null,
          (tx,results)=>{
            var taille = results.rows.length
            let tableau = []
            for(let i=0;i<taille;i++){
              const data = this.colorPicker(results.rows.item(i))
              tableau.push(data)
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
            <Text style={[styles.description]}>{rowData.description}</Text>
        </View>
      )
      return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
    )
  }

    onEventPress = (data) => {
      //console.log(data)
      this.props.navigation.navigate("Detail",{dataOrdinateur: data})
    }

    render(){
      return(
        //console.log(this.state.data),
        <View style = {styles.main}>
          <View style = {styles.titre}>
            <Text style = {styles.text}>{i18n.t('friseTexte')}</Text>
          </View>
          <View style = {styles.legende}>
            <TouchableOpacity style = {styles.sousLegende} onPress = {() => {this.fetchOrdinateur('All')}}>
              <Image style = {styles.imageLegende} source={require('../../assets/Frise/ordinateur.png')}/>
              <Text style = {styles.textLegende0}>{i18n.t('button1Frise')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.sousLegende} onPress = {() => {this.fetchOrdinateur('Phase 1')}}>
              <Image style = {styles.imageLegende} source={require('../../assets/Frise/ordinateur.png')}/>
              <Text style = {styles.textLegende1}>Phase 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.sousLegende} onPress = {() => {this.fetchOrdinateur('Phase 2')}}>
              <Image style = {styles.imageLegende} source={require('../../assets/Frise/ordinateur.png')}/>
              <Text style = {styles.textLegende2}>Phase 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.sousLegende} onPress = {() => {this.fetchOrdinateur('Phase 3')}}>
              <Image style = {styles.imageLegende} source={require('../../assets/Frise/ordinateur.png')}/>
              <Text style = {styles.textLegende3}>Phase 3</Text>
            </TouchableOpacity>
          </View>
          <Timeline style = {styles.timeline}
            timeStyle = {styles.time}
            separator = {true}
            data = {this.state.data}
            onEventPress = {this.onEventPress}
            //renderDetail = {this.renderDetail}
            />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  //Page Entiere
  main:{
    flex: 1
  },
  //Titre
  titre:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 2,
    borderColor : 'black'
  },
  text:{
    //flex:1,
    textAlign : 'center',
    color : 'black',
    fontWeight: 'bold',
    fontSize : 30,
    margin : 5,
  },
  //Legende
  legende:{
    flex:1,
    flexDirection: 'row',
  },
  sousLegende:{
    flex: 1,
    flexDirection: 'row',
    alignItems : 'center',
    borderBottomWidth : 2,
    borderRightWidth : 2,
    borderLeftWidth : 2,
    borderColor : 'black',
    justifyContent : 'center'
  },
  imageLegende : {
    width : 20,
    height : 20,
    margin : 5
  },
  textLegende0:{
    color : 'black',
    fontWeight : 'bold',
  },
  textLegende1:{
    color : 'rgb(47,250,141)',
    fontWeight : 'bold',
  },
  textLegende2:{
    color : 'rgb(248,50,185)',
    fontWeight : 'bold',
  },
  textLegende3:{
    color : 'rgb(250,190,27)',
    fontWeight : 'bold',
  },
  //Ligne du temps
  timeline:{
    flex:9,
    marginTop : 5,
  },
  main_content:{
    flex:1,
    flexDirection: 'row'
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
