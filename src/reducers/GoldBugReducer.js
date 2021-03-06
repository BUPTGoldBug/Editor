import * as types from '../util/ActionTypes'

const initialState = {
    isAddingGoldBug: true,
    isAddingGoldBugSuccess: true,
    isPage1Visible: false,
    isPage2Visible: false,
    isPosSetHomeVisible: false,
    isEndPointPageVisible: false,
    isHomePageVisible: true,
    isDySettingPageVisible: false,
    isTimeSettingPageVisible: false,
    contentText: "Connecting...",
    dySettingParams: {},
    bugsAround:[]
};

export default function GoldBugReducer(state = initialState, action = {}) {
    console.log("action type");
    console.log(action.type);
    switch (action.type) {
        case types.ADD_GoldBug_PENDING: {
            //正在加载
            let newState = {
                ...state,
                isAddingUser: true,
                isAddingUserSuccess: false,
                //isVisible: true,
                contentText: "Connecting..."
            };
            return newState;
        }
        case types.ADD_GoldBug_FULFILLED: {
            //成功加载-或者catch了异常

            if (action.payload == false) {
                //加载失败
                let newState = {
                    ...state,
                    isAddingUser: false,
                    isAddingUserSuccess: false,
                    // isVisible: false,
                    contentText: "Connection Error"
                };
                return newState;

            } else {
                let newState = {
                    ...state,
                    isAddingUser: false,
                    isAddingUserSuccess: true,
                    // isVisible: false,
                    contentText: "Success"
                };
                return newState;

            }

        }
        case types.ADD_GoldBug_REJECTED: {
            //加载失败
            let newState = {
                ...state,
                isAddingUser: false,
                isAddingUserSuccess: false,
                //isVisible: false,
                contentText: "Failed"
            };
            return newState;
        }
        case types.PAGE1_Visibility: {
            let newState = {
                ...state,
                isPage1Visible: action.payload
            };
            return newState;
        }
        case types.PAGE2_Visibility: {
            let newState = {
                ...state,
                isPage2Visible: action.payload
            };
            return newState;
        }
        case types.HOMEPAGE_Visibility: {
            let newState = {
                ...state,
                isHomePageVisible: action.payload
            };
            return newState;
        }
        case types.PosSetPage_Visibility: {
            let newState = {
                ...state,
                isPosSetHomeVisible: action.payload
            };
            console.log("HERE IS THE NEW STATE AFTER GOLDBUGREDUCER PROCESSING~~~~~");
            console.log(newState);
            return newState;
        }
        case types.EndPointSetPage_Visibility: {
            let newState = {
                ...state,
                isEndPointPageVisible: action.payload
            };
            return newState;
        }
        case types.DySettingPage_Visibility: {
            let newState = {
                ...state,
                isDySettingPageVisible: action.payload
            };
            return newState;
        }
        case types.TimeSettingPage_Visibility: {
            let newState = {
                ...state,
                isTimeSettingPageVisible: action.payload
            };
            return newState;
        }
        case types.DySettingPage_Param: {
            console.log("DySettingPage_Param is ~~~~~~~~~~~~~~~~***~~~~~~~~~~~~~~~~~~~~");
            console.log(action.payload);
            let newState = {
                ...state,
                dySettingParams: Object.assign({},action.payload)
            };
            return newState;
        }
        case types.GET_AROUND_BUGS_FULFILLED:{
            if (action.payload == false) {
                //加载失败
                let newState = {
                    ...state,
                    bugsAround:[],
                    contentText: "Connection Error"
                };
                return newState;

            } else {
                let newState = {
                    ...state,
                    bugsAround:action.payload,
                    contentText: "Success"
                };
                return newState;

            }
        }
        case types.GET_AROUND_BUGS_PENDING:{
            let newState = {
                ...state,
                contentText: "Connecting..."
            };
            return newState;
        }
        case types.GET_AROUND_BUGS_REJECTED:{
            let newState = {
                ...state,
                bugsAround:[],
                contentText: "Failed"
            };
            return newState;
        }
        default: {
            return state;
        }
    }
} 