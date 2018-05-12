import * as types from '../util/ActionTypes'
import * as constant from '../util/Constant'
import { push, pop, reset, goBack, reset1 } from './NavigatorAction'

export const login = function (data) {
    //登陆action,登陆成功时调用push直接进入就行,reducer里面异步存储
    return {
        type: types.LOGIN,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.login, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                let responseJson = response.json();
                responseJson.cookie = response.headers.cookie; //有就取出来，前端是不操作cookie的，reducer需要保存在本地里面
                return responseJson
            }).catch(() => { return false; })
    }
}
export const logOut = function (data) {
    //退出
    return (dispatch) => {
        dispatch(clearUser());//清空
        dispatch(reset1());

    }
}
export const clearUser = function (data) {
    //退出
    return {
        type: types.CLEAR_USER_STATE,
        payload: {}
    }
}
export const beforeRegister = function (data) {
    // 
    return (dispatch) => {
        const { regUtils } = constant;
        let userName = data.userName, password = data.password, userPhone = data.userPhone;//提出来
        if (regUtils.regCn.test(userName) || regUtils.regCn.test(password) || regUtils.regCn.test(userPhone) ||
            regUtils.regEn.test(userName) || regUtils.regEn.test(password) || regUtils.regEn.test(userPhone)
        ) {
            //有特殊字符
            dispatch(failedRegister("不能含有特殊字符(包括空格，回车，换行，标点符号)"));


        } else if (regUtils.passwordReg.test(password) == false) {
            //注册
            //有特殊字符
            dispatch(failedRegister("密码只能有数字和字母，且长度在6-16位之间"));


        } else if (regUtils.phone.test(userPhone) == false) {
            //注册
            //有特殊字符
            dispatch(failedRegister("手机号码不正确"));


        } else {
            dispatch(register(data));//注册去吧
        }



    }

}
export const failedRegister = function (des) {
    return {
        type:types.FAILED_REGISTER,
        payload:des,
    }

}
export const register = function (data) {
    //注册 
    return {
        type: types.ADD_USER,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.addUser, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json()).then((responseJson => {
                return responseJson;
            })).catch(() => { return false; })
    }

}
export const finishRegister = function () {
    //完成注册,成功或失败的时候调用
    return {
        type: types.RESET_REGIST,
        payload: {},//重置和regist有关的状态,隐藏起来modal

    };

}
export const startRegister = function () {
    //完成注册,成功或失败的时候调用
    return {
        type: types.START_REGISTER,
        payload: {},//重置和regist有关的状态,隐藏起来modal

    };

}
export const exitRegister = function () {
    //完成注册,成功或失败的时候调用
    return {
        type: types.EXIT_REGIST,
        payload: {},//重置和regist有关的状态,隐藏起来modal

    };

}
export const finishLogin = function () {
    //完成登陆,只有失败的时候回重置，其他情况，直接push
    return {
        type: types.RESET_LOGIN,
        payload: {},//重置和regist有关的状态,隐藏起来modal

    };

}
export const setCookie = function (cookie) {
    //设置cookies 本地存储有的时候调用,
    return {
        type: types.ADD_COOKIE,
        payload: cookie,

    };

}

export const turnToHomePage = function (cookie) {
    //在有cookies的时候调用,
    return (dispatch) => {
        dispatch(setCookie(cookie));//设置下cookie到总的state里面
        dispatch(getUserDetail(cookie));//获取详细，异步的就可以
        dispatch(push(
            constant.route_pathName.homePage,//主页
            {}

        ));
    }
}

export const clearUserState = function () {

    return {
        type: types.ADD_COOKIE,
        payload: cookie,
    }

}
export const unLogin = function () {
    //在有cookies的时候调用,
    return (dispatch) => {
        dispatch(setCookie(null));//设置下cookie到总的state里面
        dispatch(getUserDetail(cookie));//获取详细，异步的就可以
        dispatch(push(
            constant.route_pathName.homePage,//主页
            {}

        ));
    }
}

export const getUserDetail = function (cookie) {
    //设置用户detail,东西从服务器拿,本地存储有的时候调用
    return {
        type: types.GET_USER_DETAIL,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.getUserDetail, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'cookie': cookie,
                },
                body: JSON.stringify({})
            }).then(response => response.json()).then((responseJson => {
                return responseJson;
            })).catch(() => { return false; })
    }

}
export const resetCantrun = function () {
    return {
        type: types.RESET_CAN_TURN,
        payload: {}
    }

}
export const getUserDetailByUid = function (uid) {
    //设置用户detail,东西从服务器拿
    return {
        type: types.GET_USER_DETAIL,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.getUserDetail, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    userId: uid
                })
            }).then(response => response.json()).then((responseJson => {
                return responseJson;
            })).catch(() => { return false; })
    }

}
