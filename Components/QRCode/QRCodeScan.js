import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
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
    await FileSystem.downloadAsync(Asset.fromModule(require("../../assets/database/Ordinateur.db")).uri,
    `${FileSystem.documentDirectory}SQLite/ordinateur.db`);
    db = SQLite.openDatabase("ordinateur.db")
    let requete
    if(i18n.locale === 'en'){
      requete = 'Select * from ordinateurEN Where id = ?'
    }
    else{
      requete = 'Select * from ordinateurFR Where id = ?'
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
              alert("Aucun ID reconnue")
            }
          },
          (tx,error)=>{
            console.log('error',error)
          }
        )
    })
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
