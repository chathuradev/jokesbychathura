import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native'
import { Container, Content, Button, Form } from 'native-base'
import { responsiveHeight as hp, responsiveWidth as wp, responsiveFontSize as RF } from 'react-native-responsive-dimensions'
import appStyles from '../styles/styles'
import auth from '@react-native-firebase/auth'
import NavigationService from './NavigationService'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    //componentDidMount
  }

  _loginHandler() {
    const { email, password } = this.state
    if (email != '' && password != '') {
      auth().signInWithEmailAndPassword(email, password).then((user) => {
        console.log('User logged in!')
        NavigationService.navigate('Home', user)
      }).catch((error) => {
        console.log('User logging error', error)
      })
    } else {
      alert('Password and Email can not be empty!')
    }
  }

  render() {
    return (
      <Container>
        <ImageBackground source={require('../Assets/background.png')} style={styles.container} resizeMode={'cover'}>
          <Content style={[appStyles.logoScreensMargin]}>
            <View>
              <View style={{ alignSelf: 'center' }}>
                <Image
                  style={[appStyles.appLogoImage]}
                  source={require('../Assets/logo.png')}
                  resizeMode='contain'
                />
              </View>
              <View style={[{ marginTop: hp(5) }]}>
                <View style={appStyles.loginSocialView}>
                  <Form>
                    <TextInput
                      placeholder='Email'
                      placeholderTextColor='#919191'
                      keyboardType={'email-address'}
                      style={[appStyles.marginVt, appStyles.textInput, { color: 'white' }]}
                      onChangeText={value => { this.setState({ email: value }); }}
                      value={this.state.email}
                    />
                    <TextInput
                      placeholder='Password'
                      placeholderTextColor='#919191'
                      secureTextEntry
                      style={[appStyles.marginVt, appStyles.textInput, { color: 'white' }]}
                      onChangeText={value => { this.setState({ password: value }); }}
                      value={this.state.password}
                    />
                  </Form>
                </View>
              </View>
              <View style={[{ marginVertical: hp(2) }]}>
                <Button full style={[appStyles.redFullButton]} onPress={() => {this._loginHandler()}} >
                  <Text style={[appStyles.textWhiteButton]}>LOGIN</Text>
                </Button>
                <TouchableOpacity style={[{ marginTop: hp(2) }]}>
                  <Text style={[appStyles.textWhite, { textAlign: 'center', fontSize: RF(2) }]}>Don't have an account? <Text onPress={() => this.props.navigation.navigate('Register')} style={[appStyles.textBlue]}>Sign Up</Text></Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
