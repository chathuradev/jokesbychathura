import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, TextInput, } from 'react-native'
import { Container, Content, Button, Form } from 'native-base'
import { responsiveHeight as hp, responsiveWidth as wp, responsiveFontSize as RF } from 'react-native-responsive-dimensions'
import appStyles from '../styles/styles'
import auth from '@react-native-firebase/auth'


class Register extends React.Component {
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

  _signUpHandler() {
    const { email, password } = this.state
    if (email != '' && password != '') {
      auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log('User account created & signed in!')
        this.props.navigation.navigate('Home')
      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }
        console.error(error)
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
              <View style={[{ marginTop: hp(1) }]}>
                <View style={appStyles.loginSocialView}>
                  <Form>
                    <TextInput
                      placeholder='Email Address'
                      placeholderTextColor='#919191'
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
              <View style={[{ marginTop: hp(2) }]}>
                <Button full style={[appStyles.redFullButton]} onPress={() => this._signUpHandler()}>
                  <Text style={[appStyles.textWhiteButton]}>SIGN UP</Text>
                </Button>
                <TouchableOpacity style={[{ marginTop: hp(2) }]}>
                  <Text style={[appStyles.textWhite, { textAlign: 'center',fontSize:RF(2) }]}>Already have an account? <Text style={[appStyles.textBlue]} onPress={() => this.props.navigation.navigate('Login')}>Login</Text></Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})