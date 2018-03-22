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
            lon: "200",
            lat: "300",
            planter: "luyao", // +++++++++++++++++++++Wait to be set+++++++++++++++++++++++++++++
            tmpTime: new Date()
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


    _coordinates = [
        {
            latitude: 39.806901,
            longitude: 116.397972,
        },
        {
            latitude: 39.806901,
            longitude: 116.297972,
        },
        {
            latitude: 39.906901,
            longitude: 116.397972,
        },
        {
            latitude: 39.706901,
            longitude: 116.397972,
        },
    ]

    _onMarkerPress = () => Alert.alert('Catch me to win bonus~')
    _onInfoWindowPress = () => Alert.alert('Catch me to win bonus~')
    _onDragEvent = ({ nativeEvent }) => {
        console.log("PPOINT READ FROM AMAP IS~~~~~~~~~~~~~~~~~ ");
        console.log(nativeEvent.longitude);
        console.log(nativeEvent.latitude);

        var newState = Object.assign({}, this.state);
        newState.lon = nativeEvent.longitude;
        newState.lat = nativeEvent.latitude;


        console.log("STATE FROM HOME PAGE IS -------");
        console.log(newState);
        this.props.actions.homeToPosSetPage({ pointBasic: newState });
    }
    

    render() {

        const { isHomePageVisible } = this.props;

        return (
            <MapView isVisible={isHomePageVisible} style={StyleSheet.absoluteFill}>
                <MapView.Marker
                    active
                    draggable
                    color="violet"
                    onDragEnd={this._onDragEvent}
                    onInfoWindowPress={this._onInfoWindowPress}
                    onPress={this._onMarkerPress}
                    coordinate={this._coordinates[0]}>

                    <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                        <View style={styles.customInfoWindow}>
                            <Text>Drag me to plant GoldBug~</Text>
                            <Text style={{textAlign: "center"}}>{this.state.tmpTime.toLocaleTimeString()}</Text>
                        </View>
                    </TouchableOpacity>
                </MapView.Marker>

            </MapView>
        )
    }
}

