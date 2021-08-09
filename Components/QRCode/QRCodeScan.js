import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button,Pressable,Image} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset'
import * as SQLite from 'expo-sqlite'
import i18n from '../../Language/Translate'


export default function QRCode({navigation:{ navigate }}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  let db;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true);
    //navigate("Detail",{dataOrdinateur: data})
    const pieces = data.split("-");
    const id = parseInt(pieces[2]);
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
    db = SQLite.openDatabase("ordinateur.db")
    let requete
    if(i18n.locale === 'en'){
      requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS FROM Test WHERE id = ?"
    }
    else{
      requete = "SELECT No as id,type,annee as 'time',nom as title,Fabricant,CPU,RAM,ROM,OS FROM Test WHERE id = ?"
    }
    db.transaction((tx) => {
        tx.executeSql(requete,[id],
          (tx,results)=>{
            var taille = results.rows.length
            let tableau = []
            for(let i=0;i<taille;i++){
              tableau.push(results.rows.item(i))
            }
            if(taille > 0){
              navigate("Detail",{dataOrdinateur : tableau[0]})
            }
            else{
              alert(i18n.t("erreurScan"))
            }
          },
          (tx,error)=>{
            console.log('error',error)
          }
        )
    })
  }

  if (hasPermission === null) {
    return <Text>{i18n.t("permissionCamera")}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{i18n.t("refusCamera")}</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.layerTop}/>
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} >
          {scanned && <Pressable style={styles.button_Scan} onPress = {() => setScanned(false)}>
                      <Text style={styles.text_button}> {i18n.t("scanAgain")} </Text>
                      </Pressable>}
          </View>
          <View style={styles.layerRight} />
        </View>
      <View style={styles.layerBottom} />
    </View>
  );
}

const opacity = 'rgba(0, 0, 0, .9)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button_Scan:{
    backgroundColor : 'white',
    borderRadius : 6,
    width : 200,
    height : 50,
    //top : 100,
    marginVertical : 5,
    alignSelf : 'center',
    justifyContent : 'center',
    alignSelf : 'center'
  },
  text_button:{
    textAlign : 'center',
    fontSize : 20,
    fontWeight : 'bold',
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 2,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 2,
    backgroundColor: opacity
  },
  focused: {
    flex: 10,
    justifyContent : 'center',
    alignItems : 'center'
  },
  layerRight: {
    flex: 2,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});
