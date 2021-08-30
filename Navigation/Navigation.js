import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Accueil from '../Components/Accueil'
import Ligne from '../Components/LigneTempsMicro/LigneTemps'
import Detail from '../Components/DetailProduit/Detail'
import AfficheImage from '../Components/Affichage/AfficheImage'
import ListeVideo from '../Components/Videos/ListeVideo'
import AfficheVideo from '../Components/Affichage/AfficheVideo'
import QRCode from '../Components/QRCode/QRCodeScan'
import APropos from '../Components/APropos/APropos'


const Navigation = createStackNavigator({
    Accueil:{
      screen: Accueil,
      navigationOptions:{
        headerShown : false
      }
    },
    Frise:{
      screen : Ligne,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor:'white'
      }
    },
    Detail:{
      screen : Detail,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor:'white'
      }
    },
    Image:{
      screen : AfficheImage,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor:'white'
      }
    },
    ListeVideo:{
      screen : ListeVideo,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor:'white'
      }
    },
    AfficheVideo:{
      screen : AfficheVideo,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor:'white'
      }
    },
    QRCodeScan:{
      screen : QRCode,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor:'white'
      }
    },
    APropos:{
        screen : APropos,
      navigationOptions:{
        title : "",
        headerStyle:{
          backgroundColor: 'black'
        },
        headerTintColor:'white'
      }
    }
})

export default createAppContainer(Navigation)
