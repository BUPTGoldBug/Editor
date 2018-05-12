'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from "../components/LoginPage";
import { register, login, finishRegister, setCookie,beforeRegister, getUserDetail,exitRegister,finishLogin,startRegister,logOut,resetCantrun } from "../actions/UserAction";
import { push, pop, reset, goBack } from '../actions/NavigatorAction';


export default connect(
    (state) => {
    
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
                resetCantrun,
                finishRegister,
                logOut,
                setCookie,
                getUserDetail,
                exitRegister,
                finishLogin,
                startRegister,
                beforeRegister
            }, dispatch)
        }));
    }
)(LoginPage);