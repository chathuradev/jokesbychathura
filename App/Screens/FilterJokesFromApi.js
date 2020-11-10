import React from 'react'
import {View, StyleSheet, Image, ImageBackground, Alert} from 'react-native'
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Button,
  Text,
  Picker,
  Form,
  Footer,
  FooterTab
} from 'native-base';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/Ionicons'
import appStyles from '../styles/styles'
import axios from 'axios'
import {fcmService} from '../FCMService'
import {localNotificationService} from '../LocalNotificationService'
import { FCMKey, FCMToken } from '../config/index'

class FilterJokesFromApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: '',
        jokes: [],
        filters: [
          "general",
          "programming",
          "knock-knock"
        ],
        isLoading: true,
        punchline: ''
    };
  }

  componentDidMount() {
    this._fetchData(this.state.filters[0])
    this._initializePushNotofications()
  }

  _initializePushNotofications() {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister: ", token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      Alert.alert(
        notify.title,
        notify.body
      )
    }
  }

  componentWillUnmount() {
    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }
  }

  async _handlePushNotofications() {
    let joke = ''

    // fetch a joke from the backend
    await axios.request({
      baseURL: "https://official-joke-api.appspot.com/random_joke",
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'get'
    }).then(async (response) => {
      joke = response.data.setup
      this.setState({ punchline: response.data.punchline })
    }).catch(err => console.log(err))

    let json = {
      to: FCMToken,
      notification: {
        title: '🤔 '+joke,
        body: '😂 ' + this.state.punchline,
        mutable_content: true
      }
    }
    await axios.post('https://fcm.googleapis.com/fcm/send', json, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+FCMKey
      }
    }).then(async (response) => {
      console.log(response.data)
    }).catch(err => console.log(err))
  }

  onValueChange(value) {
    this.setState({
      selected: value
    })
    this._fetchData(value)
  }

  async _fetchData(value) {
    return await axios.request({
      baseURL: "https://official-joke-api.appspot.com/" + "jokes/" + value + "/ten",
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'get'
    }).then(async (response) => {
      this.setState({ jokes: response.data })
    }).catch(err => console.log(err))
  }

  _renderFilterRandomJokeSection() {
    return (
      <View style={[{marginHorizontal: wp(3)}]}>
        {this.state.jokes.map((joke, index) => {
          return (
            <View
              key={index}
              style={[
                {
                  width: wp(90),
                  padding: wp(3),
                  backgroundColor: 'black',
                  marginTop: wp(3),
                  borderRadius: wp(2),
                },
              ]}>
              <View>
                <Text style={[{color: 'white', fontSize: RF(2.5)}]}>
                  {joke.setup}
                </Text>
                <Text style={[{color: 'orange', fontSize: RF(1.5)}]}>
                  {joke.punchline}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  _renderDropdown() {
    const { filters } = this.state
    return (
          <Form style={[{ }]}>
            <Picker
                mode="dropdown"
                style={[{ color: 'white' }]}
                placeholder="Jokes Type"
                placeholderStyle={{ color: "#2874F0" }}
                note={false}
                selectedValue={this.state.selected}
                onValueChange={(value) => { this.onValueChange(value) }}
            >
                {filters.map((filter, index) => {
                    return(
                        <Picker.Item key={index} label={filter} value={filter} />
                    )
                })}
            </Picker>
        </Form>
    )
  }

  render() {
    const { jokes } = this.state;
    return (
      <Container>
        <ImageBackground
          source={require('../Assets/background.png')}
          style={styles.container}
          resizeMode={'cover'}>
          <Header transparent style={[{marginVertical: hp(2)}]}>
            <Left style={[{flex: 1}]}>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack(null)}>
                <Icon
                  name={'ios-chevron-back'}
                  size={RF(3.5)}
                  color={'white'}
                />
              </Button>
            </Left>
            <Body style={appStyles.bodyStyle}>
              <Image
                style={[{height: wp(7), width: wp(7)}]}
                source={require('../Assets/logosmall.png')}
                resizeMode="contain"
              />
            </Body>
            <Right style={[{flex: 1}]}>
            </Right>
          </Header>

          <View style={[{ marginHorizontal: wp(5) }]}>
            {this._renderDropdown()}
          </View>

          <Content style={[{marginHorizontal: wp(3)}]}>
            <View style={[{marginVertical: hp(2), alignItems: 'center'}]}>
              <Text style={[{color: 'white', fontSize: RF(3)}]}>
                {jokes.length == 0 ? (
                  <Text style={[{color: '#ffb449', fontSize: RF(2)}]}>
                    Loading...
                  </Text>
                ) : (
                  this._renderFilterRandomJokeSection()
                )}
              </Text>
            </View>
          </Content>
          <Footer
            style={[
              {
                borderColor: 'transparent',
                height: hp(10),
                backgroundColor: '#222324',
              },
            ]}>
            <FooterTab
              style={[
                {
                  marginHorizontal: wp(2),
                  marginVertical: hp(2),
                  backgroundColor: '#222324',
                },
              ]}>
              <Button
                full
                style={appStyles.redFullButton}
                onPress={() => this._handlePushNotofications()}>
                <Text style={appStyles.textWhiteButton}>PUSH NOTIFICATION</Text>
              </Button>
            </FooterTab>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

export default FilterJokesFromApi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
