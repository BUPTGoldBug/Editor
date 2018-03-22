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

    _onMarkerPress = () => {
        console.log("STATE PASSED FROM POS_SETTING_PAGE is >>>>");
        console.log(this.state);


        console.log("STATE IS ABOUT TO PASS-------");
        //this.props.actions.homeToPosSetPage({ pointBasic: this.state });
    }

    _onInfoWindowPress = () => Alert.alert('To chose the END POINT, first to drag the point to your target area (Road only please), then confirm by clicking it~ \n\n Have a try now~!')
    _onDragEvent = ({ nativeEvent }) => {

        this.setState({ end_lon: nativeEvent.longitude });
        this.setState({ end_lat: nativeEvent.latitude });


        console.log("END PPOINT READ FROM AMAP IS~~~~~~~~~~~~~~~~~ ");
        console.log(this.state.end_lat);
        console.log(this.state.end_lon);

    }

    render() {

        const { isPosSetHomeVisible, isEndPointPageVisible } = this.props;
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

            )
        else {
            return (
                <Modal isVisible={isPosSetHomeVisible} swipeDirection="right">
                    <View style={{ marginTop: 100, marginBottom: 100, marginLeft: 25, marginRight: 25, backgroundColor: "#D5EAE9", borderRadius: 5, flex: 1 }}>
                        <Form>
                            <Item>
                                <Text style={{ fontSize: 16, margin: 20, alignSelf: "center" }}>Click to Chose the END POINT</Text>
                            </Item>
                            <TouchableOpacity
                                style={{ alignSelf: "center", marginTop: 50 }}
                                onPress={this.onPress}
                            >
                                <Image
                                    style={{ padding: 2, borderRadius: 14 }}
                                    source={require('../../resource/line.jpg')}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                        </Form>
                    </View>
                </Modal>

            );
        }

        /*return (
                <MapView
                    isVisible={isEndPointPageVisible}
                    style={StyleSheet.absoluteFill}
                    locationEnabled
                    onLocation={({ nativeEvent }) => { this.setState({ rt_lon: nativeEvent.longitude }); this.setState({ rt_lat: nativeEvent.latitude }); console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`) }
                    }
                    showsTraffic={true}
                    region={{ latitude: this.state.rt_lat, longitude: this.state.rt_lon, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
                >
        );*/


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

