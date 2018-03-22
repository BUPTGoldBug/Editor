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
            deathTime: moment().format('YYYY-MM-DD HH:mm:ss')
        };

    }

    render() {
        const { isPage1Visible } = this.props;
        const { pointBasic } = this.props.navigation.state.params;
        console.log("ISADDGOLDBUGPAGE1 isVisible?");
        console.log(isPage1Visible);
        console.log("POINT GET FROM PAGE 1 IS ~~~~~~~~~");
        console.log(pointBasic.lon);
        console.log(pointBasic.lat);



        return (
            <View>
                <Modal isVisible={isPage1Visible} swipeDirection="right">
                    <View style={{ marginTop: 100, marginLeft: 40, marginRight: 40, marginBottom: 150, backgroundColor: "#D5EAE9", borderRadius: 5, flex: 1, paddingTop: 70, paddingLeft: 25, paddingRight: 25, paddingBottom: 25 }}>
                        <Form>
                            <Item rounded style={{ backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                <Input placeholder='Time Change Setting' onChangeText={this.setTimeChangeEvent} />
                            </Item>

                            <Item rounded style={{ backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                <Input placeholder='Position Change Setting' onChangeText={this.setPosChangeEvent} />
                            </Item>


                            <Item rounded style={{ backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                <DatePicker
                                    style={{ flex: 1, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
                                    date={this.state.deathTime}
                                    mode="datetime"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    minDate={moment().add(1, 'hours').format('YYYY-MM-DD')}
                                    maxDate={moment().add(3, 'months').format('YYYY-MM-DD')}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 3,
                                            marginLeft: 3
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }

                                    }}
                                    onDateChange={this.setDeathTimeEvent}
                                />
                            </Item>

                        </Form>
                        <Button block rounded style={{ backgroundColor: "#ff00c9", height: 60, marginTop: 18 }} onPress={() => {
                            var newState = Object.assign({}, this.state);
                            newState.lon = pointBasic.lon;
                            newState.lat = pointBasic.lat;
                            newState.planter = pointBasic.planter;

                            this.props.actions.page1ToPage2({ bugBasic: newState });
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

        console.log("The time you JUST chose is >>>>>>>>>>>>>>>>>");
        console.log(deathTime);
        this.setState({ deathTime: deathTime });
        var date = new Date(deathTime);
        var date1 = date.getTime();
        console.log("TIMESTAMP?????");
        console.log(date1);
        var date_ = new Date(moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'));
        console.log("TIME LIMIT IS >>>>");
        console.log(date_);
        var date_1 = date_.getTime();
        console.log("TIMESTAMP LIMIT ???????");
        console.log(date_1);
        if (date1 < date_1) {
            Alert.alert('Issue', '兄弟你干啥呢，至少一小时后');
            this.setState({ deathTime: moment().format('YYYY-MM-DD HH:mm:ss') });
        }
        else {

            console.log("The time just selected compared NOW is >>>>>>>>>>>>>>");
            console.log(moment(deathTime).fromNow());
        }
    }

}


