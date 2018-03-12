import * as types from '../util/ActionTypes'

const initialState = {
    isAddingGoldBug: true,
    isAddingGoldBugSuccess: true,
    isPage1Visible: false,
    isPage2Visible: false,
    isHomePageVisible:true,
    contentText: "Connecting..."
};

export default function GoldBugReducer(state = initialState, action = {}) {
    console.log("action");
    console.log(action);
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
        case types.PAGE1_Visibility:{
            let newState = {
                ...state,
                isPage1Visible: action.payload
            };
            return newState;
        }
        case types.PAGE2_Visibility:{
            let newState = {
                ...state,
                isPage2Visible: action.payload
            };
            return newState;
        }
        case types.HOMEPAGE_Visibility:{
            let newState = {
                ...state,
                isHomePageVisible: action.payload
            };
            return newState;
        }
        default: {
            return state;
        }
    }
} 