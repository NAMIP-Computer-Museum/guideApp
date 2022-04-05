import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import images from '../../assets/Quiz/images/images';
import imagesKids from '../../assets/Quiz/images/imageskids.js';
import i18n from '../../Language/Translate'
//import QuizComponent from './QuizComponent';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class MultipleQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      image : this.props.question.idImage == undefined ? false : true,
      idQuestion : this.props.question.id,
      reponse : null,
      optionChoisie : null,
      desactiveReponse : false,
      nbEssais: 0,
      nbEssaisMax: (this.props.question.allChoices).length-1,
      dernieresReponses: [],
      score : this.props.score,
      niveau : this.props.niveau
    }

  }

  //Fonction qui valide la réponse et transfère le score au composant principal
  validerReponse = async(option) =>{
    await this.setState({optionChoisie : option,desactiveReponse : true,reponse : this.props.question.answer},
    () => {
      if(option == this.state.reponse && this.state.nbEssais < this.state.nbEssaisMax-1){
        this.setState({score : this.state.score+=1});
        this.props.continue(this.state.score)
      }else{
        if(this.state.nbEssais < this.state.nbEssaisMax-1){
          this.setState({desactiveReponse: false, nbEssais: this.state.nbEssais+1});
          this.state.dernieresReponses.push(option);
        }else{
          this.props.continue(this.state.score)
        }
      }
    })
  }

  //Fonction qui met à jour les variables du state lors d'un changement de question
  componentDidUpdate(){
    if(this.state.idQuestion != this.props.question.id){
      this.setState({
        image : this.props.question.idImage == undefined ? false : true,
        idQuestion : this.props.question.id,
        reponse : null,
        optionChoisie : null,
        nbEssais: 0,
        nbEssaisMax: (this.props.question.allChoices).length-1,
        desactiveReponse : false,
        dernieresReponses: [],
        score : this.props.score,
        niveau : this.props.niveau
      })
    }
  }

  render(){
    console.log("Valeur de this.state.niveau à l'entrée du render de MultipleQuestion : " + this.state.niveau)
    const question = this.props.question;
    return(
      <View style = {styles.main}>
        <View style = {styles.question}>
        {this.state.niveau == "facile" ?
          <Text style = {styles.styleQuestion}>{i18n.t("quizDataKids" + question.id)}</Text>:
          <Text style = {styles.styleQuestion}>{i18n.t("quizData" + question.id)}</Text>}
        </View>
        {this.state.image &&
          <View style = {styles.image}>
            { this.state.niveau == "facile" ?
            <Image style = {styles.images} source = {imagesKids[question.idImage]}/>:
            <Image style = {styles.images} source = {images[question.idImage]}/>}
          </View>
        }
        <View style = {styles.reponse}>
          {
            question.allChoices.map(answer => (
              <TouchableOpacity
              style =
              {{
                backgroundColor : answer == this.state.reponse && this.state.desactiveReponse ? '#8AD75B' + 40 : answer == this.state.optionChoisie || this.state.dernieresReponses.includes(answer) ? '#F92424' + 40 : '#3C4A7C',
                borderColor: answer == this.state.reponse && this.state.desactiveReponse ? '#B9E79C' : answer == this.state.optionChoisie || this.state.dernieresReponses.includes(answer) ? '#FA4C4C' : '#495A97',
                borderWidth : 3,
                borderRadius : 12,
                flexDirection : 'row',
                justifyContent : 'space-between',
                alignItems : 'center',
                margin : 10,
                height : 45
              }}
              key = {answer}
              disabled = {this.state.desactiveReponse}
              onPress = {() => this.validerReponse(answer)}
              >
                <Text style={styles.textTouchableOpacity}>{answer}</Text>
                <View>
                  { answer == this.state.reponse && this.state.desactiveReponse ?(
                    <View style = {styles.checkItem}>
                      <MaterialCommunityIcons name="check" style ={{
                        color: "white",
                        fontSize: 20
                      }} />
                    </View>
                  ): this.state.optionChoisie == answer || this.state.dernieresReponses.includes(answer)?
                    (
                      <View style = {styles.closeItem}>
                        <MaterialCommunityIcons name="close" style ={{
                          color: "white",
                          fontSize: 20
                        }} />
                      </View>
                    ):null
                  }
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main : {
    flex : 1
  },
  question : {
    alignItems : 'center',
    marginTop:5,
    marginBottom : 10
  },
  styleQuestion : {
    color : 'white',
    fontSize : 20,
    textAlign : 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2
  },
  image:{
    flex : 2,
    alignItems : 'center',
    justifyContent : 'center',
    alignSelf : 'center',
    height : "50%",
    width : "60%",
    borderWidth : 2,
    borderColor : 'white',
    borderRadius: 12,
    marginBottom: 10
  },
  images : {
    height : "100%",
    width : "100%",
    resizeMode : 'cover',
    borderRadius: 10
  },
  reponse : {
    flex : 5
  },
  textTouchableOpacity : {
    color: 'white',
    fontSize : 15,
    marginLeft: 20
  },
  checkItem : {
    backgroundColor: "green",
    width : 30,
    height: 30,
    borderRadius: 30/2,
    justifyContent: "center",
    alignItems: 'center',
    marginRight: 10
  },
  closeItem : {
    backgroundColor: "red",
    width : 30,
    height: 30,
    borderRadius: 30/2,
    justifyContent: "center",
    alignItems: 'center',
    marginRight: 10
  }
})
export default MultipleQuestion;
