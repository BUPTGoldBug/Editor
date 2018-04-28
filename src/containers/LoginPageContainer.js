'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderPage from "../components/HeaderPage";
import { register, login, finishRegister, setCookie, getUserDetail,exitRegister,finishLogin } from "../actions/UserAction";
import { push, pop, reset, goBack } from '../actions/NavigatorAction'


export default connect(
    (state) => {
        console.log("HomePageContainer state")
        console.log(state);
        return Object.assign({
            user:state.user,//user全都要
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, {
            actions: bindActionCreators({
                push,
                pop,
                reset,
                goBack,
                //header需要什么方法
                register,
                login,
                finishRegister,
                setCookie,
                getUserDetail,
                exitRegister,
                finishLogin


            }, dispatch)
        }));
    }
)(HeaderPage);