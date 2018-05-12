import * as types from '../util/ActionTypes'
import { Navigator_ } from "../components/NavigationPage"
import { NavigationActions } from "react-navigation"
import * as constant from '../util/Constant'

const Original_Action_1 = Navigator_.router.getActionForPathAndParams(constant.route_pathName.LoginPage);
const Original_Action = Navigator_.router.getActionForPathAndParams(constant.route_pathName.homePage);
const Original_State = Navigator_.router.getStateForAction(Original_Action_1);//用action和旧状态返回新状态，没有旧状态

const init_state = {
    index: 0,

    routes: [
        { key: "0", routeName:constant.route_pathName.LoginPage, params: {} },
    ]
}

console.log("Original_State");
console.log(Original_State);

export default function NavigatorReducer(state = init_state, action = {}) {
    switch (action.type) {
        case types.PUSH: {
            //1.创建跳转的action
            let pushAction = NavigationActions.navigate({
                routeName: action.payload.key,
                params: action.payload.params
            });

            //2.获取新的状态
           
            let newState = Navigator_.router.getStateForAction(pushAction, state);
            if(action.payload.key == constant.route_pathName.LoginPage){
                console.log("newState");
                console.log(newState);
            }
            
            return newState;
        }
        case types.POP: {
            //弹出，注意返回
            let backAction = NavigationActions.back();
            let newState = Navigator_.router.getStateForAction(backAction, state);

            return newState;
        }
        case types.RESET: {
            //重置，到最开始的页面去
            let resetAction = NavigationActions.reset({
                actions: [Original_Action],
                index: 0
            });
            let newState = Navigator_.router.getStateForAction(resetAction, state);
            return newState;
        }
        case types.RESET_1: {
            //重置，到最开始的页面去
            let resetAction = NavigationActions.reset({
                actions: [Original_Action_1],
                index: 0
            });
            let newState = Navigator_.router.getStateForAction(resetAction, state);
            return newState;
        }
        case types.GOBACK: {
            let backRouteIndex = null;
            if (action.payload) {
                const backRoute = state.routes.find(route => route.routeName === action.payload.key);
                backRouteIndex = state.routes.indexOf(backRoute);
            }
            if (backRouteIndex == null) {
                return StateUtils.pop(state);
            }
            if (state.routes.length >= 2 && backRouteIndex < state.routes.length) {
                return {
                    ...state,
                    routes: state.routes.slice(0, backRouteIndex + 1),
                    index: backRouteIndex,
                };
            }
            return state;
        
        }
        default: {
            return state;
        }
    }


} 