'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PositionSettingHome from "../components/PositionSettingHome"
//import { page1ToPage2, switchToHome } from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'

export default connect(
    (state) => {
        console.log("PositionSettingHomeContainer state")
        console.log(state);
        return Object.assign({
            isPosSetHomeVisible:state.goldBug.isPosSetHomeVisible
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ push, pop, reset, goBack }, dispatch) }));
    }
)(PositionSettingHome);