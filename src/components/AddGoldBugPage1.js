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
import { View } from 'react-native'
import * as constant from '../util/Constant'
import Modal from "react-native-modal";


import { TextInput, Image, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class AddGoldBugPage1 extends Component {
    constructor(props, context) {
        console.log("AddGoldBugPage1 props");
        console.log(props);

        super(props, context);

        this.setTimeChangeEvent = this.setTimeChangeEvent.bind(this);
        this.setPosChangeEvent = this.setPosChangeEvent.bind(this);
        this.setDeathTimeEvent = this.setDeathTimeEvent.bind(this);

        this.state = {
            lon: "200",
            lat: "300",
            planter: "luyao",
            timeIndex: "",
            timeP_1: "",
            timeP_2: "",
            posIndex: "",
            posP_1: "",
            posP_2: "",
            posP_3: "",
            deathTime: ""
        };
    }

    render() {
        const { isPage1Visible } = this.props;
        const { lon, lat, planter } = this.props.navigation.state.params;
        console.log("ISADDGOLDBUGPAGE1 isVisible?");
        console.log(isPage1Visible);

        return (
            <View>
                <Modal isVisible={isPage1Visible} swipeDirection="right">
                    <View style={{ marginTop: 120, marginLeft: 40, marginRight: 40, marginBottom: 150, backgroundColor: "#D5EAE9", borderRadius: 5, flex: 1, paddingTop: 70, paddingLeft: 25, paddingRight: 25, paddingBottom: 25 }}>
                        <Form>
                            <Item rounded style={{ backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                <Input placeholder='Time Change Setting' onChangeText={this.setTimeChangeEvent} />
                            </Item>

                            <Item rounded style={{ backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                <Input placeholder='Position Change Setting' onChangeText={this.setPosChangeEvent} />
                            </Item>

                            <Item rounded style={{ backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                <Input placeholder='GoldBug DeathTime' onChangeText={this.setDeathTimeEvent} />
                            </Item>
                        </Form>
                        <Button block rounded style={{ backgroundColor: "#ff00c9", height: 60, marginTop: 20 }} onPress={() => {
                            this.setState({ lon: lon });
                            this.setState({ lat: lat });
                            this.setState({ planter: planter });
                            this.props.actions.page1ToPage2({ bugBasic: this.state });
                        }}>
                            <Text >Next</Text>
                        </Button>
                    </View>
                </Modal>
            </View>
        );

    }



    setTimeChangeEvent(timeChange) {
        var arr = timeChange.split(",");
        if (arr.length == 3) {
            this.setState({ timeIndex: arr[0] });
            this.setState({ timeP_1: arr[1] });
            this.setState({ timeP_2: arr[2] });
        }
        else {
            this.setState({ timeIndex: "1" });
            this.setState({ timeP_1: "111" });
            this.setState({ timeP_2: "222" });
        }
    }

    setPosChangeEvent(posChange) {
        var arr = posChange.split(",");
        if (arr.length == 4) {
            this.setState({ posIndex: arr[0] });
            this.setState({ posP_1: arr[1] });
            this.setState({ posP_2: arr[2] });
            this.setState({ posP_3: arr[3] });
        }
        else {
            this.setState({ posIndex: "1" });
            this.setState({ posP_1: "111" });
            this.setState({ posP_2: "222" });
            this.setState({ posP_3: "333" });
        }
    }

    setDeathTimeEvent(deathTime) {

        this.setState({ deathTime: deathTime });
    }

}

    /*
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        /* Animated.timing(this.imageHeight, {
           duration: event.duration,
           toValue: IMAGE_HEIGHT_SMALL,
         }).start();
    };

    keyboardWillHide = (event) => {
        /* Animated.timing(this.imageHeight, {
           duration: event.duration,
           toValue: IMAGE_HEIGHT,
         }).start();
    };
    // paddingBottom: 15 , paddingTop: 70, 
    render() {
        return (

        );
    }*/
