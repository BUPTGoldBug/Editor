'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddGoldBugPage1 from "../components/AddGoldBugPage1"
import { page1ToPage2, switchToHome } from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'

export default connect(
    (state) => {
        console.log("AddGoldBugPage1Container state")
        console.log(state);
        return Object.assign({
            isPage1Visible:state.goldBug.isPage1Visible
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ push, pop, reset, goBack, page1ToPage2, switchToHome }, dispatch) }));
    }
)(AddGoldBugPage1);