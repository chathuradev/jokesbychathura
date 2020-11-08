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
  Footer,
  FooterTab,
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
import jokeFilters from '../constants/index'

class FilterJokes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: '',
        jokes: this.props.navigation.state.params.jokes,
        filters: [],
        filetredJokes: [],
        isLoading: false
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    })
    console.log('value--', value)
  }

  componentDidMount() {
    this._setFilters()
  }

  _setFilters() {
      const { jokes } = this.state
      var count = Object.keys(jokes).length
      let data = []
      for (var i=0; i<count; i++) {
          data.push(jokes[i].type)
      }
      const drop_down_data = data.filter((value, index) => data.indexOf(value) === index)
      this.setState({
          filters: drop_down_data,
          isLoading: false
        })
      console.log(drop_down_data)
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
    return (
        <Form>
            <Picker
                mode="dropdown"
                placeholder="Jokes Type"
                placeholderStyle={{ color: "#2874F0" }}
                note={false}
                selectedValue={this.state.selected}
                onValueChange={(value) => { this.onValueChange(value) }}
            >
                {this.state.filters.map((filter, index) => {
                    return(
                        <Picker.Item key={index} label={filter} value={filter} />
                    )
                })}
            </Picker>
        </Form>
    )
  }

  render() {
    const {jokes, isLoading} = this.state;
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

          {isLoading ? null : this._renderDropdown()}

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
                onPress={() => this.props.navigation.navigate('FilterJokes')}>
                <Text style={appStyles.textWhiteButton}>NEXT</Text>
              </Button>
            </FooterTab>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

export default FilterJokes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
