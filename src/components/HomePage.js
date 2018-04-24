'use strict';

import React, { Component } from 'react';
import { MapView, Offline } from 'react-native-amap3d';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, Opac } from 'react-native';
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
    Icon,
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

} from "native-base";
//import index from './C:/Users/Luyao/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-native-datepicker';
import { styles as styless, route_pathName } from "../util/Constant"
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
    _catcherOnMarkerPress = (GoldBugId) => {
        this.props.actions.catchOneBug(GoldBugId);//去捉虫
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

                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={styless.content_text}>正在获取虫子信息..</Text>
                    <View style={styless.msg_catch_content}>
                        <Spinner color='#ff0000' />
                    </View>

                </View>
            );
        } else if (loadingSpecBug == 2) {

            console.log(specBug.arIndex + "," + arCatch.times + "," + arCatch.exit + "," + arCatch.success);
            //加载成功,这里需要渲染两个界面
            if (specBug.arIndex != -1) {
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
                return (
                    <View style={styless.uiControl_catch_uiCenter_panel}>
                        <Text style={styless.content_text_catchTitle}>{specBug.question}</Text>
                        <List>
                            <ListItem>
                                <Left>
                                    <CheckBox
                                        checked={this.state.checkBox1}
                                        onPress={() => this.setState({ checkBox1: !this.state.checkBox1 })} />
                                </Left>
                                <Body><Text>{specBug.answer[0]}</Text></Body>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <CheckBox
                                        checked={this.state.checkBox2}
                                        onPress={() => this.setState({ checkBox2: !this.state.checkBox2 })} />
                                </Left>
                                <Body><Text>{specBug.answer[1]}</Text></Body>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <CheckBox
                                        checked={this.state.checkBox3}
                                        onPress={() => this.setState({ checkBox3: !this.state.checkBox3 })} />
                                </Left>
                                <Body><Text>{specBug.answer[2]}</Text></Body>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <CheckBox
                                        checked={this.state.checkBox4}
                                        onPress={() => this.setState({ checkBox4: !this.state.checkBox4 })} />
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

            }


        } else if (loadingSpecBug == 3) {

            return (<View style={styless.uiControl_catch_uiCenter_panel}>
                <Text style={styless.content_text}>获取虫子信息失败</Text>
                <View style={styless.msg_catch_content}>
                    <Button style={styless.button_style} info block onPress={() => {
                        //确定后
                        this.props.actions.resetCatchBugs();//重置
                    }}><Text>确定</Text></Button>
                </View>

            </View>
            );


        } else if (loadingSpecBug == 4) {

            return (
                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={styless.content_text}>正在验证答案</Text>
                    <View style={styless.msg_catch_content}>
                        <Spinner color='#ff0000' />
                    </View>

                </View>
            );

        } else if (loadingSpecBug == 5) {
            return (
                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={styless.content_text}>验证成功！</Text>
                    <View style={styless.msg_catch_content}>
                        <Button style={styless.button_style} info block onPress={() => {
                            this.props.actions.resetCatchBugs();//重置
                        }}><Text>确定</Text></Button>
                    </View>

                </View>
            );


        } else if (loadingSpecBug == 6) {
            return (
                <View style={styless.uiControl_catch_uiCenter_panel}>
                    <Text style={styless.content_text}>很遗憾，验证失败</Text>
                    <View style={styless.msg_catch_content}>
                        <Button style={styless.button_style} info block onPress={() => {
                            this.props.actions.resetCatchBugs();//重置
                        }}><Text>确定</Text></Button>
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
                region={{ latitude: this.state.rt_lat, longitude: this.state.rt_lon, latitudeDelta: 0.006, longitudeDelta: 0.006 }}
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
            return (<MapView.Marker
                key={index}
                GoldBugId={bug.bugId}

                icon={() => {
                    if (bug.arIndex == -1) {

                        return (

                            <Image style={styless.customMarker} source={require("../resources/bee.png")} />
                        )
                    } else if (bug.arIndex == 0) {

                        return (

                            <Image style={styless.customMarker} source={require("../resources/AR.png")} />
                        )
                    } else {
                        return (

                            <Image style={styless.customMarker} source={require("../resources/VR.png")} />
                        )
                    }

                }}
                onPress={() => {
                    this._catcherOnMarkerPress(bug.bugId)
                }}
                coordinate={{
                    latitude: bug.lat,
                    longitude: bug.lon
                }}>
            </MapView.Marker>
            );
        })
    }


};
