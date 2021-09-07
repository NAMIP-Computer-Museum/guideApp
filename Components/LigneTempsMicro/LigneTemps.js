import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import {Picker} from '@react-native-picker/picker'
import CheckBox from '@react-native-community/checkbox'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import * as SQLite from 'expo-sqlite'
import i18n from '../../Language/Translate'
import images from '../../assets/database/Images/images.js'

let db;

class Frise extends React.Component{
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
      isMicro : true,
      Micro : 'Micro',
      isIHM : false,
      Ihm : 'notIHM',
      isOS : false,
      Os : 'notOS',
      isCPU : false,
      Cpu : 'notCPU',
      isApp : false,
      App : 'notApp',
    }
    this.fetchDataBD()
  }

  setDatePicker = () =>{
    switch(this.state.pickerValue){
      case 'debut':
        this.setState({dateBasse:0,dateHaute:1973});
        break;
      case 'p1':
        this.setState({dateBasse:1973,dateHaute:1977});
        break;
      case 'p2':
        this.setState({dateBasse:1977,dateHaute:1992});
        break;
      case 'p3':
        this.setState({dateBasse:1992,dateHaute:2021});
        break;
      case 'tout':
        this.setState({dateBasse:0,dateHaute:2021});
        break;
    }
    this.fetchDataBD();
  }

  fetchDataBD = async() =>{
    let dirInfo;
    try {
      dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
    } catch(err) { Sentry.captureException(err) };
    if (!dirInfo.exists) {
      try {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
      } catch(err) { Sentry.captureException(err) }
    };
    await FileSystem.downloadAsync(Asset.fromModule(require("../../assets/database/NAMIP.db")).uri,
    `${FileSystem.documentDirectory}SQLite/NAMIP.db`);
    db = SQLite.openDatabase("NAMIP.db");
    let requete = "SELECT ID as id,TYPE,Annee as 'time',Nom as title,DescFR as description FROM GENERAL "+
                  "WHERE Annee >= ? and Annee < ? and TYPE REGEXP '"+this.state.Micro+"|"+
                  this.state.Os+"|"+this.state.Ihm+"|"+this.state.Cpu+"|"+this.state.App+"' ORDER BY Annee ASC,Nom ASC"
    db.transaction((tx) => {
        tx.executeSql(requete,[this.state.dateBasse,this.state.dateHaute],
          (tx,results)=>{
            var taille = results.rows.length
            let tableau = []
            for(let i=0;i<taille;i++){
              const data = this.addColorData(results.rows.item(i));
              data['Simplifie'] = this.state.isSimple;
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

    addColorData = (data) => {
      const date = parseInt(data.time);
      switch(true){
        case date < 1973 :
          data['lineColor'] = 'rgb(29,41,219)'
          data['circleColor'] = 'rgb(29,41,219)'
          break;
        case date >= 1973 && date < 1977 :
          data['lineColor'] = 'rgb(47,250,141)'
          data['circleColor'] = 'rgb(47,250,141)'
          break;
        case date >= 1977 && date < 1992 :
          data['lineColor'] = 'rgb(248,50,185)'
          data['circleColor'] = 'rgb(248,50,185)'
          break;
        case date >= 1992 :
          data['lineColor'] = 'rgb(250,190,27)'
          data['circleColor'] = 'rgb(250,190,27)'
          break;
      }
      return data;
    }

    renderDetail = (rowData,sectionID, rowID) =>{
      let title = <Text style = {styles.title}>{rowData.title}</Text>
      var desc = null
      if(!rowData.Simplifie)
        desc = (
          <View style={styles.main_content}>
            <Image source={images[rowData.id]} style={styles.image}/>
            <Text style={[styles.description]} numberOfLines={6}>{rowData.description}</Text>
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
      if(data.TYPE === 'Micro'){
        this.props.navigation.navigate("Detail",{dataOrdinateur: data})
      }
      else if(data.TYPE === 'CPU'){
        this.props.navigation.navigate("Detail",{dataOrdinateur: data})
      }
      else if(data.TYPE === 'APP'){
        this.props.navigation.navigate("Detail",{dataOrdinateur: data})
      }
      else if(data.TYPE === 'OS'){
        this.props.navigation.navigate("Detail",{dataOrdinateur: data})
      }
    }

    render(){
      return(
        <View style = {styles.main}>
          <View style = {styles.titre}>
            <Text style = {styles.text}>{i18n.t('friseTexte')}</Text>
          </View>
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
              <Picker.Item label={i18n.t('DebutDev')} color='rgb(29,41,219)' value='debut'/>
              <Picker.Item label={i18n.t('Phase1')} color='rgb(47,250,141)' value='p1'/>
              <Picker.Item label={i18n.t('Phase2')} color='rgb(248,50,185)' value='p2'/>
              <Picker.Item label={i18n.t('Phase3')} color='rgb(250,190,27)' value='p3'/>
            </Picker>
            <CheckBox
              tintColors = {{true : 'white',false : 'lightgray'}}
              tintColor = {{true : 'white',false : 'lightgray'}}
              value={this.state.isSimple}
              onValueChange={(newValue) => this.setState({isSimple : newValue},() => {this.fetchDataBD()})}
            />
            <Text style={styles.CheckText}>{i18n.t("SimpleCheck")}</Text>
          </View>
          <View style = {styles.legendeBas}>
            <View style = {styles.checkbox}>
              <CheckBox
                tintColors = {{true : 'white',false : 'lightgray'}}
                tintColor = {{true : 'white',false : 'lightgray'}}
                value={this.state.isMicro}
                onValueChange={(newValue) => this.setState({isMicro : newValue,Micro : this.state.isMicro ? 'notMicro' : 'Micro'},() => {this.fetchDataBD()})}
              />
              <Text style={styles.CheckText}>{i18n.t("MicroCheck")}</Text>
            </View>
            <View style = {styles.checkbox}>
              <CheckBox
                tintColors = {{true : 'white',false : 'lightgray'}}
                tintColor = {{true : 'white',false : 'lightgray'}}
                value={this.state.isOS}
                onValueChange={(newValue) => this.setState({isOS : newValue,Os : this.state.isOS ? 'notOS' : 'OS'},() => {this.fetchDataBD()})}
              />
              <Text style={styles.CheckText}>{i18n.t("OsCheck")}</Text>
            </View>
            <View style = {styles.checkbox}>
              <CheckBox
                tintColors = {{true : 'white',false : 'lightgray'}}
                tintColor = {{true : 'white',false : 'lightgray'}}
                value={this.state.isIHM}
                onValueChange={(newValue) => this.setState({isIHM : newValue,Ihm : this.state.isIHM ? 'notIHM' : 'IHM'},() => {this.fetchDataBD()})}
              />
              <Text style={styles.CheckText}>{i18n.t("IhmCheck")}</Text>
            </View>
            <View style = {styles.checkbox}>
              <CheckBox
                tintColors = {{true : 'white',false : 'lightgray'}}
                tintColor = {{true : 'white',false : 'lightgray'}}
                value={this.state.isCPU}
                onValueChange={(newValue) => this.setState({isCPU : newValue,Cpu : this.state.isCPU ? 'notCPU' : 'CPU'},() => {this.fetchDataBD()})}
              />
              <Text style={styles.CheckText}>{i18n.t("CpuCheck")}</Text>
            </View>
            <View style = {styles.checkbox}>
              <CheckBox
                tintColors = {{true : 'white',false : 'lightgray'}}
                tintColor = {{true : 'white',false : 'lightgray'}}
                value={this.state.isApp}
                onValueChange={(newValue) => this.setState({isApp : newValue,App : this.state.isApp ? 'notApp' : 'APP'},() => {this.fetchDataBD()})}
              />
              <Text style={styles.CheckText}>{i18n.t("AppCheck")}</Text>
            </View>
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
    backgroundColor : 'black'
  },
  //Titre
  titre:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 2,
    borderColor : 'white'
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
    borderBottomWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderColor : 'white'
  },
  legendeBas:{
    flex:1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    flexWrap : 'wrap',
    alignContent : 'center',
    borderBottomWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderColor : 'white'
  },
  checkbox:{
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 10
  },
  picker:{
    height : 50,
    width : 130
  },
  CheckText:{
    color:'white',
    fontWeight:'bold',
    fontSize : 12,
    marginRight : 15,
    marginLeft : 2,
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
  description:{
    color:'lightgray',
    flex:2,
    paddingLeft : 10
  },
  image:{
    flex:1,
    margin : 5,
    borderWidth : 2,
    borderColor : 'white',
    resizeMode : 'contain',
    height : 100,
    width : 100
  }
})

export default Frise
