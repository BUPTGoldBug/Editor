'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckPage from "../components/CheckPage";
import { getBugDetail, getCheckingList, getCheckedList, checkThisBug, drawBackBug, finishChecking, finishDrawBack, exitChecking, exitDrawBack, quitDetail,resetGetDetailState } from "../actions/CheckAction";
import { logOut } from "../actions/UserAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'
import {getOneSpecBug} from "../actions/AddGoldBugAction"

export default connect(
    (state) => {

        console.log(state);
        return Object.assign({
            user: state.user,//user全都要
            check: state.check,
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, {
            actions: bindActionCreators({
                push,
                pop,
                reset,
                goBack,
                //CheckPage需要什么方法
                getBugDetail,
                getCheckingList,
                getCheckedList,
                checkThisBug,
                drawBackBug,
                finishChecking,
                finishDrawBack,
                exitChecking,
                exitDrawBack,
                quitDetail,
                resetGetDetailState,
                getOneSpecBug,
                logOut,//注销

            }, dispatch)
        }));
    }
)(CheckPage);