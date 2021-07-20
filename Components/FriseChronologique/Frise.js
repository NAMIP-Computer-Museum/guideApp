import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Pressable,Image,TouchableOpacity} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import ordinateur from '../../Data/DonneesOrdinateur/DonneesOrdiFr.js'
import computer from '../../Data//DonneesOrdinateur/DonneesOrdiEn.js'
import i18n from '../../Language/Translate'

class Frise extends React.Component{

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

  testLocale(){
    if(i18n.locale === 'en'){
      //console.log(computer)
      return (computer)
    }
    return (ordinateur)
    //console.log(ordinateur)
  }

    onEventPress = (data) => {
      //console.log(data)
      this.props.navigation.navigate("Detail",{dataOrdinateur: data})
    }
    render(){
      return(
        <View style={styles.main}>
          <Text style={styles.text}>{i18n.t('friseTexte')}</Text>
          <Timeline style={styles.timeline}
            timeStyle = {styles.time}
            separator={true}
            data={this.testLocale()}
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
    borderRadius : 10
  }
})

export default Frise
