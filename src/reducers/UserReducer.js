import * as types from '../util/ActionTypes';
import { AsyncStorage } from 'react-native';
const initialState = {
    addingUser: -1,//-1 未打开界面 0 打开界面未开始注册 1 正在注册 2 注册成功 3 注册失败
    login: 0,//0 未登陆 1 正在登陆 2 登陆失败
    getDetail: 0,// 0 未开始获取 ,1 获取中 2 获取成功 3 获取失败
    cookie: null,//cookie，两种设置途径 1.从存储中获得 2 从访问中获得
    getUserDetailSuccess: 0,
    canTurn:false,
    userDetail: {
        userId: -1,//用户id
        score: -1,//分数
        userName: "未命名",//姓名
    },
    isSuperUser:false,
    des: "",//登陆或者注册失败后的东西

};

export default function UserReducer(state = initialState, action = {}) {
    console.log("action");
    console.log(action);
    switch (action.type) {
        //----注册----
        case types.ADD_USER_PENDING: {
            //注册正在加载
            let newState = {
                ...state,
                addingUser: 1
            };
            return newState;
        }
        case types.START_REGISTER: {
            //开始发起这个了
            let newState = {
                ...state,
                addingUser: 0
            };
            return newState;

        }
        case types.ADD_USER_FULFILLED: {
            //成功加载-或者catch了异常

            if (action.payload == false) {
                //加载失败
                let newState = {
                    ...state,
                    addingUser: 3
                };
                return newState;

            } else if (Boolean(action.payload.success)) {
                let newState = {
                    ...state,
                    addingUser: 2,
                    des: action.payload.des,
                };
                return newState;

            } else {

                let newState = {
                    ...state,
                    addingUser: 3,
                    des: action.payload.des,
                };
                return newState;
            }

        }
        case types.ADD_USER_REJECTED: {
            //加载失败
            let newState = {
                ...state,
                addingUser: 3,
                des: "注册失败，网络错误！",
            };
            return newState;
        }
        case types.RESET_REGIST: {
            //重置
            let newState = {
                ...state,
                addingUser: 0,//重置一下,比较特殊
                des: ""
            };
            return newState;
        };
        case types.EXIT_REGIST: {
            //
            let newState = {
                ...state,
                addingUser: -1,//重置一下,比较特殊
                des: ""
            };
            return newState;
        };
        case types.FAILED_REGISTER: {
            //注册失败
            let newState = {
                ...state,
                addingUser: 4,//第四个页面
                des: action.payload
            };
            return newState;
        };

        //----登陆------
        case types.LOGIN:{
            let newState = {
                ...state,
                canTurn:false,
            }
            return newState;
        }
        case types.RESET_CAN_TURN:{
            let newState = {
                ...state,
                canTurn:false,
            }
            return newState;
        }
        
        case types.LOGIN_PENDING: {
            //注册正在加载
            let newState = {
                ...state,
                login: 1
            };
            return newState;
        }
        case types.LOGIN_PENDING: {
            //注册正在加载
            let newState = {
                ...state,
                login: 1
            };
            return newState;
        }
        case types.LOGIN_FULFILLED: {
            //成功加载-或者catch了异常

            if (action.payload == false) {
                //加载失败
                let newState = {
                    ...state,
                    des:"网络错误",
                    login: 3
                };
                return newState;

            } else if (Boolean(action.payload.success)) {

                //获取成功了,在界面的login = 2那里finish一下，然后跳转

                let newState = {
                    ...state,
                    login: 2,
                    userDetail: action.payload.userDetail,
                    isSuperUser:Boolean(action.payload.superUser),
                    des: action.payload.des,
                    canTurn:true,

                };
                return newState;

            } else {
                //其他情况
                let newState = {
                    ...state,
                    login: 3,
                    des: action.payload.des
                };
                return newState;
            }

        }
        case types.LOGIN_REJECTED: {
            //加载失败
            let newState = {
                ...state,
                login: 3
            };
            return newState;
        }
        case types.RESET_LOGIN: {
            //加载失败
            let newState = {
                ...state,
                login: 0,//重置一下,
                des: "登陆失败",
            };
            return newState;
        };
        //-----
        //----获取userDetail---
        case types.GET_USER_DETAIL_PENDING: {
            //注册正在加载
            let newState = {
                ...state,
                getDetail: 1
            };
            return newState;
        }
        case types.GET_USER_DETAIL_FULFILLED: {
            //成功加载-或者catch了异常

            if (action.payload == false) {
                //加载失败
                let newState = {
                    ...state,
                    getDetail: 3
                };
                return newState;

            } else if (Boolean(action.payload.success)) {
                //
                let newState = {
                    ...state,
                    getDetail: 2,
                    userDetail: action.payload,//放进来
                };
                return newState;

            } else {
                //其他情况
                let newState = {
                    ...state,
                    getDetail: 3
                };
                return newState;
            }

        }
        case types.GET_USER_DETAIL_REJECTED: {
            //加载失败
            let newState = {
                ...state,
                getDetail: 3
            };
            return newState;
        }
        case types.RESET_GET_USER_DETAIL: {
            //加载失败
            let newState = {
                ...state,
                getDetail: 0,//重置一下
                des: "",
            };
            return newState;
        };
        //
        case types.ADD_COOKIE: {
            //保存一下cookies在state
            let newState = {
                ...state,
                cookie: action.payload,//保存在运行state里面
            };
            return newState;
        }
        //清理用户抓鬼太
        case types.CLEAR_USER_STATE: {
            //保存一下cookies在state
            let newState = {
                ...initialState,
            };
            return newState;
        }
       
        default: {
            return state;
        }
    }
} 