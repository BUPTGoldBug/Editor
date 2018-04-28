'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeSettingPage from "../components/TimeSettingPage"
import {timeSettingToHomePage,timeSettingToDySettingPage, timeSettingPageToPage2 } from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'

export default connect(
    (state) => {
        console.log("TimeSettingPageContainer state")
        console.log(state);
        return Object.assign({
            isTimeSettingPageVisible: state.goldBug.isTimeSettingPageVisible,
            user:state.user
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ push, pop, reset, goBack, timeSettingToHomePage,timeSettingToDySettingPage,timeSettingPageToPage2}, dispatch) }));
    }
)(TimeSettingPage);