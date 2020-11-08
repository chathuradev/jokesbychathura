import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './App/store/index'
import { Root } from 'native-base'
import Navigation from './App/Screens'
import NavigationService from './App/Screens/NavigationService'

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  componentDidMount() {
    NavigationService.navigate('Splash')
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <Navigation />
        </Root>
      </Provider>
    )
  }
}