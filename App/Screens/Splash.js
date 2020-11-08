import React, {Component} from 'react'
import {View, Text, ImageBackground, ActivityIndicator} from 'react-native'
import {responsiveFontSize as RF} from 'react-native-responsive-dimensions'
import {StyleSheet} from 'react-native'
import auth from '@react-native-firebase/auth'
import NavigationService from './NavigationService'

let AppDetails = require('../../package.json')

export class Splash extends Component {
  _checkAuthStatus() {
    auth().onAuthStateChanged(user => {
        if (!user) {
          this.props.navigation.navigate('Login')
        } else {
          console.log('user---', user)
          NavigationService.navigate('Home', user)
        }
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this._checkAuthStatus()
    }, 5000)
    console.log(AppDetails.version)
  }

  render() {
    return (
      <ImageBackground
        source={require('../Assets/splash.jpg')}
        style={styles.container}
        resizeMode={'cover'}>
        <View style={[{marginTop: '40%'}]}>
          <ActivityIndicator
            animating={true}
            color={'#b31041'}
            style={[{}]}
            size={RF(4)}
          />
        </View>
        <View style={[{marginTop: '60%'}]}>
          <Text
            style={[{color: 'white', fontSize: RF(1.5), textAlign: 'center'}]}>
            v{AppDetails.version}{' '}
            <Text style={[{color: 'red'}]}>All rights reserved</Text>
          </Text>
          <Text
            style={[{color: 'white', fontSize: RF(1.2), textAlign: 'center'}]}>
            &#169; {new Date().getFullYear()} JokesByChathura
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
})
