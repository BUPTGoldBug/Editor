'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeSettingPage from "../components/TimeSettingPage"
//import { dySettingPageToTimeSettingPage } from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'

export default connect(
    (state) => {
        console.log("TimeSettingPageContainer state")
        console.log(state);
        return Object.assign({
            isTimeSettingPageVisible: state.goldBug.isTimeSettingPageVisible
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ push, pop, reset, goBack }, dispatch) }));
    }
)(TimeSettingPage);