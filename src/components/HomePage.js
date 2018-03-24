'use strict';

import React, { Component } from 'react';
import { MapView, Offline } from 'react-native-amap3d';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    //Text,
    Card,
    Input,
    Item,
    List,
    Form,
    CardItem,
    ListItem,
    Thumbnail
} from "native-base";

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

export default class HomePage extends Component {
    constructor(props, context) {
        console.log("HomePage props");
        console.log(props);

        super(props, context);

        /*
        this.setTimeChangeEvent = this.setTimeChangeEvent.bind(this);
        this.setPosChangeEvent = this.setPosChangeEvent.bind(this);
        this.setDeathTimeEvent = this.setDeathTimeEvent.bind(this);*/

        this.state = {
            isMoved: false,
            rt_lon: 200,
            rt_lat: 300,
            lon: 200,
            lat: 300,
            planter: "luyao", // +++++++++++++++++++++Wait to be set+++++++++++++++++++++++++++++
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


    _onMarkerPress = () => {
        console.log("STATE PASSED FROM HOME_PAGE TO POS_SETTING_PAGE is >>>>");
        console.log(this.state);

        if (this.state.isMoved == false) {
            var newState = Object.assign({}, this.state);
            newState.lon = this.state.rt_lon + 0.001;
            newState.lat = this.state.rt_lat - 0.003;
            this.props.actions.homeToPosSetPage({ pointBasic: newState });
        }
        else {
            this.props.actions.homeToPosSetPage({ pointBasic: this.state });
        }

    }

    _onInfoWindowPress = () => Alert.alert('Catch me to win bonus~')
    _onDragEvent = ({ nativeEvent }) => {

        this.setState({ lon: nativeEvent.longitude, lat: nativeEvent.latitude, isMoved: true });

        console.log("PPOINT READ FROM AMAP IS~~~~~~~~~~~~~~~~~ ");
        console.log(nativeEvent.longitude);
        console.log(nativeEvent.latitude);

        console.log("THE STATE AFTER UPDATE IS >>>>>>>>>");
        console.log(this.state.lon);
        console.log(this.state.lat);
        
    }


    render() {

        const { isHomePageVisible } = this.props;

        return (
            <MapView
                isVisible={isHomePageVisible}
                style={StyleSheet.absoluteFill}
                locationEnabled
                onLocation={({ nativeEvent }) => { this.setState({ rt_lon: nativeEvent.longitude }); this.setState({ rt_lat: nativeEvent.latitude }); console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`) }
                }
                showsTraffic={true}
                region={{ latitude: this.state.rt_lat, longitude: this.state.rt_lon, latitudeDelta: 0.008, longitudeDelta: 0.008 }}
            >
                <MapView.Marker
                    active
                    draggable
                    color="violet"
                    onDragEnd={this._onDragEvent}
                    onInfoWindowPress={this._onInfoWindowPress}
                    onPress={this._onMarkerPress}
                    coordinate={{
                        latitude: this.state.rt_lat - 0.003,
                        longitude: this.state.rt_lon + 0.001
                    }}>

                    <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                        <View style={styles.customInfoWindow}>
                            <Text>Drag me to plant GoldBug~</Text>
                            <Text style={{ textAlign: "center" }}>{this.state.tmpTime.toLocaleTimeString()}</Text>
                        </View>
                    </TouchableOpacity>
                </MapView.Marker>

            </MapView>
        )
    }
}

