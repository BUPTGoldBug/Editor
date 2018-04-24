//
'use strict';

import React, { Component } from 'react';

import { StyleSheet, Alert } from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroNode,
    ViroButton,
    ViroBox,
    ViroScene,
    ViroQuad,
    Viro3DObject,
    ViroARPlaneSelector,
    ViroARPlane,
    ViroSpotLight,
    ViroDirectionalLight,
    ViroMaterials,
    ViroFlexView,
    ViroImage,
    ViroPortalScene,
    ViroPortal,
    Viro360Image,
    ViroAmbientLight,
    ViroParticleEmitter,
    ViroSphere,
    ViroController
} from 'react-viro';
import TimeMix from 'react-timer-mixin'
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

} from 'native-base';

import { styles, sharedProps, gameList, vectorList, xConfilt } from '../util/Constant';
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'
const initBallPosition = [0, -0.5, -1.0];
const initBallPhyiscs = {
    friction: 0.6,
    type: 'Dynamic',
    mass: 4,
    enabled: true,
    useGravity: true,
    shape: {
        type: 'Sphere',
        params: [0.14]
    },
    restitution: 0.65
};
export default class ARSceneCatchPage extends Component {
    constructor(prop, ctx) {
        super(prop, ctx);
        this.state = {
            imageUrl: require("../resources/portal_res/2.jpg"), //直接预加载
            run: false,
            gForce: 10,
            forces: [0, 0, 0],
            viroAppProps: this.props.arSceneNavigator.viroAppProps, //只能获取一次，不能实时通信，需要通信吗？？
            catch_: this.props.arSceneNavigator.viroAppProps.ar.catch,
            animate: { name: "animateObject", run: true },
            ballTag: "ballTag",
            objectTag: "objectTag",
            unvisiableTag: "unvisiableTag",
            ground: "ground",
            initBallPosition: [0, -0.5, -1.0],
            initBallPhyiscs: {
                friction: 0.6,
                type: 'Dynamic',
                mass: 4,
                enabled: true,
                useGravity: true,
                shape: {
                    type: 'Sphere',
                    params: [0.14]
                },
                restitution: 0.65,

            },
        }
        this.clicked = false;//一个记录变量
        this.renderGame = this.renderGame.bind(this);
        this.renderGame1 = this.renderGame1.bind(this);
        this.renderGame2 = this.renderGame2.bind(this);
        this.initScene = this.initScene.bind(this);
        this.onCollide = this.onCollide.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickState = this.onClickState.bind(this);
        this._setBoxRef = this._setBoxRef.bind(this);
        this._setControllerNodeRef = this._setControllerNodeRef.bind(this);

    }
    componentWillReceiveProps(nextProps) {
       // console.log("nextProps")
       // console.log(nextProps);
        const catch_  = nextProps.arSceneNavigator.viroAppProps.ar.catch;
        this.setState({
            catch_: catch_
        });

    }
    componentWillUnmount() {
        this.timer1 && clearTimeout(this.timer1);
        this.timer2 && clearTimeout(this.timer2);

    }
 

    render() {
        const { typeIndex } = this.state.viroAppProps; //游戏界面只需要index,
        this.initBallPosition = this.state.initBallPosition;
        this.initBallPhyiscs = this.state.initBallPhyiscs;
        return this.renderGame(typeIndex);



    }

