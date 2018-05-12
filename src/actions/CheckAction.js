
import * as types from '../util/ActionTypes'
import * as constant from '../util/Constant'
import { push, pop, reset, goBack } from './NavigatorAction'


export const getCheckedList = function () {
    //拉取,成功后的_FULFILLED里面 设置2 3
    console.log("getCheckedList:"+  constant.ROOT_SERVER_URL + constant.URL.getCheckedList)
    return {
        type: types.GET_CHECKED_LIST,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.getCheckedList, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type:1
                })
            }).then(response => {
                let responseJson = response.json();
                return responseJson
            }).catch(() => { return false; })
    }
}
export const getCheckingList = function () {
    //拉取,成功后的_FULFILLED里面 设置2 3
    console.log("getCheckingList:"+  constant.ROOT_SERVER_URL + constant.URL.getCheckingList)
    return {
        type: types.GET_CHECKING_LIST, 
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.getCheckingList, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type:0
                })
            }).then(response => {
                let responseJson = response.json();
                return responseJson
            }).catch(() => { return false; })
    }

}
export const getBugDetail = function (bugId,userName,type) {
 
    //获取详情,成功后的_FULFILLED里面设置2 3
    return {
        type: types.GET_BUG_DETAIL,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.getCheckedOrCheckingDetail, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
            
                    bid:bugId,
                    userId:1,
                    rt_lon:0,
                    rt_lat:0,
                    isSuperUser:0,
                })
            }).then(response => {
                let responseJson = response.json();
                return responseJson
            }).catch(() => { return false; })
    }


}
export const checkThisBug = function (bugId, userName) {
    //发起确认,,成功后的_FULFILLED里面设置2 3
    return {
        type: types.CHECK_BUG,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.checkBug, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bugId: bugId, //id传进来
                    userName: userName,
                    type:0,
                })
            }).then(response => {
                let responseJson = response.json();
                return responseJson
            }).catch(() => { return false; })
    }


}
export const drawBackBug = function (bugId, userName) {
    //发起drawBack
    return {
        type: types.DRAWBACK_BUG,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.drawBackBug, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bugId: bugId, //id传进来
                    userName: userName,
                    type:1,
                })
            }).then(response => {
                let responseJson = response.json();
                return responseJson
            }).catch(() => { return false; })
    }

}

export const quitDetail = function () {
    //点击取消 (已审核或未审核)
    return (dispatch) => {
        dispatch(resetGetDetailState(0));//关闭窗口

    }


}
export const finishChecking = function () {
    //点击确认完成checking,成功的时候
    return (dispatch) => {
     
        dispatch(resetCheckingState(0));//重置状态
        dispatch(resetGetDetailState(0));//关闭窗口
        dispatch(getCheckingList());//重新拉取一下
    }

}
export const finishDrawBack = function () {
    //点击确认完成drawback,成功的时候

    return (dispatch) => {

        dispatch(resetdrawBackState(0));//重置状态
        dispatch(resetGetDetailState(0));//关闭窗口
        dispatch(getCheckingList());//重新拉取一下

    }
}
export const exitChecking = function () {
    //checking失败，失败按钮确认
    return (dispatch) => {
        dispatch(resetdrawBackState(0));//重置状态
        dispatch(resetCheckingState(0));//重置状态
    }
}
export const exitDrawBack = function () {
    //drawback失败，失败按钮确认
    return (dispatch) => {
        dispatch(resetCheckingState(0));//重置状态
        dispatch(resetdrawBackState(0));//重置状态
    }
}
//-----以上的action都会进入这里的方法------
export const resetGetDetailState = function (num) {
    //设置detail的state,在getdetail失败的时候设置
    return {
        type: types.RESET_GET_STATE,
        payload: num,
    }
}
export const resetCheckingState = function (num) {
    //设置checking的state,在checking失败，点击确认时候调用
    return {
        type: types.RESET_CHECKING_STATE,
        payload: num,
    }
}
export const resetdrawBackState = function (num) {
    //设置
    return {
        type: types.RESET_DRAWBACKING_STATE,
        payload: num,
    }
}
