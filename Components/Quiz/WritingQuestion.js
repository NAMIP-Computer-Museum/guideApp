import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,TextInput,Text,Pressable,Image} from 'react-native';
import images from '../../assets/Quiz/images/images'
import imagesKids from '../../assets/Quiz/images/imageskids';
import i18n from '../../Language/Translate'
//import QuizComponent from './QuizComponent';

class WritingQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      image : this.props.question.idImage == undefined ? false : true,
      idQuestion : this.props.question.id,
      couleurReponse : 'white',
      reponseFinal : null,
      textEcrit : null,
      reponseQuestion : null,
      reponseFausse : false,
      desactiveEditable : true,
      score : this.props.score,
      niveau : this.props.niveau
    }
  }

  //Fonction qui valide la réponse et transfère le score au composant principal
  validateAnswer = async() => {
    await this.setState({reponseFinal : this.state.textEcrit,desactiveEditable : false,reponseQuestion : this.props.question.answer},
    () => {
      if(this.state.reponseFinal != null && this.state.reponseFinal.toLowerCase() == this.state.reponseQuestion.toLowerCase()){
        this.setState({score : this.state.score+1,couleurReponse : 'green'});
      }
      else{
        this.setState({reponseFausse : true,couleurReponse : 'red'})
      }
    })
    this.props.continue(this.state.score);
  }

  //Fonction qui met à jour les variables du state lors d'un changement de question
  componentDidUpdate(){
    if(this.state.idQuestion != this.props.question.id){
      this.setState({
        image : this.props.question.idImage == undefined ? false : true,
        idQuestion : this.props.question.id,
        couleurReponse : 'white',
        reponseFinal : null,
        textEcrit : null,
        reponseQuestion : null,
        reponseFausse : false,
        desactiveEditable : true,
        score : this.props.score,
        niveau : this.props.niveau
      })
    }
  }

  render(){
    console.log("Valeur de this.state.niveau à l'entrée du render de " + this.state.niveau)
    const question = this.props.question;
    return(
      <View style = {styles.main}>
        <View style = {styles.question}>
          <Text style = {styles.styleQuestion}>{question.question}</Text>
        </View>
        {this.state.image &&
          <View style = {styles.image}>
            { this.state.niveau == "facile" ?
            <Image style = {styles.images} source = {imagesKids[question.idImage]}/>:
            <Image style = {styles.images} source = {images[question.idImage]}/>}
          </View>
        }
        <View style = {styles.textInput}>
          <TextInput
            style =
            {{
              color : this.state.couleurReponse,
              fontSize : 20,
              fontWeight : 'bold',
              textDecorationLine : 'underline',
            }}
            autoCorrect = {false}
            editable = {this.state.desactiveEditable}
            onChangeText={text => this.setState({textEcrit : text})}
            value = {this.state.textEcrit}
            textAlign = 'center'
            placeholder = {i18n.t("reponseWritingQuestion")}
            placeholderTextColor = 'white'
            selectionColor = 'white'
          />
        </View>
        {this.state.reponseFausse &&
          <View style = {styles.reponse}>
            <Text style = {styles.styleReponse}>{i18n.t("reponseWritingQuestion")}{this.state.reponseQuestion}</Text>
          </View>
        }
        <View style = {styles.validate}>
          <Pressable style={styles.button} onPress = {() => {this.validateAnswer()}} disabled = {this.state.reponseFinal != null ? true : false}>
            <Text style={styles.text_button}>{i18n.t("validerReponse")}</Text>
          </Pressable>
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
    marginBottom : 10
  },
  styleQuestion : {
    color : 'white',
    fontWeight : 'bold',
    fontSize : 20,
    textAlign : 'center',
    textDecorationLine : 'underline'
  },
  image:{
    flex : 2,
    alignItems : 'center',
    justifyContent : 'center',
    alignSelf : 'center',
    padding : 5,
    height : "50%",
    width : "60%",
    borderWidth : 2,
    borderColor : 'white'
  },
  images : {
    height : "100%",
    width : "100%",
    resizeMode : 'contain'
  },
  textInput : {
    flex : 0.3,
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 2,
    borderColor : 'white',
    borderRadius : 10,
    margin : 5
  },
  reponse:{
    flex : 0.3,
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 2,
    borderColor : 'white',
    borderRadius : 10,
    margin : 5
  },
  styleReponse:{
    color : 'white',
    fontWeight : 'bold',
    fontSize : 20,
    textAlign : 'center',
    textDecorationLine : 'underline'
  },
  validate : {
    flex : 0.5,
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
});

export default WritingQuestion;
