import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, Modal, ImageBackground } from 'react-native'
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import i18n from '../Language/Translate'
import DetailExpop from './DetailProduit/DetailExpop'

class Search extends React.Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      searchedText: ""
    }
  }

    //Fonction qui renvoie la requete à utiliser en fonction de la locale
    getRequete = () =>{
      let requete;
      let search = this.state.searchedText
      switch(i18n.locale){
        case "en":
          requete = "SELECT ID as id,PERIODE, Annee as time,Nom as title,DescEN as description, DescMotEN as descMotCle FROM GENERAL "+
                     "ORDER BY Annee ASC,Nom ASC";
          break;
        case "nl-NL":
          requete = "SELECT ID as id,PERIODE, Annee as time,Nom as title,DescNL as description, DescMotNL as descMotCle FROM GENERAL "+
                    "ORDER BY Annee ASC,Nom ASC";
          break;
        default:
          requete = "SELECT ID as id,IDObj, TYPE, Annee as time,Nom as title,DescFR as description, DescMotFR as descMotCle FROM GENERAL " +
                    "WHERE IDObj = '"+search+"' OR title = '"+search+"' ORDER BY Annee ASC,Nom ASC ";
          break;
      }

      return requete;
    }

    //Fonction qui a chercher les données des objets dans la BD
    fetchDataBD = async() =>{
      let db = SQLite.openDatabase("expop-v1.db");
      let requete = this.getRequete();
      console.log(requete)
      db.transaction((tx) => {
          tx.executeSql(requete,[],
            (tx,results)=>{
              let taille = results.rows.length
              let tableau = []
              for(let i=0; i<taille; i++){
                tableau.push(results.rows.item(i));
              }
              this.setState({data : tableau[0]})
              this.props.navigation.navigate("DetailExpop",{dataOrdinateur: this.state.data})
            },
            (tx,error)=>{
              console.log('error',error)
            }
          )
        })
      }

      _searchTextInputChanged(text) {
          this.state.searchedText = text
      }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Rechercher...'
          onChangeText={(text) => this._searchTextInputChanged(text)}
        />
        <Button title='Rechercher' onPress={() => this.fetchDataBD()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main : {
    flex : 1,
  },
  button:{
    backgroundColor : '#822125',
    borderRadius : 25,
    width : 200,
    height : 45,
    marginVertical : 5,
    justifyContent : 'center',
    alignItems : 'center',
    marginTop: 10
  },
  text_button:{
    textAlign : 'center',
    fontSize : 20,
    color : 'white'
  },
  titre:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderBottomWidth : 2,
    borderRightWidth : 2,
    borderLeftWidth : 2,
    borderColor : 'white'
  },
  text:{
    textAlign : 'center',
    color : 'white',
    fontWeight: 'bold',
    fontSize : 20,
    margin : 5,
  },
  centeredView: {
  flex: 5,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
},
 modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#0000",
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
ImageBackground:{
  flex : 1,
},
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color : 'black',
    fontWeight: 'bold',
    fontSize : 30

  },

  TextInput:{

  }
})

export default Search
