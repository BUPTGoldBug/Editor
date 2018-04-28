import * as types from '../util/ActionTypes'
import * as constant from '../util/Constant'
import { push, pop, reset, goBack } from './NavigatorAction'
import {initSelectGameState,initCatchGame} from './ARAction'
export const getAroundBugs = function (state) {
    
    return {
        type: types.GET_AROUND_BUGS,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.getAroundBugs, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lon:state.userLon,
                    lat:state.userLat,               
                })
            }).then(response => response.json()).catch(()=>{return false;})

    }


}
export const initStateOfSubmit=function(){
    return (dispatch)=>{
        dispatch(changeStateOfSubmit(0))
    }

}
export const changeStateOfSubmit = function (state){
    return {
        type:types.changeStateOfSubmit,
        payload:{
            state:state
        }
    }

}
export const addGoldBug = function (state) {
    console.log("BEFORE JSON STRINGIFY... STATE IS ");
    console.log(state);

    var goldBug = JSON.stringify({
        bugInfo: {
            deathTime:state.bugInfo.deathTime,
            startTime:state.bugInfo.startTime,
            start_lon: state.bugInfo.start_lon,
            start_lat: state.bugInfo.start_lat,
            end_lon: state.bugInfo.end_lon,
            end_lat: state.bugInfo.end_lat,
            ifNeedStartTime: state.bugInfo.ifNeedStartTime,
            isMoved: state.bugInfo.isMoved,
            lifecount: state.bugInfo.lifeCount,
            planter: state.bugInfo.planter,
        },
        content: {
            description: state.content.description,
            question: state.content.question,
            score: state.content.score,
            ans_1: state.content.ans_1,
            ans_2: state.content.ans_2,
            ans_3: state.content.ans_3,
            ans_4: state.content.ans_4,
            contentType: state.content.contentType,
            key_: state.content.key,
            //arIndex:state.index,
            arIndex:-1
        },
    });

    console.log("ACTION ADDGOLDBUG PARAM IS >>>>>");
    console.log(goldBug);

    //这里返回action
    console.log("AddGoldBug Action Begins...")
    return {
        type: types.ADD_GoldBug,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.addGoldBug, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: goldBug
            }).then(response => response.json()).then(res=>{console.log("RESULT IS");console.log(res);return res;}).catch(() => { return false; })

    }


}



export const setTimeSettingPageVisibility = function (opt) {
    return {
        type: types.TimeSettingPage_Visibility,
        payload: opt
    }
}

export const setDySettingPageVisibility = function (opt) {
    return {
        type: types.DySettingPage_Visibility,
        payload: opt
    }
}

export const setHomePageVisibility = function (opt) {
    return {
        type: types.HOMEPAGE_Visibility,
        payload: opt
    }
}

export const setPosSetPageVisibility = function (opt) {
    return {
        type: types.PosSetPage_Visibility,
        payload: opt
    }
}

export const setEndPointSetPageVisibility = function (opt) {
    return {
        type: types.EndPointSetPage_Visibility,
        payload: opt
    }
}

export const setPage1Visibility = function (opt) {
    return {
        type: types.PAGE1_Visibility,
        payload: opt
    }
}

export const setPage2Visibility = function (opt) {
    return {
        type: types.PAGE2_Visibility,
        payload: opt
    }
}

export const timeSettingPageToPage2 = function (params) {

    return (dispatch) => {

        dispatch(setTimeSettingPageVisibility(false));

        dispatch(push(constant.route_pathName.addGoldBugPage2, params));

        dispatch(setPage2Visibility(true));
    }
}

export const dySettingPageToTimeSettingPage = function (params) {

    return (dispatch) => {

        dispatch(setTimeSettingPageVisibility(true));

        dispatch(push(constant.route_pathName.TimeSettingPage, params));

        dispatch(setDySettingPageVisibility(false));

        dispatch(setPosSetPageVisibility(false));


    }
}


function sendDySettingParam(params){
    return {
        type: types.DySettingPage_Param,
        payload: params

    };
}

