'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddGoldBugPage1 from "../components/AddGoldBugPage1"
import { switchToPage2 } from "../actions/AddGoldBugAction"
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

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ push, pop, reset, goBack, switchToPage2 }, dispatch) }));
    }
)(AddGoldBugPage1);