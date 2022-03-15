import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,Image} from 'react-native';
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'

class Legende extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
    this.fetchLegendeData(this.props.type,this.props.id);
  }
  render(){
    switch(this.props.type){
      case 'MICRO' :
        return(
        <View style = {styles.main}>
          <View style = {styles.legende}>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/annual.png')}/>
              <Text style = {styles.text}>{this.props.time}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeMicro/country.png')}/>
              <Text style = {styles.text}>{this.state.data.Pays}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/fabricant.png')}/>
              <Text style = {styles.text}>{this.state.data.Fabricant}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeMicro/os.png')}/>
              <Text style = {styles.text}>{this.state.data.OS}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeMicro/cpu.png')}/>
              <Text style = {styles.text}>{this.state.data.CPU}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeMicro/ram.png')}/>
              <Text style = {styles.text}>{this.state.data.RAM}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeMicro/rom.png')}/>
              <Text style = {styles.text}>{this.state.data.ROM}</Text>
            </View>
          </View>
        </View>
      )
      break;
    case 'CPU' :
      return(
        <View style = {styles.main}>
          <View style = {styles.legende}>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/annual.png')}/>
              <Text style = {styles.text}>{this.props.time}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/fabricant.png')}/>
              <Text style = {styles.text}>{this.state.data.Marque}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeCPU/transistor.png')}/>
              <Text style = {styles.text}>{this.state.data.Transistors}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeCPU/bits.png')}/>
              <Text style = {styles.text}>{this.state.data.Bits}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeCPU/frequency.png')}/>
              <Text style = {styles.text}>{this.state.data.Fréquence}</Text>
            </View>
          </View>
        </View>
      )
      break;
    case 'APP' :
      return(
        <View style = {styles.main}>
          <View style = {styles.legende}>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/annual.png')}/>
              <Text style = {styles.text}>{this.props.time}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeAPP/typeApp.png')}/>
              <Text style = {styles.text}>{this.state.data.TypeApp}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeAPP/developer.png')}/>
              <Text style = {styles.text}>{this.state.data.Developpeur}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeAPP/coding.png')}/>
              <Text style = {styles.text}>{this.state.data.Langage}</Text>
            </View>
            <View style = {styles.item}>
              <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeAPP/old-computer.png')}/>
              <Text style = {styles.text}>{this.state.data.Environnement}</Text>
            </View>
          </View>
        </View>
      )
      break;
     case 'OS':
      return(
       <View style = {styles.main}>
        <View style = {styles.legende}>
          <View style = {styles.item}>
            <Image style = {styles.icon} source = {require('../../assets/Detail/annual.png')}/>
            <Text style = {styles.text}>{this.props.time}</Text>
          </View>
          <View style = {styles.item}>
            <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeOS/developer.png')}/>
            <Text style = {styles.text}>{this.state.data.Fabricant}</Text>
          </View>
          <View style = {styles.item}>
            <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeOS/licensing.png')}/>
            <Text style = {styles.text}>{this.state.data.Licence}</Text>
          </View>
          <View style = {styles.item}>
            <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeOS/coding.png')}/>
            <Text style = {styles.text}>{this.state.data.Langage}</Text>
          </View>
          <View style = {styles.item}>
            <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeOS/cpu.png')}/>
            <Text style = {styles.text}>{this.state.data.Plateforme}</Text>
          </View>
        </View>
       </View>
      )
     break;
    case 'IHM':
    return(
    <View style = {styles.main}>
     <View style = {styles.legende}>
       <View style = {styles.item}>
         <Image style = {styles.icon} source = {require('../../assets/Detail/annual.png')}/>
         <Text style = {styles.text}>{this.props.time}</Text>
       </View>
       <View style = {styles.item}>
         <Image style = {styles.icon} source = {require('../../assets/Detail/LegendeIHM/engineer.png')}/>
         <Text style = {styles.text}>{this.state.data.Inventeur}</Text>
       </View>
      </View>
    </View>
    )
    break;
    }
  }

  //Fonction qui renvoie la requete pour récupérer les données en fonction du type de l'objet
  getRequete = (type) =>{
    let requete;
    switch (type) {
      case 'MICRO':
        requete = "Select Fabricant,Pays,CPU,RAM,ROM,OS from MICRO m WHERE m.ID = ?";
        break;
      case 'CPU' :
        requete = "SELECT Transistors,Bits,Fréquence,Marque from CPU c WHERE c.ID = ?"
        break;
      case 'APP' :
        requete = "SELECT TypeApp,Developpeur,Langage,Environnement from APP a WHERE a.ID = ?"
        break;
      case 'OS' :
        requete = "SELECT Fabricant,Licence,Langage,Plateforme from OS o WHERE o.ID = ?"
        break;
      case 'IHM' :
        requete = "SELECT Inventeur from IHM i WHERE i.ID = ?"
        break;
    }
    return requete;
  }

  //Fonction qui récupère les données pour la légende
  //Récupération de la requête qui change en fonction du type de l’objet
  //L'argument correspond à l’ID de l’objet à récupérer dans la table
  fetchLegendeData = async(type,id) =>{
    db = SQLite.openDatabase("namip.db");
    let requete = this.getRequete(type);
    const data = [];
    db.transaction((tx) => {
        tx.executeSql(requete,[id],
          (tx,results)=>{
            this.setState({data : results.rows.item(0)})
          },
          (tx,error)=>{
            console.log('error',error)
          }
        )
      })
  }
}

const styles = StyleSheet.create({
  main:{
    flex : 4
  },
  legende:{
    flex:1,
    flexDirection: 'row',
    flexWrap : 'wrap',
    marginVertical : 5
  },
  item:{
    margin : 5,
    flexDirection: 'row',
    alignItems : 'center',
    flexWrap : 'wrap',
  },
  icon:{
    width : 20,
    height : 20,
    marginHorizontal : 5,
    tintColor : 'white'
  },
  text:{
    fontSize : 20,
    fontWeight : 'bold',
    color:'white',
    marginLeft : 2
  }
})

export default Legende
