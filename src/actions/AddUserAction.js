import * as types from '../util/ActionTypes'
import * as constant from '../util/Constant'

export const addUser = function (state) {
    //这里返回action
    console.log("AddUser Action Begins...")
    return {
        type: types.ADD_USER,
        payload: fetch(
            constant.ROOT_SERVER_URL + constant.URL.addUser, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userPhone:state.userPhone,
                    userName:state.userName,               
                })
            }).then(response => response.json()).catch(()=>{return false;})

    }


}