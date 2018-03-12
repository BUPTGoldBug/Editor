'use strict';

import React, { Component } from 'react';
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
import { View } from 'react-native'
import * as constant from '../util/Constant'
import Modal from "react-native-modal";

export default class AddUserPage extends Component {
    constructor(props, context) {
        console.log("AddUserPage props");
        console.log(props);

        super(props, context);

        this.changeUserNameEvent = this.changeUserNameEvent.bind(this);
        this.changeUserPhoneEvent = this.changeUserPhoneEvent.bind(this);
        this.commitUser = this.commitUser.bind(this);
        this.state = {
            userPhone: "",
            userName: ""
        };
    }

    render() {
        const { isAddingUser, isAddingUserSuccess, isDisable ,contentText} = this.props;
      
        return (
            <Container style={{flex:1}}>
                <View>
                    <Modal isVisible = {isDisable}>
                       <Text style={{textAlign:'center',color:'#ffffff',fontSize:50}}>{contentText}</Text>
                    </Modal>
                </View>
                <Header />
                <Content>
                    <Form>
                        <Item rounded>
                            <Input placeholder='UserPhone' onChangeText={this.changeUserPhoneEvent} />
                        </Item>

                        <Item rounded>
                            <Input placeholder='UserName' onChangeText={this.changeUserNameEvent} />
                        </Item>
                    </Form>
                    <Button block disabled={isDisable} rounded style={{ backgroundColor: "#ff00c9" }}   onPress={this.commitUser}>
                        <Text >I wanna IN</Text>
                    </Button>
                </Content>
            </Container>
        );

    }

    changeUserPhoneEvent(userPhone) {
        this.setState({ userPhone: userPhone });
    }

    changeUserNameEvent(userName) {
        this.setState({ userName: userName });
    }

    commitUser() {
        let obj=Object.assign({},this.state);
        this.props.actions.addUser(obj);
    }
  
    /*renderPendingField(isListLoading, isListLoadFailed, userList) {
        //渲染
        if (isListLoading == true) {
            //正在加载
            return (<Icon1 name="spinner" style={{ fontSize: 20 }} />);


        } else if (isListLoading == false) {
            //不是在加载
            if (isListLoadFailed == true) {
                return <Text >加载失败</Text>;

            } else {
                if (userList.length > 0) {
                    //加载成功且不是空的
                    return <FlatList data={userList} renderItem={this.renderUserList} keyExtractor={(item, index) => (item.uid)} />

                } else {
                    //成功加载，但是是空的
                    return <Text>空</Text>;
                }

            }

        }

    }*/

    /* searchInputChange(txt) {
         //搜索
         //这个action是在相应的container里面传进来的
         this.props.actions.searchUser(txt);
 
     }*/

    /**
     * 
     * 
     * user是服务器传来的user对象
     * 服务器传过来是{userList:[
     *  {
     *      uid:,
     *      uname:,
     *      password:,
     *      position:,
     *      ....
     *  }
     * ]
     * 
     *  
     * }
     */
    /*
    renderUserList({ item }) {
        //渲染
        //action在onpress里面调用
        console.log("user");

        let user = item;
        console.log(user);
        return (<ListItem avatar onPress={() => {
            this.props.actions.push(constant.route_pathName.userDetailPage, { userName: user.uid })
        }
        }>
            <Left>
                <Thumbnail source={require('../resources/user_selected.png')} />
            </Left>
            <Body>
                <Text>{user.uname}</Text>
                <Text note>{user.position}</Text>
            </Body>
            <Right>
                <Text note>3:43 pm</Text>
            </Right>
        </ListItem>);

    }*/

}