import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Accueil from '../Components/Accueil'
import Ligne from '../Components/LigneTempsMicro/LigneTemps'
import Detail from '../Components/DetailProduit/Detail'
import AfficheImage from '../Components/DetailProduit/AfficheImage'
import ListeVideo from '../Components/Video/ListeVideo'
import AfficheVideo from '../Components/Video/AfficheVideo'
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
        title : ""
      }
    },
    Detail:{
      screen : Detail,
      navigationOptions:{
        title : ""
      }
    },
    Image:{
      screen : AfficheImage,
      navigationOptions:{
        title : ""
      }
    },
    ListeVideo:{
      screen : ListeVideo,
      navigationOptions:{
        title : ""
      }
    },
    AfficheVideo:{
      screen : AfficheVideo,
      navigationOptions:{
        title : ""
      }
    },
    QRCodeScan:{
      screen : QRCode,
      navigationOptions:{
        title : ""
      }
    },
    APropos:{
        screen : APropos,
      navigationOptions:{
        title : ""
      }
    }
})

export default createAppContainer(Navigation)
