'use strict';

import React, { Component } from 'react';
import { MapView, Offline } from 'react-native-amap3d';
import { Alert, StyleSheet, FlatList, Text, TouchableOpacity, View, Image, Opac, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
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
    TabHeading,
    Tab,
    Tabs,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import { styles as styless, route_pathName, getStrContent } from "../util/Constant"

import { PullView } from 'react-native-pull';
export default class CheckPage extends Component {
    constructor(props, context) {
        console.log("首页")
        super(props, context);
        this.renderCheckingList = this.renderCheckingList.bind(this);
        this.renderCheckedList = this.renderCheckedList.bind(this);
        this.renderBugModal = this.renderBugModal.bind(this);
        this.renderBugContent = this.renderBugContent.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.state = {
            type: -1,//0 未审核 1 已审核
            checkedList:[],
            checkingList:[],
            re: new RegExp("^[ ]+$")
        }
    }
    componentDidMount() {
        //这里偷偷发起两次action
        const {
            getCheckingList,
            getCheckedList,
            checkThisBug,
            drawBackBug,
            finishChecking,
            finishDrawBack,
            exitChecking,
            getBugDetail,
            exitDrawBack,
            quitDetail,
        } = this.props.actions;
        getCheckingList();
        getCheckedList();


    }
    componentWillUnmount() {

    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps");
       
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#3366CC" }}>
                    <Left>

                    </Left>
                    <Body>
                        <Title>审核管理</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.actions.logOut();

                        }}>
                            <Icon1 style={{ fontSize: 20, color: "#ffffff" }} name="logout" />
                        </Button>
                    </Right>
                </Header>
                {this.renderBugModal()}
                <Tabs locked style={{ backgroundColor: "#ffffff" }}>
                    <Tab tabStyle={{ backgroundColor: "#ffffff" }} activeTabStyle={{ backgroundColor: "#ffffff", }} heading={<TabHeading><Icon name="camera" style={{ fontSize: 15, color: "#ffffff" }} /><Text style={{ fontSize: 15, color: "#ffffff" }}>未审核</Text></TabHeading>}>
                        {this.renderCheckingList()}
                    </Tab>
                    <Tab tabStyle={{ backgroundColor: "#ffffff" }} activeTabStyle={{ backgroundColor: "#ffffff", }} heading={<TabHeading><Icon name="camera" style={{ fontSize: 15, color: "#ffffff" }} /><Text style={{ fontSize: 15, color: "#ffffff" }}>已审核</Text></TabHeading>}>
                        {this.renderCheckedList()}
                    </Tab>
                </Tabs>
            </Container>
        )


    }
    renderBugModal() {
        const {
            loadingChecking,//0 没有loding 1 在loading 2 loading成功 3 失败
            loadingChecked,//0 没有loding 1 在loading 2 loading成功 3 失败
            getDetail,//0没有get, 1正在get(需要转圈圈,且弹出页面) 2成功（渲染主要页面） 3失败
            checkingState,// 0 没有checking，页面在getDetail =1/2的时候就打开了 1 正在checking 2 cheing 成功 3 失败 (重置getDetail和自己)
            drawBackStae,//0 没有drawback 页面在getDetail =1/2 的时候就打开了  1 正在draw 2 draw 成功 3 失败 (重置getDetail和自己)
            des,//描述字符串
            bugDetail

        } = this.props.check;
        const {
            getCheckingList,
            getCheckedList,
            checkThisBug,
            drawBackBug,
            finishChecking,
            finishDrawBack,
            exitChecking,
            getBugDetail,
            exitDrawBack,
            quitDetail,
        } = this.props.actions;

        if (getDetail == 0) {
            return null;

        } else {
            return (
                <Modal isVisible={true}
                    onBackdropPress={() => {
                        quitDetail();
                    }}
                    onBackButtonPress={() => {
                        quitDetail();

                    }}
                    style={styless.modalStyles}
                >
                    {this.renderBugContent()}
                </Modal>);

        }
    }
    isEmpty = (str) => {
        if (str == "") return true;

        return this.state.re.test(str);
    }
    renderBugContent() {
        const {
            loadingChecking,//0 没有loding 1 在loading 2 loading成功 3 失败
            loadingChecked,//0 没有loding 1 在loading 2 loading成功 3 失败
            getDetail,//0没有get, 1正在get(需要转圈圈,且弹出页面) 2成功（渲染主要页面） 3失败
            checkingState,// 0 没有checking，页面在getDetail =1/2的时候就打开了 1 正在checking 2 cheing 成功 3 失败 (重置getDetail和自己)
            drawBackStae,//0 没有drawback 页面在getDetail =1/2 的时候就打开了  1 正在draw 2 draw 成功 3 失败 (重置getDetail和自己)
            des,//描述字符串
            bugDetail

        } = this.props.check;
        const {
            getCheckingList,
            getCheckedList,
            checkThisBug,
            drawBackBug,
            finishChecking,
            finishDrawBack,
            exitChecking,
            getBugDetail,
            exitDrawBack,
            resetGetDetailState,
            quitDetail, } = this.props.actions;
        
        console.log("checkingState:" + checkingState + " getDetail:" + getDetail + " drawBackStae:" + drawBackStae);
        if (getDetail == 1) {
            //正在获取
            return (
                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>正在获取</Text>
                    <View style={styless.msg_catch_content}>
                        <Spinner color='#00BFFF' />
                    </View>
                </View>

            );
        } else if (getDetail >= 3) {
            //获取失败
            return (
                <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 28, marginBottom: 120, marginTop: 120 }}>{des}</Text>
                    <View style={styless.msg_catch_content}>
                        <Button style={styless.button_style_login} info onPress={() => {
                            resetGetDetailState(0);//设置成0
                        }}><Text style={{ color: "#ffffff", fontSize: 20 }}>确定</Text></Button>
                    </View>

                </View>


            );
        } else if (checkingState == 0 && drawBackStae == 0) {//现在有了内容
            //没有点击发布或者drawback
            return (
                <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                    <View style={{ backgroundColor: "#6495ED", width: 304, height: 30, borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
                        <Text style={{ marginTop: 5, textAlign: "center", fontSize: 15 }}></Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={true}>
                        <Text style={styless.content_text_catchTitle}>{bugDetail.question}</Text>
                    </ScrollView>
                    <List>
                        {renderIf(!this.isEmpty(bugDetail.answer[0]))(
                            <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15, borderRadius: 14, backgroundColor: '#D5EAE9' }}>
                                <Item rounded style={{ marginLeft: 0, borderRadius: 14, borderColor: "#555555" }}>
                                    <TouchableWithoutFeedback
                                        style={{ flex: 1 }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{bugDetail.answer[0]}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Item>
                            </View>)}

                        {renderIf(!this.isEmpty(bugDetail.answer[1]))(
                            <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15, borderRadius: 14, backgroundColor: '#D5EAE9' }}>
                                <Item rounded style={{ marginLeft: 0, borderRadius: 14, borderColor: "#555555" }}>
                                    <TouchableWithoutFeedback
                                        style={{ flex: 1 }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{bugDetail.answer[1]}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Item>
                            </View>)}

                        {renderIf(!this.isEmpty(bugDetail.answer[2]))(
                            <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15, borderRadius: 14, backgroundColor: '#D5EAE9' }}>
                                <Item rounded style={{ marginLeft: 0, borderRadius: 14, borderColor: "#555555" }}>
                                    <TouchableWithoutFeedback
                                        style={{ flex: 1 }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{bugDetail.answer[2]}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Item>
                            </View>)}

                        {renderIf(!this.isEmpty(bugDetail.answer[3]))(
                            <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15, borderRadius: 14, backgroundColor: '#D5EAE9' }}>
                                <Item rounded style={{ marginLeft: 0, borderRadius: 14, borderColor: "#555555" }}>
                                    <TouchableWithoutFeedback
                                        style={{ flex: 1 }}

                                    >
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{bugDetail.answer[3]}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Item>
                            </View>)}

                    </List>

                    {this.renderButton(bugDetail)}
                </View>
            );



        } else if (checkingState == 1 || drawBackStae == 1) {
            return (
                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>{des}</Text>
                    <View style={styless.msg_catch_content}>
                        <Spinner color='#00BFFF' />
                    </View>
                </View>

            );
        } else if (checkingState == 2 || drawBackStae == 2) {
            console.log("我去！！！！！！");
            return (
                <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 28, marginBottom: 120, marginTop: 120 }}>{des}</Text>
                    <View style={styless.msg_catch_content}>
                        <Button style={styless.button_style_login} info onPress={() => {
                            checkingState == 2 ? finishChecking() : finishDrawBack();

                        }}><Text style={{ color: "#ffffff", fontSize: 20 }}>确定</Text></Button>
                    </View>

                </View>

            );
        } else if (checkingState >= 3 || drawBackStae >= 3) {
            return (
                <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 28, marginBottom: 120, marginTop: 120 }}>{des}</Text>
                    <View style={styless.msg_catch_content}>
                        <Button style={styless.button_style_login} info onPress={() => {
                            checkingState == 2 ? exitChecking() : exitDrawBack();
                        }}><Text style={{ color: "#ffffff", fontSize: 20 }}>确定</Text></Button>
                    </View>

                </View>

            );
        }

    }
    renderButton(bugDetail) {
        const {
            getCheckingList,
            getCheckedList,
            checkThisBug,
            drawBackBug,
            finishChecking,
            finishDrawBack,
            exitChecking,
            getBugDetail,
            exitDrawBack,
            getOneSpecBug,
            quitDetail, } = this.props.actions;
        if (this.state.type == 1) {
            return null;
        } else {
            return (
                <Grid style={{ marginTop: 25, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                    <Col style={{}}>
                        <Button block rounded style={{ backgroundColor: "#1CBBCF", padding: 25 }} onPress={() => {
                            drawBackBug(bugDetail.bugId);
                        }}>
                            <Text style={{ fontSize: 16, color: "#ffffff" }} >驳回</Text>
                        </Button>
                    </Col>
                    <Col style={{}}>
                        <Button block rounded style={{ backgroundColor: "#ff00c9", padding: 25 }} onPress={() => {
                            checkThisBug(bugDetail.bugId);
                        }}>
                            <Text style={{ fontSize: 16, margin: 15, color: "#ffffff" }}>发布</Text>
                        </Button>
                    </Col>
                </Grid>
            );
        }

    }
    renderCheckingList() {
        //渲染待审核list
        const {
            loadingChecking,//0 没有loding 1 在loading 2 loading成功 3 失败
            loadingChecked,//0 没有loding 1 在loading 2 loading成功 3 失败
            getDetail,//0没有get, 1正在get(需要转圈圈,且弹出页面) 2成功（渲染主要页面） 3失败
            checkingList,
            checkingState,// 0 没有checking，页面在getDetail =1/2的时候就打开了 1 正在checking 2 cheing 成功 3 失败 (重置getDetail和自己) } = this.props.check;
        } = this.props.check;
        const {
            getCheckingList,
            getCheckedList,
            checkThisBug,
            drawBackBug,
            finishChecking,
            finishDrawBack,
            exitChecking,
            getBugDetail,
            exitDrawBack,
            getOneSpecBug,
            quitDetail, } = this.props.actions;
        
        return (

            <FlatList
              
                ListHeaderComponent={() => {
                    return (
                        <View style={styless.top_controller}>
                            <Text style={{ textAlign: "center", fontSize: 16, color: "#bbbbbb" }}>下拉刷新</Text>
                        </View>);//返回一个

                }}
                onRefresh={() => {
                    //取数据,
                    console.log("renderCheckingList ");
                    getCheckingList();
                    /*
                    每一个都是 bugId+score+question
                    */
                }}
                keyExtractor={(item, index) => {
                    return item.bugId;


                }}
                refreshing={loadingChecking == 1 ? true : false}
                data={this.props.check.checkingList}
                renderItem={(item) => {
                    item = item.item;
                    return (
                        <ListItem style={{}}>
                            <TouchableOpacity style={{ flexDirection: "row", flex: 1 }} onPress={() => {
                                getBugDetail(item.bugId, 0);//0是待审核
                                this.setState({
                                    type: 0
                                })
                            }}>
                                <Text style={{ color: "#999999" }}>{getStrContent(item.question)}</Text>
                            </TouchableOpacity>
                        </ListItem>
                    );


                }}
            />

        );


    }
    renderCheckedList() {
        //渲染已审核list
        const {
            loadingChecking,//0 没有loding 1 在loading 2 loading成功 3 失败
            loadingChecked,//0 没有loding 1 在loading 2 loading成功 3 失败
            getDetail,//0没有get, 1正在get(需要转圈圈,且弹出页面) 2成功（渲染主要页面） 3失败
            checkedList,
        } = this.props.check;
        const {
            getCheckingList,
            getCheckedList,
            checkThisBug,
            drawBackBug,
            finishChecking,
            finishDrawBack,
            exitChecking,
            getBugDetail,
            exitDrawBack,
            quitDetail, } = this.props.actions;
        return (

            <FlatList
              
                ListHeaderComponent={() => {
                    return (
                        <View style={styless.top_controller}>
                            <Text style={{ textAlign: "center", fontSize: 16, color: "#bbbbbb" }}>下拉刷新</Text>
                        </View>);//返回一个

                }}
                onRefresh={() => {
                    console.log("renderCheckingList ");
                    //取数据,
                    getCheckedList();
                    /*
                    每一个都是 bugId+score+question
                    */
                }}
                refreshing={loadingChecked == 1 ? true : false}
                data={this.props.check.checkedList}
                keyExtractor={(item, index) => {
                    return item.bugId;
                }}
                renderItem={(item) => {
                    item = item.item;
                    return (

                        <ListItem style={{}}>
                            <TouchableOpacity style={{ flexDirection: "row", flex: 1 }} onPress={() => {
                                getBugDetail(item.bugId, this.props.user.userName, 1);//1是已审核
                                this.setState({
                                    type: 1
                                })
                            }}>
                                <Text style={{ color: "#999999" }}>{getStrContent(item.question)}</Text>
                            </TouchableOpacity>
                        </ListItem>
                    );


                }}
            />

        );

    }


}

