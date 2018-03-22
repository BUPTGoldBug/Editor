'use strict'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PositionSettingHome from "../components/PositionSettingHome"
import { posSetToEndPointPage } from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'

export default connect(
    (state) => {
        console.log("PositionSettingHomeContainer state")
        console.log(state);
        return Object.assign({
            isPosSetHomeVisible:state.goldBug.isPosSetHomeVisible,
            isEndPointPageVisible:state.goldBug.isEndPointPageVisible
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ push, pop, reset, goBack, posSetToEndPointPage }, dispatch) }));
    }
)(PositionSettingHome);