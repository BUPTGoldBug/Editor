'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddUserPage from "../components/AddUserPage"
import { addUser } from "../actions/AddUserAction"
//import {pop} from "../actions/NavigatorAction"

export default connect(
    // 1st param is MapStateToProps Function
    (state) => {
       
        return (Object.assign({
            isAddingUser: state.user.isAddingUser,//取出来这个属性
            isAddingUserSuccess: state.user.isAddingUserSuccess,
            isDisable:state.user.isDisable,
            contentText:state.user.contentText
        }));
    },
    //这个页面需要action，以方便在页面调用
    (dispatch) => {
        console.log(dispatch);
        return (Object.assign(
            { dispatch: dispatch },
            { actions: bindActionCreators({ addUser }, dispatch) }
        ));
    }
)(AddUserPage);