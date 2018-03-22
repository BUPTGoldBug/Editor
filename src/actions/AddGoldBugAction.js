import * as types from '../util/ActionTypes'
import * as constant from '../util/Constant'
import { push, pop, reset, goBack } from './NavigatorAction'

export const addGoldBug = function (state) {
    console.log("BEFORE JSON STRINGIFY... STATE IS ");
    console.log(state);

    var goldBug = JSON.stringify({
        bugInfo: {
            lon: state.bugInfo.lon,
            lat: state.bugInfo.lat,
            planter: state.bugInfo.planter,
            timeIndex: state.bugInfo.timeIndex,
            timeP_1: state.bugInfo.timeP_1,
            timeP_2: state.bugInfo.timeP_2,
            posIndex: state.bugInfo.posIndex,
            posP_1: state.bugInfo.posP_1,
            posP_2: state.bugInfo.posP_2,
            posP_3: state.bugInfo.posP_3,
            // birthTime:state.birthTime,
            // deathTime:state.deathTime
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
            // key: state.content.key
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
            }).then(response => response.json()).catch(() => { return false; })

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

export const homeToPosSetPage = function (params) {

    return (dispatch) => {
        //1.PosSetPage 
        dispatch(push(constant.route_pathName.positionSettingHome, params));
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(false));

        dispatch(setPosSetPageVisibility(true));

        //3.Set the Visibility of Page 1
        dispatch(setPage1Visibility(false));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
    }
}

export const homeToPage1 = function (params) {

    return (dispatch) => {
        //1.AddGoldBugPage1
        dispatch(push(constant.route_pathName.addGoldBugPage1, params));
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(false));
        //3.Set the Visibility of Page 1
        dispatch(setPage1Visibility(true));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
    }
}

export const Page2ToHome = function (goldBugInfo) {

    return (dispatch) => {

        dispatch(addGoldBug(goldBugInfo));

        //1.AddHomePage
        dispatch(goBack(constant.route_pathName.homePage));
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(true));
        //3.Set the Visibility of Page 1
        dispatch(setPage1Visibility(false));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
    }
}

export const switchToHome = function () {

    return (dispatch) => {
        //1.AddHomePage
        dispatch(goBack(constant.route_pathName.homePage));
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(true));
        //3.Set the Visibility of Page 1
        dispatch(setPage1Visibility(false));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
    }
}

export const page2ToPage1 = function () {

    return (dispatch) => {
        //1.AddGoldBugPage1
        dispatch(goBack(constant.route_pathName.addGoldBugPage1));
        //2.Set the Visibility of Homepage
        dispatch(setHomePageVisibility(false));
        //3.Set the Visibility of Page 2
        dispatch(setPage2Visibility(false));
        //4.Set the Visibility of Page 1
        dispatch(setPage1Visibility(true));
    }
}

export const page1ToPage2 = function (params) {

    return (dispatch) => {
        //1.AddGoldBugPage2
        dispatch(push(constant.route_pathName.addGoldBugPage2, params));
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