    renderGame(typeIndex) {
        if (typeIndex == 0) {
            return this.renderGame1();
        } else {
            return this.renderGame2();
        }


    }
    renderGame1() {
        //这里渲染game1


        return (
            <ViroARScene physicsWorld={{
                gravity: [0, -1 * this.state.gForce, 0]
            }}>
                <ViroAmbientLight color="#ffffff" intensity={200} />
                <ViroController ref={this._setControllerNodeRef} />
                <ViroNode position={[0, -1, -4]} dragType="FixedToWorld" onDrag={undefined}>

                    <Viro3DObject
                        ref={(component) => { this._3dObject = component }}
                        source={require('../resources/res/icecreamman_anim/icecreamman_anim_a.vrx')}
                        resources={[require('../resources/res/icecreamman_anim/icecreamman_diffuse.png'),
                        require('../resources/res/icecreamman_anim/icecreamman_normal.png'),
                        require('../resources/res/icecreamman_anim/icecreamman_specular.png')]}
                        physicsBody={{ type: 'Static', restitution: 0.75 }}
                        position={[0, 0, 0]}
                        scale={[.5, .5, .5]}
                        type="VRX"
                        viroTag={this.state.objectTag}
                        animation={undefined}
                    />


                </ViroNode>
           
                <ViroNode
                    ref={this._setBoxRef}
                    position={this.state.initBallPosition}
                    width={.5}
                    height={.5}
                    length={.5}
                    onClickState={this.onClickState}

                    onCollision={this.onCollide}
                    physicsBody={
                       null
                    }
                    viroTag={this.state.ballTag}
                    onDrag={undefined}
                >

                    <Viro3DObject
                        source={require('../resources/res/object_basketball_pbr.vrx')}
                        scale={[0.5, 0.5, 0.5]}
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        resources={[require('../resources/res/blinn1_Base_Color.png'),
                        require('../resources/res/blinn1_Metallic.png'),
                        require('../resources/res/blinn1_Roughness.png'),
                        require('../resources/res/blinn1_Normal_OpenGL.png')]}
                        type="VRX"


                       

                    />

                </ViroNode>
                <ViroQuad
                    position={[0, -1, 0]}
                    scale={[6.0, 8.0, 10.0]}
                    rotation={[-90, 0, 0]}
                    physicsBody={{ type: 'Static', restitution: 0.75 }}
                   
                    ref={(component) => { this.floorSurface = component }}
                    viroTag={this.state.unvisiableTag}
                    materials={'ground'} />

                <ViroQuad
                    position={[0, -3, 0]}
                    scale={[100, 100, 100]}
                    rotation={[-90, 0, 0]}
                    physicsBody={{ type: 'Static', restitution: 0.75 }}
              
                    ref={(component) => { this.unvisiableFloorSurface = component }}
                    viroTag={this.state.unvisiableTag}
                    materials={'unGround'} />
            </ViroARScene >
        );

    }
    _setBoxRef(component) {
        this.boxRef = component;
    }
    _setControllerNodeRef(component) {
        this.controllerRef = component;
    }
    onClickState(state) {
        const {  startCatchProcesser,endCatchProcesser} = this.state.viroAppProps.actions;
        //Alert.alert("","")
        if (state == 1) {
            //按下
         
            startCatchProcesser();
        } else if (state == 2) {
            //弹上来
            endCatchProcesser();
           
            this.initScene();
            this.boxRef.setNativeProps({ "physicsBody": this.initBallPhyiscs });
            this.onClick();
        } 
    }
    renderGame2() {
        return (
            <ViroARScene>
                <ViroAmbientLight color="#ffffff" intensity={200} />
                <ViroPortalScene dragType="FixedDistance" passable={true} >
                    <ViroPortal position={[0, 0, -1]} scale={[.3, .3, .3]}>
                        <Viro3DObject source={require('../resources/portal_res/portal_wood_frame/portal_wood_frame.vrx')}
                            resources={[require('../resources/portal_res/portal_wood_frame/portal_wood_frame_diffuse.png'),
                            require('../resources/portal_res/portal_wood_frame/portal_wood_frame_normal.png'),
                            require('../resources/portal_res/portal_wood_frame/portal_wood_frame_specular.png')]}
                            type="VRX" />
                    </ViroPortal>
                    <Viro360Image source={require("../resources/portal_res/2.jpg")} />
                </ViroPortalScene>

            </ViroARScene>
        );

    }
    onCollide(collidedTag, collidedPoint, collidedNormal) {
        const {  startCatchProcesser,endCatchProcesser,changeGameState} = this.state.viroAppProps.actions;
        const { times,success,start } = this.state.catch_;
       // console.log("collidedTag:" + collidedTag)
        if (collidedTag == this.state.objectTag && this.clicked == false) {
            //撞到了物体
            this._3dObject.setNativeProps({
                animation: this.state.animate
            });

            changeGameState({
                times:times-1,
                success:1,
            });
            this.initScene();
        } else if (collidedTag == this.state.ground && this.clicked == false) {
         
            changeGameState({
                times:times-1,
                success:0,
            });
            this.initScene();
        } else if (collidedTag == this.state.unvisiableTag && this.clicked == false) {
          changeGameState({
                times:times-1,
                success:0,
           });
           this.initScene();
        }
    }


    onClick() {


        this.controllerRef.getControllerForwardAsync().then((forward) => {

            var pushImpulse = [xConfilt[this.state.catch_.xConfict], 5 * vectorList[this.state.catch_.strength], -4 * vectorList[this.state.catch_.strength]];

           // console.log(pushImpulse);
            this.boxRef.getTransformAsync().then((transform) => {
                var pos = transform.position;
            
                var pushPosition = [0.1, 0.1, 0];
            
                this.boxRef.applyImpulse(pushImpulse, pushPosition);
            }).catch(() => { });
        }).catch(() => { });


    }

    initScene() {
        this.clicked = true;
        //   console.log(this.boxRef);
        this.boxRef.setNativeProps({ "physicsBody": null });
        this._3dObject.setNativeProps({ "animation": undefined });
        this.boxRef.setNativeProps({ "position": this.initBallPosition });
        this._3dObject.setNativeProps({ "rotation": [0, 0, 0] })
       // console.log("after position:" + this.boxRef.props.position[0] + "," + this.boxRef.props.position[1] + "," + this.boxRef.props.position[2])
       
       
        this.clicked = false; //设置一个,等下改 



    }
}