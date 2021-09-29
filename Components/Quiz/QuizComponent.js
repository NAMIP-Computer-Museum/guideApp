import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Pressable,Text,Image} from 'react-native';
import MultipleQuestion from './MultipleQuestion';
import WritingQuestion from './WritingQuestion';
import i18n from '../../Language/Translate'
import quiz from '../../assets/Quiz/quizData';

let questions;

class QuizComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      indexQuestion : 0,
      score : 0,
      afficheScore : false,
      questionSuivante : false,
      derniereQuestion : false
    }
    questions = this.randomQuestions(quiz,5); // TODO remoe hardcoded constant
  }

  randomQuestions = (quizData,numberQuestions) =>{
    const reponse = [];
    const questions = [...quizData];
    for(let i = 0;i<numberQuestions;i++){
      let random = Math.floor(Math.random()*questions.length);
      reponse.push(questions[random]);
      questions.splice(random,1);
    }
    return reponse;
  }

  continue = (score) =>{
    this.setState({score : score});
    if(this.state.indexQuestion+1 == questions.length){
      this.setState({questionSuivante : false,derniereQuestion : true})
    }
    else{
      this.setState({questionSuivante : true})
    }
  }

  changeQuestion = async() =>{
    this.setState({indexQuestion : this.state.indexQuestion+1,questionSuivante:false})
  }

  afficheScore = () =>{
    this.setState({afficheScore : true});
  }

  resetQuiz = () =>{
    this.setState({
      indexQuestion : 0,
      score : 0,
      afficheScore : false,
      questionSuivante : false,
      derniereQuestion : false,
    })
    questions = this.randomQuestions(quiz,3);
  }

  render(){
    if(!this.state.afficheScore){
     return(
      <View style = {styles.main}>
        <Text style = {styles.enCours}>{i18n.t("questionQuiz")} : {this.state.indexQuestion+1} / {questions.length}</Text>
        {questions[this.state.indexQuestion].questionType === "multiple" &&
          <View style = {styles.question}>
            <MultipleQuestion continue = {this.continue} question = {questions[this.state.indexQuestion]} score={this.state.score}/>
          </View>
        }
        {questions[this.state.indexQuestion].questionType === "writing" &&
          <View style = {styles.question}>
            <WritingQuestion continue = {this.continue} question = {questions[this.state.indexQuestion]} score={this.state.score}/>
          </View>
        }
        {this.state.questionSuivante && !this.state.derniereQuestion &&
          <View style = {styles.continue}>
            <Pressable style={styles.button} onPress = {() => {this.changeQuestion()}}>
              <Text style={styles.text_button}>{i18n.t("continueQuiz")}</Text>
            </Pressable>
          </View>
        }
        {this.state.derniereQuestion &&
          <View style = {styles.continue}>
            <Pressable style={styles.button} onPress = {() => {this.afficheScore()}}>
              <Text style={styles.text_button}>{i18n.t("scoreQuiz")}</Text>
            </Pressable>
          </View>
        }
      </View>
     )
    }
    else{
      return(
        <View style = {styles.main}>
          <View style = {styles.titre}>
            <Text style = {styles.text}>{i18n.t("scoreQuiz")}</Text>
          </View>
          <View style = {styles.affiche}>
            <Text style = {styles.textScore}>{i18n.t("resultatQuiz")} : {this.state.score} / {questions.length}</Text>
            <Image style = {styles.image} source = {this.state.score/questions.length >= 0.5 ? require('../../assets/Quiz/congratulation.png') : require('../../assets/Quiz/fail.png')}/>
            <Pressable style={styles.button} onPress = {() => {this.resetQuiz()}}>
              <Text style={styles.text_button}>{i18n.t("resetQuiz")}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress = {() => {this.props.navigation.goBack()}}>
              <Text style={styles.text_button}>{i18n.t("backAccueil")}</Text>
            </Pressable>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main : {
    flex : 1,
    backgroundColor : 'black',
  },
  enCours: {
    flex : 0.8,
    color : 'white',
    fontWeight : 'bold',
    fontSize : 20,
    textAlign : 'center',
    marginTop : 5,
    textDecorationLine : 'underline'
  },
  question:{
    flex : 10
  },
  continue : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  button:{
    backgroundColor : 'white',
    borderRadius : 10,
    width : 200,
    height : 45,
    marginVertical : 5,
    justifyContent : 'center',
    alignItems : 'center'
  },
  text_button:{
    textAlign : 'center',
    fontSize : 20,
    fontWeight : 'bold'
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
    fontSize : 30,
    margin : 5,
  },
  affiche:{
    flex : 9,
    justifyContent : 'center',
    alignItems : 'center'
  },
  textScore:{
    textAlign : 'center',
    color : 'white',
    fontWeight: 'bold',
    fontSize : 30,
    margin : 5,
    borderBottomWidth : 2,
    borderBottomColor : 'white'
  },
  image : {
    margin : 10,
    width : "30%",
    height : "15%",
    resizeMode : 'contain',
  }
})

export default QuizComponent
