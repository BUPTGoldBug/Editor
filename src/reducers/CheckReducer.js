
import * as types from '../util/ActionTypes'
import { } from '../util/Constant'
/**
 * 
 * 由AR管理界面接受，初始化属性如下
 * 
 * 
*/
const init_state = {

    loadingChecking: 0,//0 没有loding 1 在loading 2 loading成功 3 失败
    loadingChecked: 0,//0 没有loding 1 在loading 2 loading成功 3 失败

    getDetail: 0,//0没有get, 1正在get(需要转圈圈,且弹出页面) 2成功（渲染主要页面） 3失败
    checkingState: 0,// 0 没有checking，页面在getDetail =1/2的时候就打开了 1 正在checking 2 cheing 成功 3 失败 (重置getDetail和自己)
    drawBackStae: 0,//0 没有drawback 页面在getDetail =1/2 的时候就打开了  1 正在draw 2 draw 成功 3 失败 (重置getDetail和自己)
    des: "",//描述字符串
    checkedList: [], //已审核列表
    checkingList: [], //未审核列表
    bugDetail: { //点击已审核/未审核列表出现的详情
        question: "",
        answer: ["", "", "", "", ""],
        rightIndex: -1,
        arIndex: -1,
        bugId: -1,
        des: "",
        score: 0,
        type: -1,
        key:"0000"
    },
    //里面场景需要的
}
export default function CheckReducer(state = init_state, action = {}) {
    switch (action.type) {
        //----------获取checkinglist-----------------
        case types.GET_CHECKING_LIST_PENDING: {
            //正在加载
            let newState = {
                ...state,
                loadingChecking: 1,//正在loading
            };
            return newState;
        }
        case types.GET_CHECKING_LIST_REJECTED: {
            //失败
            let newState = {
                ...state,
                loadingChecking: 3,//失败
            };
            return newState;
        }
        case types.GET_CHECKING_LIST_FULFILLED: {
            //成功
            console.log("action.payload instanceof Array:" + (action.payload instanceof Array));
            if ((action.payload == false && ((action.payload instanceof Array) == false)) || (action.payload.status != undefined && action.payload.status != 200)) {
                //加载失败
                let newState = {
                    ...state,
                    loadingChecking: 3,//失败
                    des: "网络错误!",
                };
                return newState;

            } else if (action.payload instanceof Array) {
                console.log("create new state");
                let newState = {
                    ...state,
                    loadingChecking: 2,//加载成功,回到起点
                    checkingList: Object.assign([], action.payload),//放进去
                    des: "",
                };
                console.log("newState after checeking");
                console.log(newState);
                return newState;

            } else {
                let newState = {
                    ...state,
                    loadingChecking: 3,//失败
                    des: "空列表",//放进去
                };
                return newState;

            }
        }
        //-------------end----------------

        //----------获取checkedlist-----------------
        case types.GET_CHECKED_LIST_PENDING: {
            //正在加载
            let newState = {
                ...state,

                loadingChecked: 1,//正在loading
            };
            return newState;
        }
        case types.GET_CHECKED_LIST_REJECTED: {
            //失败
            let newState = {
                ...state,
                loadingChecked: 3,//失败
                des: "网络错误!",
            };
            return newState;
        }
        case types.GET_CHECKED_LIST_FULFILLED: {
            //成功
            if ((action.payload == false && ((action.payload instanceof Array) == false)) || (action.payload.status && action.payload.status != 200)) {
                //加载失败
                let newState = {
                    ...state,
                    loadingChecked: 3,//失败
                    des: "网络错误!",
                };
                return newState;

            } else if (action.payload instanceof Array) {
                let newState = {
                    ...state,

                    loadingChecked: 2,//加载成功,回到起点
                    checkedList: Object.assign([], action.payload),//放进去
                    des: "",
                };
                console.log("newState after checked");
                console.log(newState);
                return newState;

            } else {
                let newState = {
                    ...state,
                    loadingChecked: 3,//加载失败
                    des: "空列表",

                };
                return newState;

            }
        }
        //-------------end----------------


        //----------获取detail-----------------
        case types.GET_BUG_DETAIL_PENDING: {
            //正在加载
            let newState = {
                ...state,

                getDetail: 1,//正在loading
            };
            return newState;
        }
        case types.GET_BUG_DETAIL_REJECTED: {
            //失败
            let newState = {
                ...state,
                getDetail: 3,//失败
                des: "网络错误!",
            };
            return newState;
        }
        case types.GET_BUG_DETAIL_FULFILLED: {
            //成功
            console.log("卧槽！！！！")
            console.log(action.payload)
            if (action.payload == false || (action.payload.status && action.payload.status != 200)) {
                //加载失败
                let newState = {
                    ...state,
                    getDetail: 3,//失败
                    des: "网络错误!",
                };
                return newState;

            } else if (true == Boolean(action.payload.success)) {
                let newState = {
                    ...state,
                    getDetail: 2,//加载成功
                    bugDetail: action.payload,//放进去
                    des: "",
                };
                return newState;

            } else {
                let newState = {
                    ...state,
                    getDetail: 3,//加载失败
                    des: action.payload.des,

                };
                return newState;
            }
        }
        //-------------end----------------

        //----------checking-----------------
        case types.CHECK_BUG_PENDING: {
            //正在加载
            let newState = {
                ...state,

                checkingState: 1,//正在loading
            };
            return newState;
        }
        case types.CHECK_BUG_REJECTED: {
            //失败
            let newState = {
                ...state,
                checkingState: 3,//失败
                des: "网络错误!",
            };
            return newState;
        }
        case types.CHECK_BUG_FULFILLED: {
            //成功
            if (action.payload == false || (action.payload.status && action.payload.status != 200)) {
                //加载失败
                let newState = {
                    ...state,
                    checkingState: 3,//失败
                    des: "网络错误!",
                };
                return newState;

            } else if (true == Boolean(action.payload.success)) {
                let newState = {
                    ...state,
                    checkingState: 2,//加载成功,没有需要的描述
                    des: "审核成功！",
                };
                return newState;

            } else {
                let newState = {
                    ...state,
                    checkingState: 3,//加载失败
                    des: action.payload.des,
                };
                return newState;
            }
        }
        //-------------end----------------
        //----------drawback-----------------
        case types.DRAWBACK_BUG_PENDING: {
            //正在加载
            let newState = {
                ...state,

                drawBackStae: 1,//正在loading
            };
            return newState;
        }
        case types.DRAWBACK_BUG_REJECTED: {
            //失败
            let newState = {
                ...state,
                drawBackStae: 3,//失败
                des: "网络错误!",
            };
            return newState;
        }
        case types.DRAWBACK_BUG_FULFILLED: {
            //成功
            if (action.payload == false || (action.payload.status && action.payload.status != 200)) {
                //加载失败
                let newState = {
                    ...state,
                    drawBackStae: 3,//失败
                    des: "网络错误!",
                };
                return newState;

            } else if (true == Boolean(action.payload.success)) {
                let newState = {
                    ...state,
                    drawBackStae: 2,//加载成功,没有需要的描述
                    des: "撤销成功！",
                };
                return newState;

            } else {
                let newState = {
                    ...state,
                    drawBackStae: 3,//加载失败
                    des: action.payload.des,
                };
                return newState;
            }
        }
        //重置......
        case types.RESET_CHECKING_STATE: {
            let newState = {
                ...state,
                checkingState: action.payload,//

            };
            return newState;
        }
        case types.RESET_DRAWBACKING_STATE: {
            let newState = {
                ...state,
                drawBackStae: action.payload,//

            };
            return newState;

        }
        case types.RESET_GET_STATE: {
            console.log("你他妈重置啊！！！")
            let newState = {
                ...state,
                getDetail: action.payload,//
                des: ""

            };
            return newState;

        }
        //-------------end----------------
        default: return state;

    }


}