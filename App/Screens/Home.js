import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native'
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Button,
  Text,
  Footer,
  FooterTab
} from 'native-base'
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/AntDesign'
import appStyles from '../styles/styles'
import auth from '@react-native-firebase/auth'
import axios from 'axios'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jokes: [],
      btnDisabled: false
    }
  }

  componentDidMount() {
    this._fetchRandomJoke()
  }

  async _fetchRandomJoke() {
    return await axios.request({
      baseURL: "https://official-joke-api.appspot.com/random_ten",
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'get'
    }).then(async (response) => {
      this.setState({ jokes: response.data, btnDisabled: false })
    }).catch(err => console.log(err))
  }

  _signOutHandler() {
    auth().signOut()
    .then(() => console.log('User signed out!'))
    .catch((error) => console.log('User signed out error', error))
  }

  _renderRandomJokeSection() {
      return(
        <View style={[{ marginHorizontal: wp(3) }]}>
          {this.state.jokes.map((joke, index) => {
            return(
              <View key={index} style={[{width: wp(90), padding: wp(3), backgroundColor: 'black', marginTop: wp(3), borderRadius: wp(2) }]}>
                <View>
                  <Text style={[{ color: 'white', fontSize: RF(2.5) }]}>{joke.setup}</Text>
                  <Text style={[{ color: 'orange', fontSize: RF(1.5) }]}>{joke.punchline}</Text>
                </View>
              </View>
            )
          })}
        </View>
      )
  }
  _fetchAgainHandler() {
    this.setState({ btnDisabled: true })
    this._fetchRandomJoke()
  }

  render() {
    const { jokes } = this.state
    return (
      <Container>
        <ImageBackground
          source={require('../Assets/background.png')}
          style={styles.container}
          resizeMode={'cover'}>

          <Header transparent style={[{ marginVertical: hp(2) }]}>
            <Left style={[{ flex: 1 }]}>
            <Button
                  transparent
                  onPress={() => this._signOutHandler()}>
                  <View style={[appStyles.signOut]}>
                    <Icon
                      name={'logout'}
                      size={RF(2.5)}
                      color={'white'}
                    />
                  </View>
                </Button>
            </Left>
            <Body style={appStyles.bodyStyle}>
              <Image
                style={[{ height: wp(7), width: wp(7) }]}
                source={require('../Assets/logosmall.png')}
                resizeMode="contain"
              />
            </Body>
            <Right style={[{ flex: 1 }]}>
              <Button
                  transparent
                  onPress={() => this.props.navigation.navigate('FilterJokesFromApi')}>
                  <View style={[appStyles.signOut]}>
                    <Icon
                      name={'filter'}
                      size={RF(2.5)}
                      color={'white'}
                    />
                  </View>
                </Button>
            </Right>
          </Header>

          <Content style={[{ marginHorizontal: wp(3) }]}>
            <View style={[{ marginVertical: hp(2), alignItems: 'center' }]}>
              <Text style={[{ color: 'white', fontSize: RF(3) }]}>{jokes.length == 0 ? <Text style={[{ color: '#ffb449', fontSize: RF(2) }]}>Loading...</Text> : this._renderRandomJokeSection()}</Text>
            </View>
          </Content>

          <Footer style={[{ borderColor: 'transparent', height: hp(10),backgroundColor:'#222324' },]}>
            <FooterTab style={[{ marginHorizontal: wp(2), marginVertical:hp(2), backgroundColor:'#222324' }]}>
              <Button
                full
                disabled={this.state.btnDisabled}
                style={[appStyles.redFullButton, { backgroundColor: this.state.btnDisabled ? 'gray' : 'red' }]}
                onPress={() => this._fetchAgainHandler()}>
                <Text style={appStyles.textWhiteButton}>LOAD MORE JOKES</Text>
              </Button>
            </FooterTab>
          </Footer>

        </ImageBackground>
      </Container>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
})