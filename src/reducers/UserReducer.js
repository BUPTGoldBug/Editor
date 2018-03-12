import * as types from '../util/ActionTypes'

const initialState = {
    isAddingUser: true,
    isAddingUserSuccess: true,
    isDisable: false,
    contentText: "Submit"
};

export default function UserReducer(state = initialState, action = {}) {
    console.log("action");
    console.log(action);
    switch (action.type) {
        case types.ADD_USER_PENDING: {
            //正在加载
            let newState = {
                ...state,
                isAddingUser: true,
                isAddingUserSuccess: false,
                isDisable: true,
                contentText: "Submitting..."
            };
            return newState;
        }
        case types.ADD_USER_FULFILLED: {
            //成功加载-或者catch了异常

            if (action.payload == false) {
                //加载失败
                let newState = {
                    ...state,
                    isAddingUser: false,
                    isAddingUserSuccess: false,
                    isDisable: false,
                    contentText: "Connection Failure"
                };
                return newState;

            } else {
                let newState = {
                    ...state,
                    isAddingUser: false,
                    isAddingUserSuccess: true,
                    isDisable: false,
                    contentText: "Success！"
                };
                return newState;

            }

        }
        case types.ADD_USER_REJECTED: {
            //加载失败
            let newState = {
                ...state,
                isAddingUser: false,
                isAddingUserSuccess: false,
                isDisable: false,
                contentText: "Failed!"
            };
            return newState;
        }
        default: {
            return state;
        }
    }
} 