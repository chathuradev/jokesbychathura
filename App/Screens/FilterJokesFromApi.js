import React from 'react'
import {View, StyleSheet, Image, ImageBackground} from 'react-native'
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
  Form
} from 'native-base';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/Ionicons'
import appStyles from '../styles/styles'
import axios from 'axios'

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
        isLoading: true
    };
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

  componentDidMount() {
    this._fetchData(this.state.filters[0])
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
