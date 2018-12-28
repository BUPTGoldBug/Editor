//这个组件是AR整个游戏各个页面的路由中心集散入口
//接受参数，并根据参数进行渲染，更改字典中的参数（AR中的各个界面需要使用）
//这个组件监听：
/**
 * 1.捉虫还是种虫，需要监听一个总的状态
 * 2.种虫的话，
 * 2.
*/

import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    PixelRatio,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Alert
} from 'react-native';

import {
    ViroSceneNavigator,
    ViroARSceneNavigator,
    ViroVRSceneNavigator,
} from 'react-viro';

import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    List,
    Right,
    Body,
    Icon,
    Card,
    CardItem,
    ListItem,
    Thumbnail,
    Input,
    Item

} from 'native-base';
import ARSceneSelectPage from './ARSceneSelectPage'; //种虫的AR页面
import ARSceneCatchPage from './ARSceneCatchPage'; //捉虫的AR页面
import { styles, sharedProps, gameList, vectorList, xConfilt ,checkPermissions,arRequest,requsetPermissions} from '../util/Constant';
import Icon1 from 'react-native-vector-icons/Feather'
import Modal from 'react-native-modal'
import TimeMix from 'react-timer-mixin'
export default class ARManagerPage extends Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.renderSelectContent = this.renderSelectContent.bind(this);

        this.renderArContent = this.renderArContent.bind(this);
        this.renderCatchContent = this.renderCatchContent.bind(this);

        this.onCatchExit = this.onCatchExit.bind(this);
        this.onSelectExit = this.onSelectExit.bind(this);
        this.onConfuirmSelect = this.onConfuirmSelect.bind(this);
        this.renderUiControlTop = this.renderUiControlTop.bind(this);
        this.renderUiControlBottom = this.renderUiControlBottom.bind(this);
        this.renderUiControlUiCenter = this.renderUiControlUiCenter.bind(this);
        this.renderImageList = this.renderImageList.bind(this);
        this.answerQuestion = this.answerQuestion.bind(this);
        // this.renderLoadingProcessor1 = this.renderLoadingProcessor1.bind(this);
        //  this.renderLoadingProcessor2 = this.renderLoadingProcessor1.bind(this);
        this.renderMsgContent = this.renderMsgContent.bind(this);
        this.distoryTimeout = this.distoryTimeout.bind(this);
        this.tickFunction = this.tickFunction.bind(this);
        this.state = {
            openModalView: false,
            gameList: gameList,
            isVisiable: true,
            msgVisiable: false,
            answer: "",
            gameModaiView: false,//游戏二需要的modal
            loading: false,
            viroAppProps:{
                ...this.props
            }

        }


    }
    componentDidMount(){
     


    }
    componentWillUnmount() {
        this.distoryTimeout();
    }
    distoryTimeout() {
 
        this.timer && TimeMix.clearInterval(this.timer);
        this.timer = null;
    }
    componentWillReceiveProps(nextsProps) {
        let loading = nextsProps.ar.catch.loading;
        console.log("loading :" + loading)
        if (loading && !this.timer) {
            console.log("!!!!!!pre tick!!!!!!!!!!!!!")
            this.timer = TimeMix.setInterval(
                () => {
                    console.log("!!!!!!tick!!!!!!!!!!!!!")
                    const { changeIndexOfProcessr } = this.props.actions;
                    const { xConfict, strength } = this.props.ar.catch;

                    changeIndexOfProcessr({
                        xConfict: xConfict + 1 >= xConfilt.length ? 0 : xConfict + 1,
                        strength: strength + 1 >= vectorList.length ? 0 : strength + 1,

                    });

                }, 100
            );
            
        } else if (loading == false) {
            this.distoryTimeout();
        }
        const {times,success} = nextsProps.ar.catch;
        this.setState({
            loading: nextsProps.ar.catch.loading //取出来
        });
        if( times> 0 && success == 0  && times <3){
            //游戏
            this.setState({
                gameModaiView:true,
            });
        }

    }

    render() {
        //在这个函数里面，需要根据params传进来的type决定渲染什么页面（种虫还是捉虫）
        const { arType, index, content } = this.props.navigation.state.params;
     
        return (
            <View style={styles.arContainer}>
                {this.renderArContent(arType, index, content)}
                {this.renderUiControlTop(arType, index)}
                {this.renderUiControlBottom(arType, index, content)}
                {this.renderUiControlUiCenter(arType, this.state.openModalView, index)}
                {this.renderMsgContent(arType)}
                {this.renderLoadingProcessor1(this.state.loading)}
                {this.renderLoadingProcessor2(this.state.loading)}
            </View>)





    }
    renderLoadingProcessor1(loading) {
        if (loading) {
            return (
                <View style={styles.loadingProcessor_xForce}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.uiControl_catch_bottom_game1_text}>{xConfilt[this.props.ar.catch.xConfict]}</Text>
                    </View>
                </View>

            )
        } else {
            return null;
        }


    }
    renderLoadingProcessor2(loading) {
        if (loading) {
            return (   <View style={styles.loadingProcessor_zForce}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.uiControl_catch_bottom_game1_text}>{vectorList[this.props.ar.catch.strength]}</Text>
                </View>
            </View>);
        } else {
            return null;
        }

    }
    tickFunction() {
        //定时函数


    }
    //这里加一个render函数吧
    renderMsgContent(type) {
        console.log("renderMsgContent");
        //退出提示框
        const { push, pop, exitCatchArGame, finishSelectArGame } = this.props.actions;
        if (type == 1) {
            //捉虫
            return (<Modal isVisible={this.state.msgVisiable}
                onBackButtonPress={
                    () => {
                        this.setState({ msgVisiable: false });
                    }

                }
                onBackdropPress={
                    () => {
                        this.setState({ msgVisiable: false });
                    }

                }
                style={styles.modalStyles}
            >
                <View style={styles.uiControl_catch_uiCenter_panel}>
                    <Text style={styles.content_text}>确定要退出吗</Text>
                    <View style={styles.msg_button_content}>
                        <Button style={styles.button_style} onPress={() => {
                            exitCatchArGame();//里面应该有网络请求的那一部分，先退出再请求，再进来的时候先判断网络状态是否完成，有的话不让进，没有的话再让
                        }}>
                            <Icon1 name="check" style={styles.button_icon_style}></Icon1>
                        </Button>
                        <Button style={styles.button_style} onPress={() => {
                            this.setState({ msgVisiable: false });
                        }}>
                            <Icon1 name="x" style={styles.button_icon_style}></Icon1>
                        </Button>
                    </View>

                </View>
            </Modal>);
        } else if (type == 0) {

            //种
            return (<Modal isVisible={this.state.msgVisiable}
                onBackButtonPress={
                    () => {
                        this.setState({ msgVisiable: false });
                    }

                }
                onBackdropPress={
                    () => {
                        this.setState({ msgVisiable: false });
                    }

                }
                style={styles.modalStyles}
            >
                <View style={styles.uiControl_catch_uiCenter_panel}>
                    <Text style={styles.content_text}>确定要退出吗</Text>
                    <View style={styles.msg_button_content}>
                        <Button style={styles.button_style} onPress={() => {
                            finishSelectArGame({
                                edited: false
                            });
                        }}>
                            <Icon1 name="check" style={styles.button_icon_style}></Icon1>
                        </Button>
                        <Button style={styles.button_style} onPress={() => {
                            this.setState({ msgVisiable: false });
                        }}>
                            <Icon1 name="x" style={styles.button_icon_style}></Icon1>
                        </Button>
                    </View>

                </View>
            </Modal>);

        } else return null;


    }
    renderSelectContent() {
        //渲染AR的种虫场景
        const { index } = this.props.ar.select;
        console.log("---this.props---")
        console.log(this.props)
        return (
            <View style={styles.arScene}>
                <ViroARSceneNavigator {...sharedProps} viroAppProps={this.state.viroAppProps} initialScene={{ scene: ARSceneSelectPage }} />
            </View>
        );





    }
    renderCatchContent(index) {
        //渲染AR的捉虫场景
        console.log("passProps");
        console.log(this.props);
        return (
            <View style={styles.arScene}>
                <ViroARSceneNavigator {...sharedProps} viroAppProps={{ ...this.props, typeIndex: index }} initialScene={{ scene: ARSceneCatchPage }} />
            </View>
        );

    }
    renderUiControlTop(type) {
        console.log("renderUiControlTop")
        //渲染顶部
        if (type == 0) {
            return (
                <View style={styles.uiControl_select_Header}>
                    <View style={styles.uiControl_header_quitButton}>
                        <Button onPress={this.onSelectExit} transparent ><Icon name="md-close" style={styles.uiControl_header_quitButton_icon}></Icon></Button>
                    </View>
                    <View style={styles.uiControl_header_sureButton}>
                        <Button onPress={this.onConfuirmSelect} transparent ><Icon1 name="check" style={styles.uiControl_header_quitButton_icon}></Icon1></Button>
                    </View>
                </View>


            );

        } else if (type == 1) {
            return (
                <View style={styles.uiControl_select_Header}>
                    <View style={styles.uiControl_header_quitButton}>
                        <Button onPress={this.onCatchExit} transparent ><Icon name="md-close" style={styles.uiControl_header_quitButton_icon}></Icon></Button>
                    </View>
                </View>


            );

        }

    }
    renderUiControlBottom(type, index, content) {
        console.log("renderUiControlBottom")
        //渲染的底部
        if (type == 0) {
            //是一个scollview
            return (
                <ScrollView style={styles.uiControl_select_GameImgView} horizontal={true}>
                    {
                        this.renderImageList() //渲染底下的那个列表
                    }
                </ScrollView>
            );
        } else {
            const { times, start, success } = this.props.ar.catch;
            if (index == 0) {
                //扔虫子游戏,content肯定是没有的
                if (start == 0) {//还没开始
                    return (
                        <View style={styles.uiControl_catch_bottom_game1}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.uiControl_catch_bottom_game1_text}>请点击物体!</Text>
                            </View>
                        </View>

                    ); //返回一个界面，包含请点击游戏开始的文本

                } else {
                    if (times > 0) {
                        //游戏次数大于0
                        return (
                            <View style={styles.uiControl_catch_bottom_game1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.uiControl_catch_bottom_game1_text}>加油!还剩{times}次</Text>
                                </View>
                            </View>

                        ); //返回一个界面，包含请点击游戏开始的文本

                    } else {
                        //游戏次数大于0
                        return (
                            <View style={styles.uiControl_catch_bottom_game1}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.uiControl_catch_bottom_game1_text}>太可惜!</Text>
                                </View>
                            </View>
                        ); //返回一个界面，包含请点击游戏开始的文本

                    }

                }


            } else if (index == 1 || index == 2 || index == 3) {
                //进图答题类型，一个输入框，一个按钮
                return (
                    <ScrollView
                        style={styles.uiControl_catch_bottom_game2}>
                        <Item>

                            <Input placeholderTextColor="#ffffff" onChangeText={(text) => { this.setState({ answer: text }) }} underlineColorAndroid="#ffffff" style={styles.uiControl_catch_bottom_game2_input} placeholder={content.question} />
                            <Icon1 onPress={this.answerQuestion} style={styles.uiControl_catch_bottom_game2_button} active name='check' />
                        </Item>
                    </ScrollView >
                );
            }

        }


    }

    renderImageList() {
        const { index } = this.props.ar.select;//取出来index
        const { finishSelectArGame, changeIndex, pop } = this.props.actions;
        //   
        console.log("list:")
        console.log(this.state.gameList)
        return this.state.gameList.map((item, ind) => {
            console.log("index:" + ind);
            console.log("item:");
            console.log(item)
            if (ind == index) {
                return (
                    <View style={styles.uiControl_select_GameImgList_item_hover} key={ind}>
                        <TouchableOpacity onPress={() => { if (ind != index) changeIndex(ind) }}>
                            <Text style={styles.uiControl_catch_bottom_game1_text}>游戏{ind+1}</Text>
                        </TouchableOpacity>

                    </View>);
            } else {
                //不加粗
                return (
                    <View style={styles.uiControl_select_GameImgList_item} key={ind}>
                        <TouchableOpacity onPress={() => { if (ind != index) changeIndex(ind) }}>
                            <Text style={styles.uiControl_catch_bottom_game1_text}>游戏{ind+1}</Text>
                        </TouchableOpacity>
                    </View>);
            }
        })
    }
    renderUiControlUiCenter(type, isVisible, index) {
        //渲染一些其他的东西，比如这个
        console.log("renderUiControlUiCenter");
        if (type == 0) {
            return (
                <Modal isVisible={this.state.openModalView}
                    onBackButtonPress={() => { this.setState({ openModalView: false }) }}
                    onBackdropPress={() => { this.setState({ openModalView: false }) }}
                    style={styles.modalStyles}
                >
                    <Container style={{ alignItems: "center" }}>
                        <Content><Text style={{ fontSize: 50, color: "#ffffff", alignItems: 'center', marginTop: "" }}>未选择游戏！</Text></Content>
                    </Container>
                </Modal>
            );
        } else if (type == 1) {
            const { times, start, success } = this.props.ar.catch;
            const { finishCatchArGame } = this.props.actions;
            const { content } = this.props.navigation.state.params;
            if (index == 0) {
                //当游戏时 0 的时候,就是专人的那个
                if (times <= 0 && success == 0) {
                    //失败了
                    return (
                        <Modal isVisible={true}

                            style={styles.modalStyles}
                        >
                            <View style={styles.uiControl_catch_uiCenter_panel}>
                                <Text style={styles.content_text}>太可惜，失败啦！</Text>
                                <View style={styles.msg_button_content}>
                                    <Button  style={styles.button_style}  success onPress={() => {
                                        //确定后就要完成游戏
                                        finishCatchArGame({
                                            ...this.props.ar.catch,
                                            ...content
                                        });

                                    }}><Text>确定</Text></Button>
                                </View>
                            </View>
                        </Modal>
                    );
                } else if (times >= 0 && success == 1) {
                    //成功了
                    return (
                        <Modal isVisible={true}
                            style={styles.modalStyles}
                        >
                            <View style={styles.uiControl_catch_uiCenter_panel}>
                                <Text style={styles.content_text}>恭喜你，完成游戏！</Text>
                                <View style={styles.msg_button_content}>
                                    <Button   style={styles.button_style}  info block onPress={() => {
                                        //确定后就要完成游戏
                                        finishCatchArGame({
                                            ...this.props.ar.catch,
                                            ...content
                                        });

                                    }}><Text>确定</Text></Button>
                                </View>

                            </View>
                        </Modal>

                    );


                }
                else return (
                    null
                );
            } else if (index == 1 || index == 2 || index ==3 ) {
                //当游戏时 0 的时候
                if (times <= 0 && success == 0) {
                    //失败了
                    return (
                        <Modal isVisible={this.state.isVisiable}

                            style={styles.modalStyles}
                        >
                            <View style={styles.uiControl_catch_uiCenter_panel}>
                                <Text style={styles.content_text}>太可惜，失败啦！</Text>
                                <View style={styles.msg_button_content}>
                                    <Button  style={styles.button_style}  success onPress={() => {
                                        //确定后就要完成游戏
                                        finishCatchArGame({
                                            ...this.props.ar.catch,
                                            ...content
                                        });

                                    }}><Text>确定</Text></Button></View>
                            </View>
                        </Modal>
                    );
                } else if (times >= 0 && success == 1) {
                    //成功了
                    return (
                        <Modal isVisible={true}
                            style={styles.modalStyles}
                        >
                            <View style={styles.uiControl_catch_uiCenter_panel}>
                                <Text style={styles.content_text}>恭喜你，完成游戏！</Text>
                                <View style={styles.msg_button_content}>
                                    <Button style={styles.button_style} info block onPress={() => {
                                        //确定后就要完成游戏
                                        finishCatchArGame({
                                            ...this.props.ar.catch,
                                            ...content
                                        });

                                    }}><Text>确定</Text></Button>
                                </View>

                            </View>
                        </Modal>
                    );
                }
                else if(times<3)
                return (
                    <Modal isVisible={this.state.gameModaiView}
                        style={styles.modalStyles}
                        ref = { (component)=>{this.modeRef = component;}}
                >   
                    <View style={styles.uiControl_catch_uiCenter_panel}>
                        <Text style={styles.content_text}>回答错误，加油！还剩{times}</Text>
                        <View style={styles.msg_button_content}>
                            <Button style={styles.button_style} info block onPress={() => {
                                //确定后就要完成游戏
                                this.setState({
                                    gameModaiView:false
                                })
                            }}><Text>确定</Text></Button>
                        </View>

                    </View>
                </Modal>
                );
            }


        }

    }
    renderArContent(type, index) {
        console.log("renderArContent")
        if (type == 0) {
            //种虫
            return this.renderSelectContent();
        } else {
            return this.renderCatchContent(index);
        }


    }

    onExit(type, index) {
        if (type == 0) {
            this.onSelectExit();
        } else {
            this.onSelectExit();
        }
    }
    onCatchExit() {
        //捉虫退出
        this.setState({ msgVisiable: true });//吧弹框显示出来
    }
    onSelectExit() {

        this.setState({ msgVisiable: true });//吧弹框显示出来
    }
    onConfuirmSelect() {
        //确定按钮点击
        console.log("this.props")
        const { index } = this.props.ar.select;//取出index
        console.log(this.props)
        const { finishSelectArGame, changeIndex, pop } = this.props.actions;

        if (index < 0) {
            //没有选
            this.setState({
                openModalView: true
            });
        } else {
            //完成编辑
            finishSelectArGame({
                edited: true
            });

        }


    }
    answerQuestion() {
        //验证函数
        const { content } = this.props.navigation.state.params;
        const { times, success } = this.props.ar.catch;
        if (content.answer == this.state.answer) {
            this.props.actions.changeGameState({
                times: times - 1,
                success: 1,
            }); //在这里玩游戏
        } else {
            this.props.actions.changeGameState({
                times: times - 1,
                success: 0,
            }); //在这里玩游戏
           
        }

    }
}