import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator, TransitionPresets } from "../libs/react-navigation-stack";
import ImagePickerExample from './image-picker/ImagePickerExample';
import LocationUpdate from './LocationUpdate';

import SocketioExample from './Socket.io';
import WebViewJavascriptResponse from './WebViewJavascriptResponse';

// import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';

class ScreenOne extends React.Component {
  // use in Stack navigator only
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View
        pointerEvents={'box-none'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'yellow',
        }}>
        <Text>Screen One{'\n\n\n\n'}</Text>

        <Button
          title="Go to two"
          onPress={() => this.props.navigation.navigate('routeTwo')}
        />
      </View>
    );
  }
}

class ScreenTwo extends React.Component {
  // use in Stack navigator only
  static navigationOptions = {
    title: 'Screen Two',
  };

  render() {
    return (
      <View
        pointerEvents={'box-none'}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Screen Two</Text>
        <Button
          title="Go to three"
          onPress={() =>
            this.props.navigation.navigate('routeThree', {
              greeting: 'Hallo',
            })
          }
        />
      </View>
    );
  }
}

class ScreenThree extends React.Component {
  render() {
    let greeting = this.props.navigation.getParam('greeting', 'Hi');

    return (
      <View
        pointerEvents={'box-none'}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Screen Three</Text>
        <Button
          title={`${greeting}! Go to one`}
          onPress={() => this.props.navigation.navigate('routeOne')}
        />
      </View>
    );
  }
}

// Notice the head and back link on top of the screen
const MyStackNavigator = createStackNavigator(
  {
    // ImagePickerExample: ImagePickerExample,
    LocationUpdate: LocationUpdate,
    routeOne: ScreenOne,
    routeTwo: ScreenTwo,
    routeThree: ScreenThree,
  },
  {
    // initialRouteName: 'main',
    // resetOnBlur: false,
    // backBehavior: 'history'

    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.FadeFromBottomAndroid,
      // cardOverlayEnabled: true,
      // cardOverlay: style => {
      //   return <View style={{backgroundColor: 'green'}} />;
      // },
      cardOverlayEnabled: true,
      cardStyle: {
        gestureEnabled: true,
        // cardOverlayEnabled: true,
        // pointerEvents: 'box-none',
        backgroundColor: 'rgba(49,114,34,0)',
        // backfaceVisibility: false,
      },
    },
  },
);

const MySwitchNavigator = createSwitchNavigator(
  {
    routeOne: ScreenOne,
    routeTwo: ScreenTwo,
    routeThree: ScreenThree,
  },
  {
    initialRouteName: 'routeOne',
  },
);

const AppContainer = createAppContainer(MyStackNavigator);

class App extends React.Component {
  render() {
    return <AppContainer />;
    // return <SocketioExample />;
    // switch between Stack and Switch navigator
    //return <MySwitchNavigator />;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
        <View
          style={{
            padding: 10,
          }}>
          <Button title={'Say Hi!'} onPress={() => alert('Hi')} />
        </View>
        <View
          pointerEvents={'box-none'}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          <AppContainer />
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
