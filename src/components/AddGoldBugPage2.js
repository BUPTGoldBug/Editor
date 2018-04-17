'use strict';

import React, { Component } from 'react';
import {
    Container,
    Header,
    CheckBox,
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
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon1 from 'react-native-vector-icons/FontAwesome'
import { View, TouchableWithoutFeedback, Alert } from 'react-native'
import * as constant from '../util/Constant'
import Modal from "react-native-modal";
import { TextInput, Image, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';


export default class AddGoldBugPage2 extends Component {
    constructor(props, context) {
        console.log("AddGoldBugPage2 props");
        console.log(props);

        super(props, context);

        this.setQuestionEvent = this.setQuestionEvent.bind(this);
        this.setAns1Event = this.setAns1Event.bind(this);
        this.setAns2Event = this.setAns2Event.bind(this);
        this.setAns3Event = this.setAns3Event.bind(this);
        this.setAns4Event = this.setAns4Event.bind(this);
        this.setScoresEvent = this.setScoresEvent.bind(this);
        this.setKeyEvent = this.setKeyEvent.bind(this);
        this.commitGoldBug = this.commitGoldBug.bind(this);
        this.setAns1SelectEvent = this.setAns1SelectEvent.bind(this);
        this.setAns2SelectEvent = this.setAns2SelectEvent.bind(this);
        this.setAns3SelectEvent = this.setAns3SelectEvent.bind(this);
        this.setAns4SelectEvent = this.setAns4SelectEvent.bind(this);

        this.state = {
            start_lon: 200,
            start_lat: 300,
            isMoved: false,
            ifNeedStartTime: false,
            end_lon: 200,
            end_lat: 300,
            lifeCount: 1,
            startTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            deathTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),

            description: "QA",
            question: "",
            scores: 0,
            ans_1: "",
            ans_2: "",
            ans_3: "",
            ans_4: "",
            contentType: "0",
            ans_1_selected: false,
            ans_2_selected: false,
            ans_3_selected: false,
            ans_4_selected: false,
        };
    }

    render() {
        const { isAddingGoldBug, isAddingGoldBugSucces, isPage2Visible, contentText } = this.props;
        const { bugBasic } = this.props.navigation.state.params;

        console.log("bugBasic from Time Setting Page is。。。。。。。");
        console.log(bugBasic);


        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: "#D5EAE9", marginTop: 30, marginBottom: 60, marginLeft: 20, marginRight: 20, borderRadius: 5, flex: 1 }}
                resetScrollToCoords={{ x: 20, y: 20 }}
                contentContainerStyle={{ backgroundColor: "#D5EAE9" }}
            >

                <Modal isVisible={isPage2Visible} swipeDirection="right">


                    <KeyboardAwareScrollView style={{ marginTop: 60, marginBottom: 20, marginLeft: 20, marginRight: 20, backgroundColor: "#D5EAE9", borderRadius: 5, flex: 1, paddingTop: 30, paddingLeft: 25, paddingRight: 25, paddingBottom: 30 }}>
                        <Form>
                            <Item rounded style={{ height: 80, backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                <TextInput placeholder="Question" onChangeText={this.setQuestionEvent} style={{ flex: 1 }} underlineColorAndroid='transparent' />
                            </Item>

                            <View style={{ marginTop: 10,borderRadius: 14, backgroundColor: this.state.ans_1_selected == true ? '#ADD8E6' : '#D5EAE9' }}>
                                <Item rounded style={{ borderRadius: 14, borderColor: "#555555" }}>
                                    <View style={{ flex: 3 }}>
                                        <TextInput placeholder="Answer Candidate 1" onChangeText={this.setAns1Event} style={{ flex: 1 }} underlineColorAndroid='transparent' />
                                    </View>
                                    <TouchableWithoutFeedback
                                        style={{ flex: 1, paddingTop: 15, paddingLeft: 30 }}
                                        onPressIn={() => { this.setAns1SelectEvent(); }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <CheckBox checked={this.state.ans_1_selected} onPress={() => { this.setAns1SelectEvent(); console.log("ANS_1_SELECTED IS "); console.log(this.state.ans_1_selected); }} style={{ marginRight: 20 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Item>
                            </View>


                            <View style={{ borderRadius: 14, backgroundColor: this.state.ans_2_selected == true ? '#ADD8E6' : '#D5EAE9' }}>
                                <Item rounded style={{ borderRadius: 14, borderColor: "#555555" }}>
                                    <View style={{ flex: 3 }}>
                                        <TextInput placeholder="Answer Candidate 2" onChangeText={this.setAns2Event} style={{ flex: 1 }} underlineColorAndroid='transparent' />
                                    </View>
                                    <TouchableWithoutFeedback
                                        style={{ flex: 1, paddingTop: 15, paddingLeft: 30 }}
                                        onPressIn={() => { this.setAns2SelectEvent(); }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <CheckBox checked={this.state.ans_2_selected} onPress={() => { this.setAns2SelectEvent(); }} style={{ marginRight: 20 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Item>
                            </View>

                            <View style={{ borderRadius: 14, backgroundColor: this.state.ans_3_selected == true ? '#ADD8E6' : '#D5EAE9' }}>
                                <Item rounded style={{ borderRadius: 14, borderColor: "#555555" }}>
                                    <View style={{ flex: 3 }}>
                                        <TextInput placeholder="Answer Candidate 3" onChangeText={this.setAns3Event} style={{ flex: 1 }} underlineColorAndroid='transparent' />
                                    </View>
                                    <TouchableWithoutFeedback
                                        style={{ flex: 1, paddingTop: 15, paddingLeft: 30 }}
                                        onPressIn={() => { this.setAns3SelectEvent(); }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <CheckBox checked={this.state.ans_3_selected} onPress={() => { this.setAns3SelectEvent(); }} style={{ marginRight: 20 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Item>
                            </View>

                            <View style={{ borderRadius: 14, backgroundColor: this.state.ans_4_selected == true ? '#ADD8E6' : '#D5EAE9' }}>
                                <Item rounded style={{ borderRadius: 14, borderColor: "#555555" }}>
                                    <View style={{ flex: 3 }}>
                                        <TextInput placeholder="Answer Candidate 4" onChangeText={this.setAns4Event} style={{ flex: 1 }} underlineColorAndroid='transparent' />
                                    </View>
                                    <TouchableWithoutFeedback
                                        style={{ flex: 1, paddingTop: 15, paddingLeft: 30 }}
                                        onPressIn={() => { this.setAns4SelectEvent(); }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <CheckBox checked={this.state.ans_4_selected} onPress={() => { this.setAns4SelectEvent(); }} style={{ marginRight: 20 }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Item>
                            </View>

                            <Item rounded style={{ backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                                <TextInput placeholder="Scores" onChangeText={this.setScoresEvent} style={{ flex: 1 }} underlineColorAndroid='transparent' />
                            </Item>

                        </Form>

                        <Grid style={{ marginTop: 25 }}>
                            <Col style={{}}>
                                <Button block rounded style={{ backgroundColor: "#1CBBCF", height: 70 }} onPress={() => {
                                    //this.props.actions.page2ToPage1();
                                    Alert.alert("Go back to Time Setting page~");
                                }}>
                                    <Text >Abandon</Text>
                                </Button>
                            </Col>
                            <Col style={{}}>
                                <Button block rounded style={{ backgroundColor: "#ff00c9", height: 70 }} onPress={() => { this.commitGoldBug(bugBasic) }}>
                                    <Text >Plant</Text>
                                </Button>
                            </Col>
                        </Grid>

                    </KeyboardAwareScrollView>

                </Modal>

            </KeyboardAwareScrollView >
        );

    }

    setAns1SelectEvent() {
        if (this.state.ans_1_selected == true) {
            this.setState({ ans_1_selected: false });
        }
        else this.setState({ ans_1_selected: true });
    }
    setAns2SelectEvent() {
        if (this.state.ans_2_selected == true) {
            this.setState({ ans_2_selected: false });
        }
        else this.setState({ ans_2_selected: true });
    }
    setAns3SelectEvent() {
        if (this.state.ans_3_selected == true) {
            this.setState({ ans_3_selected: false });
        }
        else this.setState({ ans_3_selected: true });
    }
    setAns4SelectEvent() {
        if (this.state.ans_4_selected == true) {
            this.setState({ ans_4_selected: false });
        }
        else this.setState({ ans_4_selected: true });
    }

    setQuestionEvent(question) {
        this.setState({ question: question });
    }
    setAns1Event(ans_1) {
        this.setState({ ans_1: ans_1 });
        if (this.state.ans_1_selected == true) {
            this.setState({ ans_1_selected: false });
        }
    }
    setAns2Event(ans_2) {
        this.setState({ ans_2: ans_2 });
        if (this.state.ans_2_selected == true) {
            this.setState({ ans_2_selected: false });
        }
    }
    setAns3Event(ans_3) {
        this.setState({ ans_3: ans_3 });
        if (this.state.ans_3_selected == true) {
            this.setState({ ans_3_selected: false });
        }
    }
    setAns4Event(ans_4) {
        this.setState({ ans_4: ans_4 });
        if (this.state.ans_4_selected == true) {
            this.setState({ ans_4_selected: false });
        }
    }

    setScoresEvent(scores) {
        this.setState({ scores: scores });
    }
    setKeyEvent(key) {
        this.setState({ key: key });
    }

    commitGoldBug(bugBasic) {
        var key = "";
        if (this.state.ans_1_selected == true) {
            key += "1";
        }
        else key += "0";
        if (this.state.ans_2_selected == true) {
            key += "1";
        }
        else key += "0";
        if (this.state.ans_3_selected == true) {
            key += "1";
        }
        else key += "0";
        if (this.state.ans_4_selected == true) {
            key += "1";
        }
        else key += "0";


/*            start_lon: 200,
            start_lat: 300,
            isMoved: false,
            ifNeedStartTime: false,
            end_lon: 200,
            end_lat: 300,
            lifeCount: 1,
            startTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            deathTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),

            description: "QA",
            question: "",
            scores: 0,
            ans_1: "",
            ans_2: "",
            ans_3: "",
            ans_4: "",
            contentType: "0",
            
            ++ key: ""   */

        var bugInfo = {
            //lon: bugBasic.lon,
            //lat: bugBasic.lat,
            start_lon: bugBasic.start_lon,
            start_lat: bugBasic.start_lat,
            end_lon: bugBasic.end_lon,
            end_lat: bugBasic.end_lat,
            isMoved: bugBasic.isMoved,
            ifNeedStartTime: bugBasic.ifNeedStartTime,
            lifeCount: bugBasic.lifeCount,
            startTime: bugBasic.startTime,
            deathTime: bugBasic.deathTime,
            planter: bugBasic.planter,

        };

        var content = {
            contentType: this.state.contentType,
            description: this.state.description,
            question: this.state.question,
            score: this.state.scores,
            ans_1: this.state.ans_1,
            ans_2: this.state.ans_2,
            ans_3: this.state.ans_3,
            ans_4: this.state.ans_4,
            key: key
        };

        var goldBugInfo = {
            bugInfo: bugInfo,
            content: content
        };

        console.log("GOLGBUG PARAMS AFTER ADDGOLDBUGPAGE2>>>>>>>");
        console.log(goldBugInfo);
        this.props.actions.Page2ToHome(goldBugInfo);

    }

}