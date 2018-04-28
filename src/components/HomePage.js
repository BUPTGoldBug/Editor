'use strict';

import React, { Component } from 'react';
import { MapView, Offline } from 'react-native-amap3d';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, Opac, ScrollView, TouchableWithoutFeedback } from 'react-native';
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
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Icon} from "react-native-vector-icons";



const styles = StyleSheet.create({
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#ffffff22',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#CC33FF',
        marginBottom: 5,

    },
    customMarker: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    markerText: {
        color: '#fff',
    },
})


export default class HomePage extends Component {
    constructor(props, context) {
        console.log("HomePage props");
        console.log(props);

        super(props, context);
        this.renderMap = this.renderMap.bind(this);
        this.renderCatherPanel = this.renderCatherPanel.bind(this);
        this.renderMsgContent = this.renderMsgContent.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.state = {
            isMoved: false,
            rt_lon: 200,
            rt_lat: 300,
            lon: 200,
            lat: 300,
            planter: "luyao", // +++++++++++++++++++++Wait to be set+++++++++++++++++++++++++++++
            tmpTime: new Date(),
            mark_lon: 200,
            mark_lat: 300,
            bugsAround: [],
            checkBox1: false,
            checkBox2: false,
            checkBox3: false,
            checkBox4: false,
            cathModalVisiable: props.arCatch.inGame == 0 ? true : false,
        };
    }


    componentDidMount() {
        this.mounted = true
        this.timer = setInterval(() => {
            if (this.mounted) {
                this.setState({ tmpTime: new Date() })
            }
        }, 1000)

        this.interval = setInterval(() => {
            this.props.actions.getAroundBugs({ userLon: this.state.rt_lon, userLat: this.state.rt_lat });
        }, 1000);
    }

    componentWillUnmount() {
        this.mounted = false

        this.interval && clearInterval(this.interval);
        this.interval = null;

        this.timer && clearInterval(this.timer);
        this.timer = null;
    }
    componentWillReceiveProps(nextProps) {

        this.setState((pre) => {
            if (nextProps.loadingSpecBug == 1) {
                for (var i = 1; i <= 4; i++) {
                    pre["checkBox" + i] = false;
                }
            }
            pre.cathModalVisiable = nextProps.arCatch.inGame == 0 ? true : false;
            return pre;
        });

    }
    _catcherOnMarkerPress = (common) => {
        this.props.actions.catchOneBug(common);//去捉虫
    }

    _onMarkerPress = () => {
        console.log("STATE PASSED FROM HOME_PAGE TO POS_SETTING_PAGE is >>>>");
        console.log(this.state);

        if (this.state.isMoved == false) {
            var newState = Object.assign({}, this.state);
            newState.lon = this.state.rt_lon + 0.001;
            newState.lat = this.state.rt_lat - 0.003;
            this.props.actions.homeToPosSetPage({ initPoint: newState });
        }
        else {
            var newState = Object.assign({}, this.state);
            this.props.actions.homeToPosSetPage({ initPoint: newState });
        }

    }

    _onInfoWindowPress = () => Alert.alert('Catch me to win bonus~')
    _onDragEvent = ({ nativeEvent }) => {

        this.setState({ lon: nativeEvent.longitude, lat: nativeEvent.latitude, isMoved: true });

    }

    isEmpty = (str) => {
        if (str == "") return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    }


