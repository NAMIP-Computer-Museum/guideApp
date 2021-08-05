import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Acceuil from '../Components/Acceuil'
import Frise from '../Components/FriseChronologique/Frise'
import Detail from '../Components/FriseChronologique/Detail'
import AfficheImage from '../Components/FriseChronologique/AfficheImage'
import ListeVideo from '../Components/Video/ListeVideo'
import AfficheVideo from '../Components/Video/AfficheVideo'
import QRCode from '../Components/QRCode/QRCodeScan'
import Contact from '../Components/Contact/Contact.js'


const Navigation = createStackNavigator({
    Accueil:{
      screen: Acceuil,
      navigationOptions:{
        headerShown : false
      }
    },
    Frise:{
      screen : Frise,
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
    Contact:{
        screen : Contact,
      navigationOptions:{
        title : ""
      }
    }
})

export default createAppContainer(Navigation)
