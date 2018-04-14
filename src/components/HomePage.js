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
    Card,
    Input,
    Item,
    List,
    Form,
    CardItem,
    ListItem,
    Thumbnail
} from "native-base";
//import index from './C:/Users/Luyao/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-native-datepicker';

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

        this.state = {
            isMoved: false,
            rt_lon: 200,
            rt_lat: 300,
            lon: 200,
            lat: 300,
            planter: "luyao", // +++++++++++++++++++++Wait to be set+++++++++++++++++++++++++++++
            tmpTime: new Date(),
            mark_lon: 200,
            mark_lat: 300
        };
    }


    componentDidMount() {
        this.mounted = true
        setInterval(() => {
            if (this.mounted) {
                this.setState({ tmpTime: new Date() })
            }
        }, 1000)

        this.interval = setInterval(() => {
            this.props.actions.getAroundBugs({ userLon: this.state.rt_lon, userLat: this.state.rt_lat });
        }, 400);
    }

    componentWillUnmount() {
        this.mounted = false

        this.interval && clearTimeout(this.interval);
    }

    _catcherOnMarkerPress = (GoldBugId) =>{
        Alert.alert("GoldBugId is "+ GoldBugId+" ~!");
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

        const { isHomePageVisible, bugsAround } = this.props;

        console.log("++++++++BUGS AROUND+++++++++++");
        console.log(bugsAround);

        return (
            <MapView
                isVisible={isHomePageVisible}
                style={StyleSheet.absoluteFill}
                locationEnabled
                onLocation={({ nativeEvent }) => {
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
                            <Text style={{ textAlign: "center" }}>{this.state.tmpTime.toLocaleTimeString()}</Text>
                        </View>
                    </TouchableOpacity>
                </MapView.Marker>
                {this.renderBugsAround(bugsAround)}
            </MapView>
        );
    };
    renderBugsAround(bugsAround){
        return bugsAround.map((bug, index) => {
            return (<MapView.Marker
                active
                draggable
                GoldBugId = { bug.bugId}
                color="blue"
                onPress={()=>{
                    this._catcherOnMarkerPress(bug.bugId)
                }}
                coordinate={{
                    latitude: bug.lat,
                    longitude: bug.lon
                }}>
            </MapView.Marker>
            );
        })
    }};
