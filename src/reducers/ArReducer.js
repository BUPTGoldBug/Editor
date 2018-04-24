

import * as types from '../actions/ActionTypes'
import {getRandom,xConfilt,vectorList} from '../util/Constant'
/**
 * 
 * 由AR管理界面接受，初始化属性如下
 * 
 * 
*/
const init_state = {
    arType: 0,//0中 1捉
    catch: { //捉
        //游戏1 
        times: 3, //三次游戏
        start: 0,//游戏是否开始 0 没有，1 开始
        success: 0,//没有成功,游戏成功后，自动跳转,
        loading:false,//进度条是否显示
        xConfict:0,//x轴干扰力
        strength:0,//y轴力
        exit:0,//非游戏完结，而是退出,正常完成，exit不变，强制退出exit = -1
        inGame:0 //0 没有进入游戏 1 进入游戏
    },
    select: { //种
        edited: false,//是否编辑完成，编辑完成设置为处
        index: -1,//inde从0开,每个index对应一个游戏类型！！！！！！！！！！！
    }
    //里面场景需要的
}

export default function ArReducer(state = init_state, action = {}) {
    //从种虫界面
    switch (action.type) {

        case types.AR_GAME_SELECT_CHOOSE_INDEX: {
            //更改了index（游戏类型）
            let newState = {
                ...state,
                select: {
                    ...state.select,
                    index: action.payload.index,
                }
            }
            return newState;
        }
        case types.AR_GAME_SELECT_FINISH: {
            //这个action需要修改一下edited属性就行了,点击了确定或者返回，监听这个属性的是别的页面
            let newState = {
                ...state,
                select: {
                    ...state.select,
                    edited: action.payload.edited,
                }
            }
            return newState;
        }
        case types.AR_GAME_SELECT_INIT :{
            let newState = {
                ...state,
                select: {
                    ...init_state.select
                }
            }
            return newState;



        }
        //捉虫===================================
        //捉虫-初始化
        case types.AR_GAME_CATCH_INIT: {
            let newState = {
                ...state,
                catch: {
                    ...init_state.catch,//初始化一下
                    xConfict:getRandom(0,xConfilt.length-1),
                    strength:getRandom(0,vectorList.length-1),
                }
            }
            return newState;
        }

        //捉虫-状态变更 [times start success都被改动]
        case types.AR_GAME_CATCH_CHANGE: {
            let newState = {
                ...state,
                catch: {
                    ...state.catch,
                    ...action.payload,//
                }
            }
            return newState;
        }
        //捉虫-进度条提示
        case types.AR_GAME_CATCH_CHANGE_PROCESSER: {
            let newState = {
                ...state,
                catch: {
                    ...state.catch,
                    loading:action.payload.loading,//只修改这一个
                  
                }
            }
            return newState;
        }
        //捉虫-进度条index
        case types.AR_GAME_CATCH_CHANGE_PROCESSER_INDEX: {
            let newState = {
                ...state,
                catch: {
                    ...state.catch,
                    xConfict:action.payload.xConfict,//x轴干扰力
                    strength:action.payload.strength,//z轴力
                  
                }
            }
            return newState;
        }
        case types.AR_GAME_CATCH_CHANGE_INTO_GAME: {
            let newState = {
                ...state,
                catch: {
                    ...state.catch,
                    inGame:1//
                  
                }
            }
            return newState;
        }
        case types.AR_GAME_CATCH_CHANGE_OUT_GAME: {
            let newState = {
                ...state,
                catch: {
                    ...state.catch,
                    inGame:0//不在游戏捏
                  
                }
            }
            return newState;
        }
        default: {
            return state;
        }

    }



}