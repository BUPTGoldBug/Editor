'use strict';

import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
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
import { Picker, View, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native'
import * as constant from '../util/Constant'
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import renderIf from './renderIf'

import { TextInput, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class TimeSettingPage extends Component {
    constructor(props, context) {
        console.log("TimeSettingPage props");
        console.log(props);

        super(props, context);

        
        this.setStartTimeEvent = this.setStartTimeEvent.bind(this);
        this.setLifeCountEvent = this.setLifeCountEvent.bind(this);
        this.setDeathTimeEvent = this.setDeathTimeEvent.bind(this);


        this.state = {
            lifeCount: 1,
            startTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            deathTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),

            num: 1,

        };

    }

    lifeCountChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    render() {
        const { isTimeSettingPageVisible } = this.props;
        const { bugBasic } = this.props.navigation.state.params;

        console.log("BugBasic from Dy Setting Page is...........");
        console.log(bugBasic);


        return (
            <View>
                <Modal isVisible={isTimeSettingPageVisible} swipeDirection="right">

                    <View style={{ marginTop: 80, marginLeft: 20, marginRight: 20, marginBottom: 120, backgroundColor: "#D5EAE9", borderRadius: 8, flex: 1, paddingTop: 20, paddingLeft: 8, paddingRight: 8, paddingBottom: 25 }}>
                        <View style={{flex:1, marginBottom:20}}>
                            {renderIf(bugBasic.ifNeedStartTime)(
                                <View style={{ flex: 1, marginTop: 20 }} >
                                    <Form>
                                        <Item rounded style={{ padding: 8, backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ fontSize: 15, alignSelf: "center" }}>Born At</Text>
                                            </View>
                                            <DatePicker
                                                style={{ flex: 6 }}
                                                date={this.state.startTime}
                                                mode="datetime"
                                                placeholder="Select date"
                                                format="YYYY-MM-DD HH:mm:ss"
                                                minDate={moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss')}
                                                maxDate={moment().add(3, 'months').format('YYYY-MM-DD HH:mm:ss')}
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
                                                onDateChange={this.setStartTimeEvent}
                                            />
                                        </Item>
                                    </Form>
                                </View>)}
                        </View>
                        <View>
                            <Form>
                                <Item rounded style={{ marginTop: 6, backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                    <View style={{ flex: 2.5 }}>
                                        <Text style={{ marginLeft: 6, fontSize: 15, alignSelf: "center" }}>Life Counts</Text>
                                    </View>
                                    <View style={{ flex: 4 }}>
                                        <Picker
                                            style={{ marginRight: 8, marginLeft: 20, marginTop: 8, marginBottom: 8, backgroundColor: '#90EE90' }}
                                            itemStyle={{ alignSelf: "center" }}
                                            prompt='Times GoldBug Can be Caught'
                                            mode='dialog'
                                            onValueChange={(value, index) => this.setState({ num: value, lifeCount: this.lifeCountChoices[index] })}
                                            selectedValue={this.state.num}>
                                            <Picker.Item label="1" value="1" />
                                            <Picker.Item label="2" value="2" />
                                            <Picker.Item label="3" value="3" />
                                            <Picker.Item label="4" value="4" />
                                            <Picker.Item label="5" value="5" />
                                            <Picker.Item label="6" value="6" />
                                            <Picker.Item label="7" value="7" />
                                            <Picker.Item label="8" value="8" />
                                            <Picker.Item label="9" value="9" />
                                            <Picker.Item label="10" value="10" />
                                        </Picker>
                                    </View>

                                </Item>

                                <Item rounded style={{ backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555", padding: 10, marginTop: 10 }}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={{ fontSize: 15, alignSelf: "center" }}>Expire At</Text>
                                    </View>
                                    <DatePicker
                                        style={{ flex: 6 }}
                                        date={this.state.deathTime}
                                        mode="datetime"
                                        placeholder="Select date"
                                        format="YYYY-MM-DD HH:mm:ss"
                                        minDate={moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss')}
                                        maxDate={moment().add(3, 'months').format('YYYY-MM-DD HH:mm:ss')}
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
                        </View>

                        <Grid style={{ marginTop: 35 }}>
                            <Col style={{}}>
                                <Button block rounded style={{ backgroundColor: "#3CB371", height: 50 }} onPress={() => {
                                    console.log("Time Setting Page State is >>>>>>");
                                    console.log(this.state);
                                    this.props.actions.timeSettingPageToPage2({ bugBasic: this.state });
                                }}>
                                    <Text style={{ fontSize: 17, alignSelf: "center" }}>Load my GoldBug</Text>
                                </Button>
                            </Col>
                        </Grid>

                    </View>
                </Modal>
            </View>
        );



    }


    setLifeCountEvent(lifeCount) {

        this.setState({ lifeCount: lifeCount });

    }

    setStartTimeEvent(startTime) {

        console.log("The time you JUST chose is >>>>>>>>>>>>>>>>>");
        console.log(startTime);

        var date = moment(startTime);
        var date1 = date.valueOf();

        console.log("TIMESTAMP?????");
        console.log(date1);

        var date_1 = moment().add(1, 'hours').toDate().getTime();
        console.log("TIMESTAMP LIMIT ???????");
        console.log(date_1);

        if (date1 < date_1) {
            Alert.alert('Reminder', 'Non-VIP user can only plant GoldBug in at least 1 Hour.');
            this.setState({ startTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss') });
        }
        else {
            this.setState({ startTime: startTime });
        }
    }

    setDeathTimeEvent(deathTime) {

        console.log("The time you JUST chose is >>>>>>>>>>>>>>>>>");
        console.log(deathTime);

        var date = moment(deathTime);
        var date1 = date.valueOf();

        console.log("TIMESTAMP?????");
        console.log(date1);

        var date_1 = moment().add(1, 'hours').toDate().getTime();
        console.log("TIMESTAMP LIMIT ???????");
        console.log(date_1);

        //var Real_Date1 = moment(date1).format("YYYY-MM-DD HH:mm:ss");
        //var Real_Date_1 = moment(date_1).format("YYYY-MM-DD HH:mm:ss");
        //Alert.alert('', deathTime+' '+Real_Date1+' '+date1+' '+Real_Date_1+' '+date_1 );


        if (date1 < date_1) {
            Alert.alert('Reminder', 'Non-VIP user can only plant GoldBug in at least AN HOUR~');
            this.setState({ deathTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss') });
        }
        else {

            console.log("The time just selected compared NOW is >>>>>>>>>>>>>>");
            console.log(moment(deathTime).fromNow());
            this.setState({ deathTime: deathTime });
        }
    }

}


