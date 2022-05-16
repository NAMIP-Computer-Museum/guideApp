import React from 'react'
import { Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Accueil from '../Components/Accueil'
import Search from '../Components/Search'
import Ligne from '../Components/LigneTempsMicro/LigneTemps'
import Detail from '../Components/DetailProduit/Detail'
import DetailCPU from '../Components/DetailProduit/DetailCPU'
import DetailExpop from '../Components/DetailProduit/DetailExpop'
import Legende from '../Components/DetailProduit/Legende'
import AfficheImage from '../Components/Affichage/AfficheImage'
import ListeVideo from '../Components/Videos/ListeVideo'
import AfficheVideo from '../Components/Affichage/AfficheVideo'
import QRCode from '../Components/QRCode/QRCodeScan'
import APropos from '../Components/Information/APropos'
import Introduction from '../Components/Information/Introduction'
import ModeEmploi from '../Components/Information/ModeEmploi'
import Quiz from '../Components/Quiz/QuizComponent'
import QuizChoiceLevel from '../Components/Quiz/QuizChoiceLevel'
import LigneTempsChoix from '../Components/LigneTempsPerma/LigneTempsChoix'
import LigneTempsPerma from '../Components/LigneTempsPerma/LigneTempsPerma'

//Stack Navigator ou sont définis toutes nos pages
const Navigation = createStackNavigator({
    Accueil:{
      screen: Accueil,
      navigationOptions:{
        headerShown : false
      }
    },
    Legende:{
      screen: Legende
    },
    Frise:{
      screen : Ligne,
      navigationOptions:({navigation}) => {
        const {navigate} = navigation
        return {
          headerRight: () => <Icon name="home" size={30} color="white" style={{paddingRight: 10}} onPress={() => navigate('Accueil')} />,
          title:"",
          headerStyle:{
            backgroundColor: '#822125'
          },
        }
      },
    },
    LigneTempsPerma:{
      screen : LigneTempsPerma,
      navigationOptions:({navigation}) => {
        const {navigate} = navigation
        return {
          headerRight: () => <Icon name="home" size={30} color="white" style={{paddingRight: 10}} onPress={() => navigate('Accueil')} />,
          title:"",
          headerStyle:{
            backgroundColor: '#822125'
          },
        }
      },
    },
    LigneTempsChoix:{
      screen : LigneTempsChoix,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125',
          borderBottomWidth : 2,
          borderBottomColor : 'white'
        },
      }
    },
    Detail:{
      screen : Detail,
      navigationOptions:({navigation}) => {
        const {navigate} = navigation
        return {
          headerRight: () => <Icon name="home" size={30} color="white" style={{paddingRight: 10}} onPress={() => navigate('Accueil')} />,
          title:"",
          headerStyle:{
            backgroundColor: '#822125'
          },
        }
      },
    },
    DetailExpop:{
      screen : DetailExpop,
      navigationOptions:({navigation}) => {
        const {navigate} = navigation
        return {
          headerRight: () => <Icon name="home" size={30} color="white" style={{paddingRight: 10}} onPress={() => navigate('Accueil')} />,
          title:"",
          headerStyle:{
            backgroundColor: '#822125'
          },
        }
      },
    },
    DetailCPU:{
      screen : DetailCPU,
      navigationOptions:({navigation}) => {
        const {navigate} = navigation
        return {
          headerRight: () => <Icon name="home" size={30} color="white" style={{paddingRight: 10}} onPress={() => navigate('Accueil')} />,
          title:"",
          headerStyle:{
            backgroundColor: '#822125'
          },
        }
      },
    },
    Image:{
      screen : AfficheImage,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125'
        },
      }
    },
    ListeVideo:{
      screen : ListeVideo,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125',
          borderBottomWidth : 2,
          borderBottomColor : 'white'
        },
      }
    },
    AfficheVideo:{
      screen : AfficheVideo,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125'
        },
      }
    },
    QRCodeScan:{
      screen : QRCode,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125'
        },
      }
    },
    APropos:{
      screen : APropos,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125',
          borderBottomWidth : 2,
          borderBottomColor : 'white'
        },
      }
    },
    Introduction:{
      screen : Introduction,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125',
          borderBottomWidth : 2,
          borderBottomColor : 'white'
        },
      }
    },
    ModeEmploi : {
      screen : ModeEmploi,
      navigationOptions:({navigation}) => {
        const {navigate} = navigation
        return {
          headerRight: () => <Icon name="home" size={30} color="white" style={{paddingRight: 10}} onPress={() => navigate('Accueil')} />,
          title:"",
          headerStyle:{
            backgroundColor: '#822125'
          },
        }
      },
    },
    Search : {
      screen : Search,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125',
          borderBottomWidth : 2,
          borderBottomColor : 'white'
        },
      }
    },
    QuizChoiceLevel : {
      screen : QuizChoiceLevel,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: '#822125',
          borderBottomWidth : 2,
          borderBottomColor : 'white'
        },
      }
    },
    Quiz:{
      screen : Quiz,
      navigationOptions:({navigation}) => {
        const {navigate} = navigation
        return {
          headerRight: () => <Icon name="home" size={30} color="white" style={{paddingRight: 10}} onPress={() => navigate('Accueil')} />,
          title:"",
          headerStyle:{
            backgroundColor: '#822125'
          },
        }
      },
    }
})

export default createAppContainer(Navigation)
