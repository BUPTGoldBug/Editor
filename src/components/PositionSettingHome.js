'use strict';

import React, { Component } from 'react';
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
    Icon,
    Text,
    Card,
    Input,
    Item,
    List,
    Form,
    CardItem,
    ListItem,
    Thumbnail
} from "native-base";
import Icon1 from 'react-native-vector-icons/FontAwesome'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { View, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native'
import * as constant from '../util/Constant'
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import { TextInput, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';


export default class PositionSettingHome extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            count: 0
        };

    }

    onPress = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {

        const { isPosSetHomeVisible } = this.props;
        const { pointBasic } = this.props.navigation.state.params;

        console.log("ISPOSSETHOME Visible??>>>>>>>>");
        console.log(isPosSetHomeVisible);
        console.log(pointBasic);


        return (
            <View>
                <Modal isVisible={isPosSetHomeVisible} swipeDirection="right">
                    <View style={{ marginTop: 100, marginBottom: 100, marginLeft: 25, marginRight: 25, backgroundColor: "#D5EAE9", borderRadius: 5, flex: 1 }}>
                        <Form>
                            <Item>
                                <Text style={ {fontSize:16,margin:20, alignSelf:"center"}}>Click to Chose the END POINT</Text>
                            </Item>
                            <TouchableOpacity
                                style={{ alignSelf: "center", marginTop:50 }}
                                onPress={this.onPress}
                            >
                                <Image
                                    style={{ padding: 2, borderRadius:14 }}
                                    source={require('../../resource/line.jpg')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                        </Form>
                    </View>
                </Modal>
            </View>
        );


    }

}

/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
})*/

