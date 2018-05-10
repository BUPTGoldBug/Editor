'use strict';

import React, { Component } from 'react';
import { MapView, Offline } from 'react-native-amap3d';
import { AsyncStorage,Alert, StyleSheet, Text, TouchableOpacity, View, Image, Opac, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    //   Icon,
    Card,
    Input,
    Item,
    List,
    Form,
    CardItem,
    ListItem,
    Thumbnail,
    CheckBox,
    Spinner,
    Row,

} from "native-base";
import { Col, Grid } from 'react-native-easy-grid';
import renderIf from './renderIf';
import moment from 'moment';
//import index from './C:/Users/Luyao/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-native-datepicker';
import { styles as styless, route_pathName, coordinate ,getStrContent} from "../util/Constant"
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-vector-icons";
export default class HeaderPage1 extends Component {
    constructor(props, context) {
        console.log("首页")
        super(props, context);

    }
    componentDidMount(){
      

  
      

    }
    componentWillUnmount(){
        
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    金虫子
                 </Text>
            </View>
        )


    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
