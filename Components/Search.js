import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
import data from './Helpers'
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
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default Search
