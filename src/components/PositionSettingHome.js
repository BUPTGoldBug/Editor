'use strict';

import React, { Component } from 'react';
import { MapView, Marker } from 'react-native-amap3d';
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
import { View, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native'
import * as constant from '../util/Constant'
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import { TextInput, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';


const styles = StyleSheet.create({
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#8bc34a',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#689F38',
        marginBottom: 5,
    },
    customMarker: {
        backgroundColor: '#009688',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    markerText: {
        color: '#fff',
    },
})


export default class PositionSettingHome extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isMoved: false,
            end_lon: 200,
            end_lat: 300,
            tmpTime: new Date(),
        };

    }

    componentDidMount() {
        this.mounted = true
        setInterval(() => {
            if (this.mounted) {
                this.setState({ tmpTime: new Date() })
            }
        }, 1000)
    }

    componentWillUnmount() {
        this.mounted = false
    }


    onPress = () => {
        this.props.actions.posSetToEndPointPage(this.state);
    }

    onPress_ = () => {
        this.props.actions.endPointPageToDySettingPage({ pointBasic: this.state });
    }

    _onMarkerPress = () => {
        console.log("STATE PASSED FROM POS_SETTING_PAGE is >>>>");
        console.log(this.state);


        if (this.state.isMoved == false) {
            Alert.alert('Reminder', 'Please MOVE to Chose the Target End Point！');
        }
        else {
            console.log("STATE IS ABOUT TO PASS-------");
            this.props.actions.endPointPageToDySettingPage({ pointBasic: this.state });
        }

    }

    _onInfoWindowPress = () => Alert.alert('To chose the END POINT, first to drag the point to your target area (Road only please), then confirm by clicking it~ \n\n Have a try now~!')
    _onDragEvent = ({ nativeEvent }) => {

        this.setState({ end_lon: nativeEvent.longitude, end_lat: nativeEvent.latitude, isMoved: true });

        console.log("END PPOINT READ FROM AMAP IS~~~~~~~~~~~~~~~~~ ");
        console.log(this.state.end_lat);
        console.log(this.state.end_lon);

    }

    render() {

        const { isPosSetHomeVisible, isEndPointPageVisible, isDySettingPageVisible } = this.props;
        const { pointBasic } = this.props.navigation.state.params;

        // console.log("ISPOSSETHOME Visible??>>>>>>>>");
        // console.log(isPosSetHomeVisible);
        //console.log(pointBasic);
        console.log("ISEndPointPageVisible??>>>>>>>>");
        console.log(isEndPointPageVisible);


        if (isEndPointPageVisible)
            return (
                <MapView
                    style={StyleSheet.absoluteFill}
                    showsTraffic={true}
                    region={{ latitude: pointBasic.lat, longitude: pointBasic.lon, latitudeDelta: 0.005, longitudeDelta: 0.005 }}
                >
                    <MapView.Marker
                        active
                        draggable
                        color="violet"
                        onDragEnd={this._onDragEvent}
                        onInfoWindowPress={this._onInfoWindowPress}
                        onPress={this._onMarkerPress}
                        coordinate={{
                            latitude: pointBasic.lat - 0.003,
                            longitude: pointBasic.lon + 0.001
                        }}>

                        <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                            <View style={styles.customInfoWindow}>
                                <Text>Drag me to chose END POINT~</Text>
                                <Text style={{ textAlign: "center" }}>{this.state.tmpTime.toLocaleTimeString()}</Text>
                            </View>
                        </TouchableOpacity>
                    </MapView.Marker>

                    <Marker
                        title='Start Point'
                        image='flag'
                        coordinate={{
                            latitude: pointBasic.lat,
                            longitude: pointBasic.lon
                        }}
                    />

                </MapView>

            );
        if (isDySettingPageVisible) {
            return (
                <View>
                    <Modal isVisible={true} swipeDirection="right">
                        <View style={{ marginTop: 140, marginLeft: 40, marginRight: 40, marginBottom: 180, backgroundColor: "#D5EAE9", borderRadius: 35, flex: 1, paddingTop: 30 }}>
                            <Text style={{ fontSize: 20, margin: 4, alignSelf: "center" }}>Activate GoldBug</Text>
                            <Grid style={{ marginTop: 10, marginBottom: 30 }}>
                                <Row>
                                    <Button rounded block style={{ margin: 10, backgroundColor: "#FF1493", height: 70, flex: 1 }} onPress={() => {
                                        Alert.alert('', 'A');
                                    }}>
                                        <Icon name='pulse' />
                                        <Text style={{ fontSize: 16, alignSelf: "center" }}>All the Time</Text>
                                    </Button>
                                </Row>
                                <Row>
                                    <Button rounded block style={{ margin: 10, backgroundColor: "#0000CD", height: 70, flex: 1 }} onPress={() => { Alert.alert('', 'B'); }}>
                                        <Icon name='alarm' />
                                        <Text style={{ fontSize: 16, alignSelf: "center" }}>Specific Time</Text>
                                    </Button>
                                </Row>
                            </Grid>
                        </View>
                    </Modal>
                </View>
            );
        }
        else {
            return (
                <Modal isVisible={isPosSetHomeVisible} swipeDirection="right">
                    <View style={{ marginTop: 100, marginBottom: 100, marginLeft: 25, marginRight: 25, backgroundColor: "#D5EAE9", borderRadius: 5, flex: 1 }}>
                        <View>
                            <Text style={{ fontSize: 16, margin: 20, alignSelf: "center" }}>Click to Chose the END POINT</Text>
                        </View>

                        <View style={{ width: 300, height: 140, paddingLeft: 17 }}>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={this.onPress}
                            >
                                <Image
                                    style={{}}
                                    source={require('../../resource/Line.jpg')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: 320, height: 180, paddingLeft: 30, paddingTop: 16 }}>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={this.onPress_}
                            >
                                <Image
                                    style={{}}
                                    source={require('../../resource/StaticLine.jpg')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

            );
        }

    }

}

/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
})*/

