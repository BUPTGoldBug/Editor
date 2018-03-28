import * as types from '../util/ActionTypes'
import { NavigationActions } from 'react-navigation'

export const push = function (routeName, params) {
    return {
        type: types.PUSH,
        payload: {
            key: routeName,
            params: params
        }

    }
}

// Return to the last-viewed page
export const pop = function () {
    return {
        type: types.POP,
        payload: {}
    }
}

export const reset = function () { // 登出时候出现
    return {
        type: types.RESET,
        payload: {}
    }
}

// Return to a specific page
export const goBack = function (routeName) {
    return {
        type: types.GOBACK,
        payload: {
            key: routeName,
        }

    }

}
