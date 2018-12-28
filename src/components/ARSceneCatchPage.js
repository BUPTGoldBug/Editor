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
    ViroController,
    ViroLightingEnvironment,
    ViroARImageMarker,
    ViroOmniLight
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
            texture: "white",
            playAnim: false,
            animateCar: false,
            tapWhite: false,
            tapBlue: false,
            tapGrey: false,
            tapRed: false,
            tapYellow: false,

            loopState:false,
            animationName:"01",
            pauseUpdates : false,
            modelAnim: false,
        }
        this._onAnchorFound = this._onAnchorFound.bind(this);
        this._toggleButtons= this._toggleButtons.bind(this);
        this. _selectWhite= this._selectWhite.bind(this);
        this. _selectBlue= this._selectBlue.bind(this);
        this. _selectGrey= this._selectGrey.bind(this);
        this. _selectRed= this._selectRed.bind(this);
        this. _selectYellow= this._selectYellow.bind(this);
        this. _animateFinished= this._animateFinished.bind(this);
        this.clicked = false;//一个记录变量
        this.renderGame = this.renderGame.bind(this);
        this.renderGame1 = this.renderGame1.bind(this);
        this.renderGame2 = this.renderGame2.bind(this);
        this.renderGame3 = this.renderGame3.bind(this);
        this.initScene = this.initScene.bind(this);
        this.onCollide = this.onCollide.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickState = this.onClickState.bind(this);
        this._setBoxRef = this._setBoxRef.bind(this);
        this._setControllerNodeRef = this._setControllerNodeRef.bind(this);
        this.renderGame4 = this.renderGame4 .bind(this);

        this.  _onFinish= this._onFinish.bind(this);
        
        this.  _onAnchorFound1= this._onAnchorFound1.bind(this);
        
        this. _onModelLoad = this._onModelLoad.bind(this);
    }
    componentWillReceiveProps(nextProps) {
       // console.log("nextProps")
       // console.log(nextProps);
        const catch_  = nextProps.arSceneNavigator.viroAppProps.ar.catch;
        this.setState({
            catch_: catch_,
        
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
        } else if(typeIndex == 1){
            return this.renderGame2();
        }else if(typeIndex == 2){
            return this.renderGame3();
        }else if(typeIndex == 3){
            return this.renderGame4();
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
            console.log("un press!!!!")
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
                    <Viro360Image source={require("../resources/portal_res/yourname.jpg")} />
                </ViroPortalScene>

            </ViroARScene>
        );

    }
    renderGame3(){
        return (
            <ViroARScene>
      
              <ViroLightingEnvironment source={require('../resources/tesla/garage_1k.hdr')}/>
      
              <ViroARImageMarker target={"logo"} onAnchorFound={this._onAnchorFound} pauseUpdates={this.state.pauseUpdates}>
                <ViroNode scale={[0, 0, 0]} transformBehaviors={["billboardY"]} animation={{name:this.state.animName, run:this.state.playAnim,}}>
                  <ViroSphere materials={["white_sphere"]}
                    heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                    position={[-.2, .25, 0]}
                    onClick={this._selectWhite}
                    animation={{name:"tapAnimation", run:this.state.tapWhite, onFinish:this._animateFinished}}
                    shadowCastingBitMask={0} />
      
                  <ViroSphere materials={["blue_sphere"]}
                    heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                    position={[-.1, .25, 0]}
                    onClick={this._selectBlue}
                    animation={{name:"tapAnimation", run:this.state.tapBlue, onFinish:this._animateFinished}}
                    shadowCastingBitMask={0} />
      
                  <ViroSphere materials={["grey_sphere"]}
                    heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                    position={[0, .25, 0]}
                    onClick={this._selectGrey}
                    animation={{name:"tapAnimation", run:this.state.tapGrey, onFinish:this._animateFinished}}
                    shadowCastingBitMask={0} />
      
                  <ViroSphere materials={["red_sphere"]}
                    heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                    position={[.1, .25, 0]}
                    onClick={this._selectRed}
                    animation={{name:"tapAnimation", run:this.state.tapRed, onFinish:this._animateFinished}}
                    shadowCastingBitMask={0} />
      
                  <ViroSphere materials={["yellow_sphere"]}
                    heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                    position={[.2, .25, 0]}
                    onClick={this._selectYellow}
                    animation={{name:"tapAnimation", run:this.state.tapYellow, onFinish:this._animateFinished}}
                    shadowCastingBitMask={0}/>
                </ViroNode>
      
                <Viro3DObject
                  scale={[0, 0, 0]}
                  source={require('../resources/tesla/object_car.obj')}
                  resources={[require('../resources/tesla/object_car_2.mtl'),
                              ]}
                  type="OBJ"
                  materials={this.state.texture}
                  onClick={this._toggleButtons}
                  animation={{name:"scaleCar", run:this.state.animateCar,}} />
      
                <ViroSpotLight
                  innerAngle={5}
                  outerAngle={25}
                  direction={[0,-1,0]}
                  position={[0, 5, 1]}
                  color="#ffffff"
                  castsShadow={true}
                  shadowMapSize={2048}
                  shadowNearZ={2}
                  shadowFarZ={7}
                  shadowOpacity={.7} />
      
                <ViroQuad
                  rotation={[-90, 0, 0]}
                  position={[0, -0.001, 0]}
                  width={2.5} height={2.5}
                  arShadowReceiver={true} />
      
              </ViroARImageMarker>
            </ViroARScene>
          );
     



    }
    renderGame4(){
        return (
            <ViroARScene>
              <ViroAmbientLight color="#ffffff" intensity={200}/>
      
              <ViroARImageMarker target={"poster"} onAnchorFound={this._onAnchorFound1} pauseUpdates={this.state.pauseUpdates}>
      
                <ViroNode position={[0, -.1, 0]} scale={[0,0,0]} rotation={[-90, 0, 0]} dragType="FixedToWorld" onDrag={()=>{}}
                  animation={{name:"scaleModel", run:this.state.playAnim,}} >
                  <Viro3DObject onLoadEnd={this._onModelLoad}
                    source={require('../resources/blackpanther/object_bpanther_anim.vrx')}
                    resources={[require('../resources/blackpanther/object_bpanther_Base_Color.png'),
                                require('../resources/blackpanther/object_bpanther_Metallic.png'),
                                require('../resources/blackpanther/object_bpanther_Mixed_AO.png'),
                                require('../resources/blackpanther/object_bpanther_Normal_OpenGL.png'),
                                require('../resources/blackpanther/object_bpanther_Roughness.png')]}
                    position={[0, -1.45, 0]}
                    scale={[.9,.9,.9]}
                    animation={{name:this.state.animationName, run:this.state.modelAnim, loop:this.state.loopState, onFinish:this._onFinish,}}
                    type="VRX" />
        
                </ViroNode>
      
              </ViroARImageMarker>
      
              <ViroOmniLight
                  intensity={300}
                  position={[-10, 10, 1]}
                  color={"#FFFFFF"}
                  attenuationStartDistance={20}
                  attenuationEndDistance={30} />
      
              <ViroOmniLight
                  intensity={300}
                  position={[10, 10, 1]}
                  color={"#FFFFFF"}
                  attenuationStartDistance={20}
                  attenuationEndDistance={30} />
      
              <ViroOmniLight
                  intensity={300}
                  position={[-10, -10, 1]}
                  color={"#FFFFFF"}
                  attenuationStartDistance={20}
                  attenuationEndDistance={30} />
      
              <ViroOmniLight
                  intensity={300}
                  position={[10, -10, 1]}
                  color={"#FFFFFF"}
                  attenuationStartDistance={20}
                  attenuationEndDistance={30} />
      
              <ViroSpotLight
                position={[0, 8, -2]}
                color="#ffffff"
                direction={[0, -1, 0]}
                intensity={50}
                attenuationStartDistance={5}
                attenuationEndDistance={10}
                innerAngle={5}
                outerAngle={20}
                castsShadow={true}
              />
      
              <ViroQuad
                rotation={[-90, 0, 0]}
                position={[0, -1.6, 0]}
                width={5} height={5}
                arShadowReceiver={true}
                />
      
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
    _onFinish(){
        this.setState({
          animationName : "02",
          loopState: true,
        })
      }
    
      _onAnchorFound1() {
        this.setState({
          pauseUpdates: true,
          playAnim: true,
          modelAnim: true,
        })
      }
    
      _onModelLoad() {
        setTimeout(()=> {
          this.setState({
    
          })
        }, 3000);
      }
    _onAnchorFound() {
        this.setState({
          animateCar: true,
        })
      }
      _toggleButtons() {
        this.setState({
          animName: (this.state.animName == "scaleUp" ? "scaleDown" : "scaleUp"),
          playAnim: true
        })
      }
      _selectWhite(){
        this.setState({
          texture : "white",
          tapWhite: true
        })
      }
      _selectBlue(){
        this.setState({
          texture : "blue",
          tapBlue: true
        })
      }
      _selectGrey(){
        this.setState({
          texture : "grey",
          tapGrey: true
        })
      }
      _selectRed(){
        this.setState({
          texture : "red",
          tapRed: true
        })
      }
      _selectYellow(){
        this.setState({
          texture : "yellow",
          tapYellow: true
        })
      }
      _animateFinished(){
        this.setState({
          tapWhite: false,
          tapBlue: false,
          tapGrey: false,
          tapRed: false,
          tapYellow: false,
        })
      }
}