export const endPointPageToDySettingPage = function (params) {

    return (dispatch) => {
        dispatch(setDySettingPageVisibility(true));

        dispatch(setEndPointSetPageVisibility(false));

        dispatch(setPosSetPageVisibility(false));

        dispatch(sendDySettingParam(params));

    }
}

export const resetCatchBugs = function (){ // 退出捉虫界面
    return (dispatch)=>{
        dispatch(initCatchGame());//ar的也清理下
        dispatch(initSpecBugState());
    }


}
export const vaildContent = function (goldBug){

    return {
        type: types.VAILD_BUGCONTENT,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.vaild, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(goldBug)
            }).then(response => response.json()).then(res=>{console.log("AIAIAIAAI:");console.log(goldBug);console.log("BIBIBIBIBI:");console.log(res);return res;}).catch(() => { return false; })

    }





}

export const initSpecBugState = function (){
    return {
        type:types.initSpecBugState,
        payload:{}
    };



}
export const getOneSpecBug = function (common){
    //捉虫
    return {
        type:types.GET_ONE_BUGCONTENT,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.getSpecBug, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bid:common.bugId,
                    userId:common.userId,
                    rt_lon:common.rt_lon,
                    rt_lat:common.rt_lat
                })
            }).then(response => response.json()).then((responseJson => {
                //responseJson.arIndex = -1;
                return responseJson;
            })).catch(() => { return false; })
    }
}
export const catchOneBug =function(common){
    return (dispatch)=>{
        dispatch(initCatchGame());
        dispatch(initSpecBugState());//先清空这两个状态
        dispatch(getOneSpecBug(common));
    }


}
export const posSetToEndPointPage = function (params) {

    return (dispatch) => {

        dispatch(setEndPointSetPageVisibility(true));

        dispatch(setPosSetPageVisibility(false));

    }
}


export const homeToPosSetPage = function (params) {

    return (dispatch) => {

        //1.PosSetPage 
        dispatch(push(constant.route_pathName.positionSettingHome, params));
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(false));

        dispatch(setPosSetPageVisibility(true));

    }
}

export const dySettingPageToHomePage = function (params) {

    return (dispatch) => {

        dispatch(reset());
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(true));

        dispatch(setDySettingPageVisibility(false));

    }
}

export const timeSettingToDySettingPage = function (params) {

    return (dispatch) => {

        dispatch(pop());

        dispatch(setTimeSettingPageVisibility(false));

        dispatch(setDySettingPageVisibility(true));

    }
}

export const timeSettingToHomePage = function (params) {

    return (dispatch) => {

        dispatch(reset());

        dispatch(setTimeSettingPageVisibility(false));

        dispatch(setHomePageVisibility(true));

    }
}

export const Page2ToHome = function (goldBugInfo) {

    return (dispatch) => {


       
        dispatch(reset());
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(true));

        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
        // dispatch(addGoldBug(goldBugInfo));
       
  
    }
}

export const homeToPage1 = function (params) {

    return (dispatch) => {
        dispatch(push(constant.route_pathName.addGoldBugPage1, params));
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(false));
        //3.Set the Visibility of Page 1
        dispatch(setPage1Visibility(true));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
        //1.AddGoldBugPage1
     
    }
}

export const switchToHome = function () {

    return (dispatch) => {
 

        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(true));
        //3.Set the Visibility of Page 1
        dispatch(setPage1Visibility(false));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
               //1.AddHomePage
        dispatch(goBack(constant.route_pathName.homePage));
    }
}

export const page2ToPage1 = function () {

    return (dispatch) => {
        //1.AddGoldBugPage1
       
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(false));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
        //4.Set the Visibility of Page 1
        dispatch(setPage1Visibility(true));
        dispatch(goBack(constant.route_pathName.addGoldBugPage1));
    }
}

export const page1ToPage2 = function (params) {

    return (dispatch) => {
        dispatch(push(constant.route_pathName.addGoldBugPage2, params));
        //1.AddGoldBugPage2
        dispatch(initSelectGameState());//初始化一下
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(false));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(true));
        //4.Set the Visibility of Page 1
        dispatch(setPage1Visibility(false));
    
    }
}


/*
 let oneFunc =  switchToPage2();
 oneFunc(dispatch);*/