import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import {Picker} from '@react-native-picker/picker'
import GeneralCheckbox from '../LigneTempsMicro/GeneralCheckbox'
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import i18n from '../../Language/Translate'
import images from '../../assets/database/Images/images.js'
import DropShadow from "react-native-drop-shadow";


class LigneTempsPerma extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[],
      //Aspect Frise
      pickerValue : 'tout',
      dateBasse : 0,
      dateHaute : 2021,
      isSimple : false,
      //type
      typeData : ["MACHINE"],
      //motCle
      //tabMotCle : []
    }
    //this.fetchMotCle();
    this.fetchDataBD();
  }

  //Fonction qui met à jour les deux dates utilisés comme argument dans la requete pour la BD
  setDatePicker = () =>{
    switch(this.state.pickerValue){
      case 'Micro':
        this.setState({dateBasse:0,dateHaute:1973});
        break;
      case 'Meca':
        this.setState({dateBasse:1973,dateHaute:1977});
        break;
      case 'Mainframe':
        this.setState({dateBasse:1977,dateHaute:1992});
        break;
      case 'Mini':
        this.setState({dateBasse:1992,dateHaute:2021});
        break;
      case 'tout':
        this.setState({dateBasse:0,dateHaute:2021});
        break;
    }
    this.fetchDataBD();
  }

  //Fonction qui stock les différents types à afficher dans tableau utilisé pour la requete SQL et les enlèves si on ne veut plus les afficher
  actualiserType = async(checkValue,typeName) =>{
    let tableau = [...this.state.typeData];
    if(checkValue){
      tableau.push(typeName);
    }
    else{
      let index = tableau.indexOf(typeName);
      tableau.splice(index,1);
    }
    await this.setState({typeData : tableau});
    this.fetchDataBD();
  }

  //Fonction qui modifie si oui ou non l'affichage doit être compacter
  simplifierEtiquette = async(checkValue,name) =>{
    await this.setState({isSimple : checkValue})
    this.fetchDataBD();
  }

  //Fonction qui utilise le tableau des types et le transforme en une chaine de caractères pour la requete SQL
  concatenerTypeToString = () =>{
    let typeString = "";
    let tableau = [...this.state.typeData]
    typeString = tableau.join("|")
    return typeString;
  }

  //Fonction qui renvoie la requete à utiliser en fonction de la locale
  getRequete = () =>{
    let typeString = this.concatenerTypeToString();
    let requete;
    switch(i18n.locale){
      case "en":
        requete = "SELECT ID as id,PERIODE, Annee as time,Nom as title,DescEN as description, DescMotEN as descMotCle FROM GENERAL "+
                  "WHERE Annee >= ? and Annee < ? and PERIODE REGEXP '"+typeString+"' ORDER BY Annee ASC,Nom ASC";
        break;
      case "nl-NL":
        requete = "SELECT ID as id,PERIODE, Annee as time,Nom as title,DescNL as description, DescMotNL as descMotCle FROM GENERAL "+
                  "WHERE Annee >= ? and Annee < ? and PERIODE REGEXP '"+typeString+"' ORDER BY Annee ASC,Nom ASC";
        break;
      default:
        requete = "SELECT ID as id,TYPE, Annee as time,Nom as title,DescFR as description, DescMotFR as descMotCle FROM GENERAL "+
                  "WHERE Annee >= ? and Annee < ? and TYPE REGEXP '"+typeString+"' ORDER BY Annee ASC,Nom ASC";
        break;
    }
    return requete;
  }

  //Fonction qui a chercher les données des objets dans la BD
  fetchDataBD = async() =>{
    let db = SQLite.openDatabase("expop-v1.db");
    let requete = this.getRequete();
    db.transaction((tx) => {
        tx.executeSql(requete,[this.state.dateBasse,this.state.dateHaute],
          (tx,results)=>{
            var taille = results.rows.length
            let tableau = []
            for(let i=0;i<taille;i++){
              const data = this.addVisuelData(results.rows.item(i));
              tableau.push(data)
            }
            this.setState({data : tableau})
          },
          (tx,error)=>{
            console.log('error',error)
          }
        )
      })
    }


    //Fonction qui permet d'ajouter aux objets les attributs de couleurs pour l'affichage + la vue compacter
    addVisuelData = (data) => {
      const date = parseInt(data.time);
      switch(true){
        case date >= 1850 && date < 1970 :
          data['lineColor'] = 'rgb(29,41,219)'
          data['circleColor'] = 'rgb(29,41,219)'
          break;
        case date >= 1975 && date < 1976 :
          data['lineColor'] = 'rgb(47,250,141)'
          data['circleColor'] = 'rgb(47,250,141)'
          break;
        case date >= 1977 && date < 1982 :
          data['lineColor'] = 'rgb(248,50,185)'
          data['circleColor'] = 'rgb(248,50,185)'
          break;
        case date >= 1982 :
          data['lineColor'] = 'rgb(250,190,27)'
          data['circleColor'] = 'rgb(250,190,27)'
          break;
      }
      data['Simplifie'] = this.state.isSimple;
      return data;
    }

    //Rendu custom de la partie texte et image de chaque objets
    renderDetail = (rowData,sectionID, rowID) =>{
      let title = <Text style = {styles.title}>{rowData.title}</Text>
      var desc = null
      if(!rowData.Simplifie)
        desc = (
        <View style={styles.main_content}>
            <View style = {styles.images_content}>
              <Image source={images[rowData.id]} style={styles.image}/>
            </View>
          <View style = {styles.description_content}>
            <Text style={[styles.description]} numberOfLines={6}>{rowData.description}</Text>
          </View>
        </View>
      )
      return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
    )
  }

  //Fonction qui gère les clicks sur chaque objet
   onEventPress = (data) => {
    console.log("Valeur data dans lignePerma : ")
    console.log(data)
    this.props.navigation.navigate("DetailExpop",{dataOrdinateur: data})
  }

    render(){
      return(
        <View style = {styles.main}>
          <View style = {styles.legendeHaut}>
            <Picker
              style = {styles.picker}
              numberOfLines = {1}
              dropdownIconColor = 'white'
              mode = 'dropdown'
              selectedValue={this.state.pickerValue}
              onValueChange={(itemValue,itemIndex) => this.setState({pickerValue : itemValue},() => {this.setDatePicker()})}
            >
              <Picker.Item label={i18n.t('Picker1')} color='lightgray' value='tout'/>
              <Picker.Item label={i18n.t('Micro')} color='rgb(29,41,219)' value='Micro'/>
              <Picker.Item label={i18n.t('Meca')} color='rgb(47,250,141)' value='Meca'/>
              <Picker.Item label={i18n.t('Mainframe')} color='rgb(248,50,185)' value='Mainframe'/>
              <Picker.Item label={i18n.t('Mini')} color='rgb(250,190,27)' value='Mini'/>
              <Picker.Item label={i18n.t('Moderne')} color='rgb(250,190,27)' value='Moderne'/>
            </Picker>
            <GeneralCheckbox name={i18n.t("SimpleCheck")} value={false} actualiserType={this.simplifierEtiquette}/>
          </View>
          <View style = {styles.legendeBas}>
            <GeneralCheckbox name="MACHINE" value={true} actualiserType={this.actualiserType}/>
            <GeneralCheckbox name="ORG" value={false} actualiserType={this.actualiserType}/>
            <GeneralCheckbox name="EVENT" value={false} actualiserType={this.actualiserType}/>
          </View>
          <Timeline style = {styles.timeline}
            timeStyle = {styles.time}
            separator = {true}
            data = {this.state.data}
            onEventPress = {this.onEventPress}
            renderDetail = {this.renderDetail}
            />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  //Page Entiere
  main:{
    flex: 1,
    backgroundColor : '#822125'
  },
  ImageBackground:{
    flex : 1,
    backgroundColor : 'black'

  },
  text:{
    textAlign : 'center',
    color : 'white',
    fontWeight: 'bold',
    fontSize : 30,
    margin : 5,
  },
  //Legende
  legendeHaut:{
    flex:1,
    flexWrap : 'wrap',
    alignContent : 'center',
    flexDirection: 'row',
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 1,
    borderColor : 'white',
    backgroundColor: '#b42e32'
  },
  legendeBas:{
    flex:1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    flexWrap : 'wrap',
    alignContent : 'center',
    borderBottomWidth : 1,
    borderLeftWidth : 1,
    borderRightWidth : 1,
    borderColor : 'white',
    backgroundColor: '#b42e32'
  },
  picker:{
    flex : 1,
    height : 50,
    marginLeft : 10
  },
  //Ligne du temps
  timeline:{
    flex:8,
    marginTop : 5,
  },
  time:{
    textAlign : 'center',
    fontWeight : 'bold',
    color : 'white'
  },
  main_content:{
    flex:1,
    flexDirection: 'row'
  },
  title:{
    flex : 1,
    marginBottom : 15,
    fontSize : 20,
    fontWeight : 'bold',
    color : 'white'
  },
  description_content:{
    flex:2,
    paddingLeft : 10
  },
  description:{
    color:'white',
  },
  images_content:{
    aspectRatio : 1,
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    height : "100%",
    width : "100%",
    borderRadius : 45,
    overflow : 'hidden',
  },
  image:{
    aspectRatio : 1,
    resizeMode : 'cover',
    height : '129%',
    width : '129%',
  }
})

export default LigneTempsPerma
