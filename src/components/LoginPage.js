'use strict';

import React, { Component } from 'react';
import { MapView, Offline } from 'react-native-amap3d';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, Opac, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
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

import { styles as styless, route_pathName, coordinate } from "../util/Constant"
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class LoginPage extends Component {
    constructor(props, context) {

        super(props, context);
        this.state = {
            reg_userName: "",
            reg_password: "",
            reg_phone: "",
            userName: "",
            password: "",
        }
        this.renderRegisTer = this.renderRegisTer.bind(this);
        this.renderRegContent = this.renderRegContent.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderLogInModal = this.renderLogInModal.bind(this);
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.user.login == 2) {

            this.props.actions.push(
                route_pathName.homePage,
                {}
            )
        }
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                {this.renderLogin()}
                {this.renderRegisTer()}
                {this.renderLogInModal()}

            </View>
        );
    }
    renderLogin() {
        //渲染登陆
        const { login, des } = this.props.user;
        return (

            <View style={{ flex: 1}}>

                <View style={{ marginBottom: 20, marginTop: 30, justifyContent: "center", alignItems: "center" }}><Image style={{ justifyContent: "center" }} source={require("../resources/bee.png")}></Image></View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <View >

                        <Form style={{  borderRadius: 10 }}>
                            <Item style={{  marginLeft: 10,marginTop:1 ,marginRight:10,borderRadius:5}}>
                                <Input style={{backgroundColor:"#ffffff"}} placeholderTextColor="#aaaaaa" placeholder="用户名" onChangeText={(Text) => { this.setState({ userName: Text }) }} />
                            </Item>
                            <Item style={{  marginLeft: 10,marginTop:1,marginRight:10,borderRadius:5 }}>
                                <Input style={{backgroundColor:"#ffffff"}}  placeholderTextColor="#aaaaaa" placeholder="密码" secureTextEntry={true} onChangeText={(Text) => { this.setState({ password: Text }) }} />
                            </Item>

                        </Form>
                        <Button style={{ marginTop: 5, borderRadius: 5, marginLeft: 10, marginRight: 10 }} disabled={login == 0 ? false : true} info full onPress={() => {
                            this.props.actions.login({
                                userName: this.state.userName,
                                passWord: this.state.password,
                            });//发起regis

                        }}>
                            <Text style={{ color: "#ffffff", fontSize: 20 }}>{login == 0 ? "登录" : "正在登录..."}</Text>
                        </Button>

                        <Button style={{ backgroundColor: "#ff00c9", marginTop: 5, borderRadius: 5, marginLeft: 10, marginRight: 10 }} full onPress={() => {
                            this.props.actions.startRegister();
                        }}>
                            <Text style={{ color: "#ffffff", fontSize: 20 }}>注册</Text>
                        </Button>

                    </View>

                </View>

            </View>);

    }
    renderLogInModal() {
        const { login, des } = this.props.user;
        if (login != 3) {
            return null;
        } else {
            //提示错误
            return (
                <Modal isVisible={true}
                    style={styless.modalStyles}
                >
                    <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                        <Text style={{ textAlign: 'center', fontSize: 28, marginBottom: 120, marginTop: 120 }}>{des}</Text>
                        <View style={styless.msg_catch_content}>
                            <Button style={styless.button_style_login} info onPress={() => {
                                this.props.actions.finishLogin();

                            }}><Text style={{ color: "#ffffff", fontSize: 20 }}>确定</Text></Button>
                        </View>

                    </View>
                </Modal>);

        }

    }
    renderRegisTer() {
        //渲染注册页面
        const { addingUser } = this.props.user;
        if (addingUser <= -1 || addingUser > 3) {//-1 未打开界面 0 打开界面未开始注册 1 正在注册 2 注册成功 3 注册失败
            return null;//不渲染
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Modal isVisible={true}
                        style={styless.modalStyles}
                    >
                        {this.renderRegContent()}
                    </Modal>
                </View>

            );
        }
    }
    renderRegContent() {
        const { addingUser, des } = this.props.user;
        if (addingUser == 0) {
            console.log("渲染regist")
            //开启了注册页面
            return (

                <KeyboardAwareScrollView style={{ marginTop: 60, marginBottom: 80, marginLeft: 20, marginRight: 20, backgroundColor: "#D5EAE9", borderRadius: 15, flex: 1, paddingTop: 30, paddingLeft: 25, paddingRight: 25, paddingBottom: 30 }}>
                    
                    <Text style={{marginTop:10,textAlign:'center',color:"#000000",fontSize:18}}>欢迎加入GoldBug大家庭</Text>
                    <Form>
                        <Item rounded style={{ marginTop:40, backgroundColor: "#D5EAE9", borderRadius: 14, borderColor: "#555555" }}>
                            <TextInput placeholder="用户名" onChangeText={(Text) => { this.setState({ reg_userName: Text }) }} style={{ flex: 1 }} underlineColorAndroid='transparent' />
                        </Item>

                        <View style={{ marginTop: 10, borderRadius: 14, backgroundColor: '#D5EAE9' }}>
                            <Item rounded style={{ borderRadius: 14, borderColor: "#555555" }}>
                                <View style={{ flex: 3 }}>
                                    <TextInput placeholder="密码" onChangeText={(Text) => { this.setState({ reg_password: Text }) }} underlineColorAndroid='transparent' />
                                </View>
                            </Item>
                        </View>


                        <View style={{ marginTop: 10, borderRadius: 14, backgroundColor:  '#D5EAE9' }}>
                            <Item rounded style={{ borderRadius: 14, borderColor: "#555555" }}>
                                <View style={{ flex: 3 }}>
                                    <TextInput placeholder="手机号码" keyboardType="numeric" onChangeText={(Text) => { this.setState({ reg_phone: Text }) }} underlineColorAndroid='transparent' />
                                </View>

                            </Item>
                        </View>


                    </Form>

                    <Grid style={{ marginTop: 50 }}>
                        <Col style={{}}>
                            <Button block rounded style={{ backgroundColor: "#1CBBCF", height: 50 }}
                                onPress={() => {
                                    this.props.actions.exitRegister();//退出
                                }}>
                                <Text  style={{ color: "#ffffff", fontSize: 20 }}>取消</Text>
                            </Button>
                        </Col>
                        <Col style={{}}>
                            <Button block rounded style={{ backgroundColor: "#ff00c9", height: 50 }}
                                onPress={() => {
                                    this.props.actions.register({
                                        userName: this.state.reg_userName,
                                        passWord: this.state.reg_password,
                                        phone: this.state.reg_phone,
                                        createTime: new Date().toLocaleTimeString(),
                                    });//发起regis
                                }}>
                                <Text  style={{ color: "#ffffff", fontSize: 20 }}>确认</Text>
                            </Button>
                        </Col>
                    </Grid>

                </KeyboardAwareScrollView>

            );


        } else if (addingUser == 1) {
            return (

                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>正在申请</Text>
                    <View style={styless.msg_catch_content}>
                        <Spinner color='#00BFFF' />
                    </View>
                </View>);

        } else if (addingUser == 2) {
            return (

                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>申请成功！</Text>
                    <View style={styless.msg_catch_content}>
                        <Button block rounded style={{ backgroundColor: "#3CB371", padding: 25, marginLeft: 15, marginRight: 15 }} onPress={() => {
                            this.props.actions.exitRegister();//退出注册界面
                        }}>
                        </Button>
                    </View>
                </View>);

        } else if (addingUser == 3) {
            return (
                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>{des}</Text>
                    <View style={styless.msg_catch_content}>
                        <Button block rounded style={{ backgroundColor: "#3CB371", padding: 25, marginLeft: 15, marginRight: 15 }} onPress={() => {
                            this.props.actions.finishRegister();
                        }}>
                            <Text  style={{ color: "#ffffff", fontSize: 20 }}>确定</Text>
                        </Button>
                    </View>
                </View>);

        } else return null;
    }

}

