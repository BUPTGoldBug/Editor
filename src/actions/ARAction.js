import * as types from '../actions/ActionTypes'
import { push, pop } from './NavigatorAction'
import { setPage2Visibility, setHomePageVisibility} from './AddGoldBugAction'
export const changeIndex = function (index) {
    //改变游戏索引
    return {
        type: types.AR_GAME_SELECT_CHOOSE_INDEX,
        payload: {
            index: index
        }
    }

}
export const initSelectGameState = function (){
    return {
        type:types.AR_GAME_SELECT_INIT,
        payload:{}
    };

}
export const finishSelectArGameEdit = function (edit) {
    //改变游戏索引
    return {
        type: types.AR_GAME_SELECT_FINISH,
        payload: {
            edited: edit.edited
        }
    }

}
export const changeGameState = function (opt) {
    //改变游戏状态,需不需要游戏完成的事件？，我觉得不需要,这个事件就够了，然后该监听监听
    //第一次是改start ,之后修改times和success就ok
    return {
        type: types.AR_GAME_CATCH_CHANGE,
        payload: {
            ...opt,//吧opt全部传过去,都放到ar.catch里面去
        }
    }
}

export const exitCatchArGame = function (opt) {
    //终止ar游戏时调用
    return (dispatch) => {

        //1.修改游戏状态(buxytao)
        dispatch(changeGameState({
            exit:-1,//非正常退出
        }))
        //2.发起网络交互
        dispatch(setHomePageVisibility(true));
        dispatch(outGame())
        //3.先调用pop
        dispatch(pop());

    }

}

export const initCatchGame = function (){
    return {
        type:types.AR_GAME_CATCH_INIT,
        payload:{}

    };

}
export const submitGameFinishState = function (opt) {
    //网络交互


}

export const trunToCatchPage = function (routeName, payload) {

    return (dispatch) => {

        //1.修改游戏状态(初始化)
        dispatch(initCatchGame());
        dispatch(setHomePageVisibility(false))
        dispatch(intoGame());
        //2.再去push，进行跳转
        dispatch(push(routeName, payload));
    }


}
export const turnOutFromPage = function (){
    return (dispatch) => {

        //1.修改游戏状态(初始化)
        

        dispatch(setPage2Visibility(true));
        //2.再去push，进行跳转
        dispatch(pop());
      
    }


}
export const trunToSelectPage = function (routeName, payload) {

    return (dispatch) => {
        dispatch(setPage2Visibility(false));
        //1.修改游戏状态(初始化)
        dispatch(initSelectGameState());


        //2.再去push，进行跳转
        dispatch(push(routeName, payload));
    }


}
export const finishCatchArGame = function (opt) {
    //完成ar游戏时调用,点击那个panel的时候
    return (dispatch) => {

        //1.修改游戏状态(不需要)

        //2.发起网络交互
        dispatch(setHomePageVisibility(true));
        dispatch(outGame());
        //3.先调用pop
        dispatch(pop());
    }

}
//开始进度条提示
export const startCatchProcesser  = function (){
        return (dispatch)=>{
            dispatch(changeGameState({
                start:1,//修改游戏状态start
            }));
            dispatch(changeCatchProcesser(true));
        }
}

//结束进度条提示
export const endCatchProcesser = function (){
        return changeCatchProcesser(false);
}
//进入游戏
export const intoGame = function (){
    return {
        type:types.AR_GAME_CATCH_CHANGE_INTO_GAME,
        payload:{}
    };

}

export const outGame = function (){
    return {
        type:types.AR_GAME_CATCH_CHANGE_OUT_GAME,
        payload:{}
    };


}

//修改进度条提示
export const changeCatchProcesser  = function (payload){

    return {
        type:types.AR_GAME_CATCH_CHANGE_PROCESSER,
        payload:{
            loading:payload
        }
    }

}
//修改进度条index
export const changeIndexOfProcessr = function (payload){

    return {
        type:types.AR_GAME_CATCH_CHANGE_PROCESSER_INDEX,
        payload:{
            ...payload
        }
    };

}
export const finishSelectArGame = function (edit) {
    //终止或完成ar游戏时调用
    return (dispatch) => {
        dispatch(setPage2Visibility(true));
        //2.然后返回
        dispatch(finishSelectArGameEdit(edit))
        //1.先调用pop
        dispatch(pop());
    }

}
