import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native';
import images from '../../assets/Quiz/images/images'

class MultipleQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      image : this.props.question.idImage == undefined ? false : true,
      idQuestion : this.props.question.id,
      reponse : null,
      optionChoisie : null,
      desactiveReponse : false,
      score : this.props.score
    }
  }

  //Fonction qui valide la réponse et transfère le score au composant principal
  validerReponse = async(option) =>{
    await this.setState({optionChoisie : option,desactiveReponse : true,reponse : this.props.question.answer},
    () => {
      if(option == this.state.reponse){
        this.setState({score : this.state.score+1})
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
        reponse : null,
        optionChoisie : null,
        desactiveReponse : false,
        score : this.props.score
      })
    }
  }

  render(){
    const question = this.props.question;
    return(
      <View style = {styles.main}>
        <View style = {styles.question}>
          <Text style = {styles.styleQuestion}>{question.question}</Text>
        </View>
        {this.state.image &&
          <View style = {styles.image}>
            <Image style = {styles.images} source = {images[question.idImage]}/>
          </View>
        }
        <View style = {styles.reponse}>
          {
            question.allChoices.map(answer => (
              <TouchableOpacity
              style =
              {{
                backgroundColor : answer == this.state.reponse ? 'lightgreen' : answer == this.state.optionChoisie ? 'rgba(255,0,0,0.6)' : 'white',
                borderColor : answer == this.state.reponse ? 'green' : answer == this.state.optionChoisie ? 'red' : 'lightgray',
                borderWidth : 2,
                borderRadius : 25,
                flexDirection : 'row',
                justifyContent : 'center',
                alignItems : 'center',
                margin : 10,
                height : 40
              }}
              key = {answer}
              disabled = {this.state.desactiveReponse}
              onPress = {() => this.validerReponse(answer)}
              >
                <Text style={styles.styleTouchable}>{answer}</Text>
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
  reponse : {
    margin : 5,
    flex : 5
  },
  styleTouchable : {
    fontWeight : 'bold',
    fontSize : 15,
  }
})
export default MultipleQuestion;