/**
 * 
 *     <View style={styless.uiControl_catch_uiCenter_panel}>
                    <View>
                        <Form  >
                            <Item>

                                <Input placeholder="账号" onChangeText={(Text) => { this.setState({ reg_userName: Text }) }}></Input>

                            </Item>
                            <Item>

                                <Input placeholder="密码" onChangeText={(Text) => { this.setState({ reg_password: Text }) }}></Input>

                            </Item>
                            <Item>

                                <Input placeholder="手机" keyboardType="numeric" onChangeText={(Text) => { this.setState({ reg_phone: Text }) }}></Input>

                            </Item>
                        </Form>
                    </View>
                    <View style={styless.msg_button_content}>
                        <Button style={styless.button_style_login} icon warning onPress={() => {
                            //取消啊
                            this.props.actions.exitRegister();//退出
                        }}>
                            <Icon1 name="close" style={{ fontSize: 14, color: "#ffffff" }} />
                        </Button>
                        <Button style={styless.button_style_login} icon info onPress={() => {
                            this.props.actions.register({
                                userName: this.state.reg_userName,
                                passWord: this.state.reg_password,
                                phone: this.state.phone,
                                createTime: new Date().toLocaleTimeString(),
                            });//发起regis

                        }}>
                            <Icon1 name="check" />
                        </Button>

                    </View>
                </View>
 * 
*/