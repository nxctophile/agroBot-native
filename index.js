import {AppRegistry} from 'react-native';
import App from './App';
import SplashScreen from 'react-native-splash-screen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

setTimeout(() => {
  SplashScreen.hide();
}, 2000);
