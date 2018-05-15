/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store,{persistor}from './Store';

//import AddUserPageContainer from "./container/AddUserPageContainer";
import NavigationContainer from './containers/NavigationPageContainer';
import HeaderPage1 from './components/HeaderPage1';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/*<AddUserPageContainer />*/}
                <PersistGate loading={ <HeaderPage1 />}  persistor={persistor}>
                    <NavigationContainer />
                </PersistGate>
            </Provider>);
    }
}
