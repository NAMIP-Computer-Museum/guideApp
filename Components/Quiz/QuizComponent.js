import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Pressable,Text,Image,Animated, Modal, ImageBackground} from 'react-native';
import MultipleQuestion from './MultipleQuestion';
import WritingQuestion from './WritingQuestion';
import i18n from '../../Language/Translate'
import quiz from '../../assets/Quiz/quizData';
import quizKids from '../../assets/Quiz/quizDataKids.js';
import quizMax from '../../assets/Quiz/quizMax.js'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

let questions;
let progress;
let niveau;

class QuizComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      indexQuestion : 0,
      score : 0,
      afficheScore : false,
      questionSuivante : false,
      derniereQuestion : false,
      progress: new Animated.Value(0),
      niveau : this.props.navigation.state.params.levelQuiz
    }
    niveau = this.props.navigation.state.params.levelQuiz;
    if(niveau === "difficile"){
      questions = this.randomQuestions(quiz,10);
    }
    else {
    questions = this.randomQuestions(quizKids,10);
  }
    progress = this.state.progress.interpolate({
      inputRange: [0, questions.length],
      outputRange: ['10%', '100%']
    });
  }

  //Fonction qui pioche des questions de manière aléatoire dans la liste de questions
  randomQuestions = (quizData,numberQuestions) =>{
    const questionsSelected = [];
    const questionsList = [...quizData];
    for(let i = 0;i<numberQuestions;i++){
      let random = Math.floor(Math.random()*questionsList.length);
      questionsSelected.push(questionsList[random]);
      //Splice ajoute ou supprime des données dans un tableau
      questionsList.splice(random,1);
    }
    return questionsSelected;
  }

  //Fonction qui mets à jour le score et valide l'affichage des boutons suivant ou score
  continue = (score) =>{
    this.setState({score : score});
    if(this.state.indexQuestion+1 == questions.length){
      this.setState({questionSuivante : false,derniereQuestion : true})
    }
    else{
      this.setState({questionSuivante : true})
    }
  }

  //Fonction qui change l'index de la question courante pour passer à la question suivante
  changeQuestion = async() =>{
    this.setState({indexQuestion : this.state.indexQuestion+1,questionSuivante:false});
    Animated.timing(this.state.progress,{
      toValue: this.state.indexQuestion+2,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  //Fonction qui valide l'affiche du score
  afficheScore = () =>{
    this.setState({afficheScore : true});
  }

  //Fonction qui reset les variables du state et retire d'autres questions
  resetQuiz = () =>{
    this.setState({
      indexQuestion : 0,
      score : 0,
      afficheScore : false,
      questionSuivante : false,
      derniereQuestion : false,
      niveau : null
    })
    questions = this.randomQuestions(quiz,quizMax);
    Animated.timing(this.state.progress,{
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  render(){
    if(!this.state.afficheScore){
     return(
      <View style = {styles.main}>
        <ImageBackground style={styles.ImageBackground} resizeMode = 'cover' source = {require('../../assets/Accueil/binaryBackground.png')}>
        <View style = {styles.progressBar}>
          <Animated.View style = {[styles.animationProgressBar, {width: progress}]}>
          </Animated.View>
        </View>
        <Text style = {styles.enCours}>{this.state.indexQuestion+1} / {questions.length}</Text>
        {questions[this.state.indexQuestion].questionType === "multiple" &&
          <View style = {styles.question}>
            <MultipleQuestion continue = {this.continue} question = {questions[this.state.indexQuestion]} score={this.state.score} niveau={this.state.niveau}/>
          </View>
        }
        {questions[this.state.indexQuestion].questionType === "writing" &&
          <View style = {styles.question}>
            <WritingQuestion continue = {this.continue} question = {questions[this.state.indexQuestion]} score={this.state.score} niveau={this.state.niveau}/>
          </View>
        }
        {this.state.questionSuivante && !this.state.derniereQuestion &&
          <View style = {styles.continue}>
            <Pressable disabled={false} style={styles.buttonNext} onPress = {() => {this.changeQuestion()}}>
              <Text style={styles.text_button}>{i18n.t("continueQuiz")}</Text>
            </Pressable>
          </View>
        }
        {this.state.derniereQuestion &&
          <View style = {styles.continue}>
            <Pressable disabled={false} style={styles.buttonNext} onPress = {() => {this.afficheScore()}}>
              <Text style={styles.text_button}>{i18n.t("scoreQuiz")}</Text>
            </Pressable>
          </View>
        }
        </ImageBackground>
      </View>
     )
    }
    else{
      return(
        <View style = {styles.main}>
          <View style = {styles.titre}>
            <Text style = {styles.text}>{i18n.t("scoreQuiz")}</Text>
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="none"
              transparent={false}
              visible={true}
            >
            <ImageBackground style={styles.ImageBackground} resizeMode = 'cover' source = {require('../../assets/Accueil/binaryBackground.png')}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{i18n.t("resultatQuiz")}</Text>
                  <View>
                    <Text style = {styles.textScore}> {this.state.score} / {questions.length}</Text>
                    <Text style = {styles.modalText}> {this.state.score / questions.length == 1 ? i18n.t("quizPerfect") : this.state.score / questions.length > 0.5 ? i18n.t("quizWin") : this.state.score / questions.length == 0.5 ? i18n.t("quizDraw") : i18n.t("quizLose")}</Text>
                    <Pressable style={styles.button} onPress = {() => {this.resetQuiz()}}>
                      <Text style={styles.text_button}>{i18n.t("resetQuiz")}</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress = {() => {this.props.navigation.navigate("Accueil")}}>
                      <Text style={styles.text_button}>{i18n.t("backAccueil")}</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              </ImageBackground>
            </Modal>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main : {
    flex : 1,
  },
  ImageBackground:{
    flex : 1,
  },
  enCours: {
    flex : 0.5,
    color : 'lightgrey',
    fontSize : 13,
    textAlign : 'left',
    marginLeft: 10
  },
  question:{
    flex : 18,
    marginTop: 7
  },
  continue : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  buttonNext:{
    backgroundColor : '#F25053',
    borderRadius : 4,
    width : 200,
    height : 45,
    marginVertical : 5,
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom: 100
  },
  button:{
    backgroundColor : '#F25053',
    borderRadius : 15,
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
  textScore:{
    textAlign : 'center',
    color : 'black',
    fontWeight: 'bold',
    fontSize : 20,
  },
  progressBar : {
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: progress,
    height: 17,
    borderRadius: 10,
    backgroundColor: "#141929"
  },
  animationProgressBar : {
    height : 17,
    borderRadius : 10,
    backgroundColor: "#FEE600"
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color : 'black',
    fontWeight: 'bold',
    fontSize : 30

  }
})

export default QuizComponent