    render() {

        return (
            <View style={{ flex: 1 }}>
                {this.renderCatherPanel()}
                {this.renderMap()}

            </View>


        );


    }
    renderCatherPanel() {
        const { loadingSpecBug, specBug, arCatch } = this.props;
        if (loadingSpecBug == 0 || loadingSpecBug > 6) {
            return null;
        } else {
            //正在加载
            return (
                <Modal isVisible={this.state.cathModalVisiable}
                    style={styless.modalStyles}
                >
                    {this.renderMsgContent()}
                </Modal>);

        }

    }
    renderMsgContent() {
        const { loadingSpecBug, specBug, arCatch } = this.props;
        if (loadingSpecBug == 1) {
            //正在加载
            return (
                <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 28, marginBottom: 80, marginTop: 120 }}>正在获取虫子信息...</Text>
                    <View style={styless.msg_catch_content}>
                        <Spinner color='#00BFFF' />
                    </View>

                </View>
            );
        } else if (loadingSpecBug == 2) {
            // 加载成功
            console.log(specBug.arIndex + "," + arCatch.times + "," + arCatch.exit + "," + arCatch.success);
            //这里需要渲染两个界面
            if (specBug.arIndex != -1) {
                // 开始VR游戏
                if (arCatch.times >= 3 && arCatch.exit == 0) {
                    //没玩
                    return (
                        <View style={styless.uiControl_catch_uiCenter_panel}>
                            <Text style={styless.content_text}>点击按钮开始小游戏</Text>
                            <View style={styless.msg_catch_content}>
                                <Button style={styless.button_style} info block onPress={() => {
                                    //确定后就要完成游戏
                                    this.props.actions.trunToCatchPage(route_pathName.arScene, {
                                        arType: 1,//捉虫
                                        index: specBug.arIndex,
                                        content: {
                                            question: "这部电影的女主角是",
                                            answer: "米子哈"
                                        }
                                    });//回到第一页
                                }}><Text>确定</Text></Button>
                            </View>

                        </View>
                    );

                } else if (arCatch.success == 1) {
                    //游戏完成了,开始答题
                    console.log("arCatch");
                    return (
                        <View style={styless.uiControl_catch_uiCenter_panel}>
                            <Text style={styless.content_text_catchTitle}>{specBug.question}</Text>
                            <List>
                                <ListItem>
                                    <Left>
                                        <CheckBox
                                            checked={this.state.checkBox1}
                                            onPress={() => { this.setState({ checkBox1: !this.state.checkBox1 }) }} />
                                    </Left>
                                    <Body><Text>{specBug.answer[0]}</Text></Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <CheckBox
                                            checked={this.state.checkBox2}
                                            onPress={() => { this.setState({ checkBox2: !this.state.checkBox2 }) }} />
                                    </Left>
                                    <Body><Text>{specBug.answer[1]}</Text></Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <CheckBox
                                            checked={this.state.checkBox3}
                                            onPress={() => { this.setState({ checkBox3: !this.state.checkBox3 }) }} />
                                    </Left>
                                    <Body><Text>{specBug.answer[2]}</Text></Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <CheckBox
                                            checked={this.state.checkBox4}
                                            onPress={() => { this.setState({ checkBox4: !this.state.checkBox4 }) }} />
                                    </Left>
                                    <Body><Text>{specBug.answer[3]}</Text></Body>
                                </ListItem>
                            </List>
                            <Button info block onPress={() => {
                                this.props.actions.vaildContent({
                                    bugId: specBug.bugId,
                                    choose: "" + Number(this.state.checkBox1) + Number(this.state.checkBox2) + Number(this.state.checkBox3) + Number(this.state.checkBox4)
                                });
                            }}><Text>确定</Text></Button>
                        </View>
                    );


                } else {
                    //游戏失败了
                    return (
                        <View style={styless.uiControl_catch_uiCenter_panel}>
                            <Text style={styless.content_text}>很遗憾，下次加油！</Text>
                            <View style={styless.msg_catch_content}>
                                <Button style={styless.button_style} info block onPress={() => {
                                    this.props.actions.resetCatchBugs();//重置
                                }}><Text>确定</Text></Button>
                            </View>

                        </View>
                    );
                }
            } else {
                // 开始普通捉虫
                return (
                    <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                        <View style={{ backgroundColor: "#6495ED", width: 304, height: 30, borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
                            <Text style={{ marginTop: 5, textAlign: "center", fontSize: 15 }}>当前本题答题情况：{10 - specBug.lifecount}/10</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={true}>
                            <Text style={styless.content_text_catchTitle}>{specBug.question}</Text>
                        </ScrollView>
                        <List>
                            {renderIf(!this.isEmpty(specBug.answer[0]))(
                                <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15, borderRadius: 14, backgroundColor: this.state.checkBox1 == true ? '#A9A9A9' : '#D5EAE9' }}>
                                    <Item rounded style={{ marginLeft: 0, borderRadius: 14, borderColor: "#555555" }}>
                                        <TouchableWithoutFeedback
                                            style={{ flex: 1 }}
                                            onPressIn={() => { this.setState({ checkBox1: !this.state.checkBox1 }) }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{specBug.answer[0]}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </Item>
                                </View>)}

                            {renderIf(!this.isEmpty(specBug.answer[1]))(
                                <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15, borderRadius: 14, backgroundColor: this.state.checkBox2 == true ? '#A9A9A9' : '#D5EAE9' }}>
                                    <Item rounded style={{ marginLeft: 0, borderRadius: 14, borderColor: "#555555" }}>
                                        <TouchableWithoutFeedback
                                            style={{ flex: 1 }}
                                            onPressIn={() => { this.setState({ checkBox2: !this.state.checkBox2 }) }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{specBug.answer[1]}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </Item>
                                </View>)}

                            {renderIf(!this.isEmpty(specBug.answer[2]))(
                                <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15, borderRadius: 14, backgroundColor: this.state.checkBox3 == true ? '#A9A9A9' : '#D5EAE9' }}>
                                    <Item rounded style={{ marginLeft: 0, borderRadius: 14, borderColor: "#555555" }}>
                                        <TouchableWithoutFeedback
                                            style={{ flex: 1 }}
                                            onPressIn={() => { this.setState({ checkBox3: !this.state.checkBox3 }) }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{specBug.answer[2]}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </Item>
                                </View>)}

                            {renderIf(!this.isEmpty(specBug.answer[3]))(
                                <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15, borderRadius: 14, backgroundColor: this.state.checkBox4 == true ? '#A9A9A9' : '#D5EAE9' }}>
                                    <Item rounded style={{ marginLeft: 0, borderRadius: 14, borderColor: "#555555" }}>
                                        <TouchableWithoutFeedback
                                            style={{ flex: 1 }}
                                            onPressIn={() => { this.setState({ checkBox4: !this.state.checkBox4 }) }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ margin: 10, textAlign: "center", fontSize: 14 }}>{specBug.answer[3]}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </Item>
                                </View>)}

                        </List>

                        <Grid style={{ marginTop: 25, marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                            <Col style={{}}>
                                <Button block rounded style={{ backgroundColor: "#1CBBCF", padding: 25 }} onPress={() => {
                                    this.props.actions.resetCatchBugs();//重置
                                }}>
                                    <Text style={{ fontSize: 16 }} >取消</Text>
                                </Button>
                            </Col>
                            <Col style={{}}>
                                <Button block rounded style={{ backgroundColor: "#ff00c9", padding: 25 }} onPress={() => {
                                    this.props.actions.vaildContent({
                                        userId: 2,
                                        bugId: specBug.bugId,
                                        debugDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                                        choose: "" + Number(this.state.checkBox1) + Number(this.state.checkBox2) + Number(this.state.checkBox3) + Number(this.state.checkBox4)
                                    });
                                }}>
                                    <Text style={{ fontSize: 16, margin: 15 }}>提交</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                );

            }


        } else if (loadingSpecBug == 3) {
            // 获取虫子信息失败
            return (<View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>{specBug.des}</Text>
                <View style={styless.msg_catch_content}>
                    <Button block rounded style={{ backgroundColor: "#1CBBCF", padding: 25, marginLeft: 15, marginRight: 15 }} onPress={() => {
                        //确定后
                        this.props.actions.resetCatchBugs();//重置
                    }}><Text>确定</Text></Button>
                </View>

            </View>
            );


        } else if (loadingSpecBug == 4) {
            // 验证答案界面
            return (
                <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>正在校验</Text>
                    <View style={styless.msg_catch_content}>
                        <Spinner color='#00BFFF' />
                    </View>

                </View>
            );

        } else if (loadingSpecBug == 5) {
            // 验证成功界面
            return (
                <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>恭喜回答正确！</Text>
                    <View style={styless.msg_catch_content}>
                        <Button block rounded style={{ backgroundColor: "#3CB371", padding: 25, marginLeft: 15, marginRight: 15 }} onPress={() => {
                            this.props.actions.resetCatchBugs();//重置
                        }}>
                            <Text style={{ fontSize: 20 }}>领取{specBug.score}积分</Text>
                        </Button>
                    </View>

                </View>
            );


        } else if (loadingSpecBug == 6) {
            // 验证失败界面
            return (
                <View style={{ marginTop: 70, marginLeft: 10, marginRight: 10, marginBottom: 90, backgroundColor: "#D5EAE9", borderRadius: 14, flex: 1, paddingBottom: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 80, marginTop: 120 }}>答案不对哦</Text>
                    <View style={styless.msg_catch_content}>
                        <Button block rounded style={{ backgroundColor: "#1CBBCF", padding: 25, marginLeft: 15, marginRight: 15 }} onPress={() => {
                            this.props.actions.resetCatchBugs();//重置
                        }}>
                            <Text style={{ fontSize: 20 }}>确定</Text>
                        </Button>
                    </View>

                </View>
            );


        } else {

            return null;

        }

    }
    renderMap() {

        const { isHomePageVisible, bugsAround } = this.props;

        console.log("++++++++BUGS AROUND+++++++++++");
        console.log(bugsAround);
        //<View><Text>asd</Text></View>
        return (
            <MapView
                isVisible={isHomePageVisible}
                style={StyleSheet.absoluteFill}
                locationEnabled
                onLocation={({ nativeEvent }) => {
                    console.log("nativeEvent.longitude:" + nativeEvent.longitude + ",nativeEvent.latitude:" + nativeEvent.latitude)
                    this.setState({ rt_lon: nativeEvent.longitude, rt_lat: nativeEvent.latitude });
                    if (this.state.isMoved) {
                        this.setState({ mark_lat: this.state.lat, mark_lon: this.state.lon });
                    }
                    else {
                        this.setState({ mark_lat: nativeEvent.latitude - 0.003, mark_lon: nativeEvent.longitude + 0.001 });
                    }

                    console.log(`User Real Location ${nativeEvent.latitude}, ${nativeEvent.longitude}`)
                }
                }
                showsTraffic={true}
                region={{ latitude: coordinate.BUPT_Center_Lat, longitude: coordinate.BUPT_Center_Lon, latitudeDelta: 0.006, longitudeDelta: 0.007 }}
            >
                <MapView.Marker
                    active
                    draggable
                    color="violet"

                    icon={() => {
                        return (

                            <Image style={styless.mainMark} source={require("../resources/mainMark.png")} />
                        );

                    }}
                    onDragEnd={this._onDragEvent}
                    onInfoWindowPress={this._onInfoWindowPress}
                    onPress={this._onMarkerPress}
                    coordinate={{
                        latitude: this.state.mark_lat,
                        longitude: this.state.mark_lon
                    }}>

                    <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                        <View style={styles.customInfoWindow}>
                            <Text>Drag me to plant GoldBug~</Text>
                            <Text ref={(component) => { this.timeText = component; }} style={{ textAlign: "center" }}>{this.state.tmpTime.toLocaleTimeString()}</Text>
                        </View>
                    </TouchableOpacity>
                </MapView.Marker>
                {this.renderBugsAround(bugsAround)}
            </MapView>
        );
    };
    renderBugsAround(bugsAround) {
        console.log("bugsAround");
        console.log(bugsAround);

        return bugsAround.map((bug, index) => {
            return (
                <View key={index} style={{ flex: 1 }}>
                    <MapView.Marker
                        key={index}
                        GoldBugId={bug.bugId}

                        icon={() => {
                            if (bug.arIndex == -1) { // common

                                return (

                                    <Image style={styless.customMarker} source={require("../resources/party.png")} />
                                )
                            } else if (bug.arIndex == 0) { // Basketball

                                return (

                                    <Image style={styless.customMarker} source={require("../resources/AR.png")} />
                                )
                            } else { // Catoon Entrance
                                return (

                                    <Image style={styless.customMarker} source={require("../resources/VR.png")} />
                                )
                            }

                        }}
                        onPress={() => {
                            this._catcherOnMarkerPress({rt_lon:this.state.rt_lon,rt_lat:this.state.rt_lat,bugId:bug.bugId, userId:2})
                        }}
                        coordinate={{
                            latitude: bug.lat,
                            longitude: bug.lon
                        }}>
                    </MapView.Marker>

                </View>
            );
        })
    }


};
