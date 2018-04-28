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
import { styles as styless, route_pathName, coordinate } from "../util/Constant"
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Icon } from "react-native-vector-icons";
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
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.login == 2) {
            //直接走
            this.props.actions.push({
                key: route_pathName.homePage,
                params: {}
            })
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderLogin()}
                {this.renderRegisTer()}
            </View>
        );
    }
    renderLogin() {
        //渲染登陆
        const { login,des } = this.props.user;
        return (
            <View style={{ flex: 1 }}>
                <Modal isVisiable={login == 3?true:false}>
                    <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                        <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>{des}</Text>
                        <View style={styless.msg_catch_content}>
                            <Button block rounded style={{ backgroundColor: "#3CB371", padding: 25, marginLeft: 15, marginRight: 15 }} onPress={() => {
                                this.props.actions.finishLogin();//重置loing
                            }}>
                                <Text style={{ fontSize: 20 }}>确定</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
                <View>
                    <View> <Icon1 name="group" ></Icon1> </View>
                    <View> <Text>金虫子</Text> </View>
                </View>
                <View>
                    <View><TextInput placeholder="账号" onChangeText={(Text) => { this.setState({ reg_userName: Text }) }}></TextInput> </View>
                    <View><TextInput placeholder="密码" onChangeText={(Text) => { this.setState({ reg_password: Text }) }}></TextInput> </View>
                </View>
                <Grid>
                    <Button disabled={login == 1 ? true : false} onPress={() => {
                        this.props.actions.login({
                            userName: this.state.userName,
                            passWord: this.state.password,
                        });//发起regis

                    }}>

                        <Text>{login == 1 ? "正在登陆" : "登录"}</Text>
                    </Button>

                </Grid>
            </View>);

    }


    renderRegisTer() {
        //渲染注册页面
        const { addingUser } = this.props.user;
        if (addingUser <= -1 || addingUser > 3) {
            return null;//不渲染

        } else {
            return (
                <Modal isVisiable={true}>
                    {this.renderRegContent()}
                </Modal>);
        }
    }
    renderRegContent() {
        const { addingUser ,des} = this.props.user;
        if (addingUser == 0) {
            //开启了注册页面
            return (

                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <TextInput placeholder="账号" onChangeText={(Text) => { this.setState({ reg_userName: Text }) }}></TextInput>
                    <TextInput placeholder="密码" onChangeText={(Text) => { this.setState({ reg_password: Text }) }}></TextInput>
                    <TextInput placeholder="手机" keyboardType="numeric" onChangeText={(Text) => { this.setState({ reg_phone: Text }) }}></TextInput>
                    <Grid>
                        <Left>
                            <Button transparent icon onPress={() => {
                                //取消啊
                                this.props.actions.exitRegister();//退出
                            }}>
                                <Icon1 name="x" />

                            </Button>

                        </Left>
                        <Body></Body>
                        <Right>

                            <Button transparent icon onPress={() => {
                                this.props.actions.register({
                                    userName: this.state.reg_userName,
                                    passWord: this.state.reg_password,
                                    phone: this.state.phone,
                                    createTime:new Date().toLocaleTimeString(),
                                });//发起regis

                            }}>
                                <Icon1 name="check" />

                            </Button>
                        </Right>
                    </Grid>
                </View>);


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
                        </Button>
                    </View>
                </View>);

        } else return null;
    }

}