'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddGoldBugPage2 from "../components/AddGoldBugPage2"
import { addGoldBug, page2ToPage1, switchToHome } from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'

export default connect(
    (state) => {
        console.log("AddGoldBugPage2Container state")
        console.log(state);
        return Object.assign({
            isAddingGoldBug: state.goldBug.isAddingGoldBug,
            isAddingGoldBugSuccess: state.goldBug.isAddingGoldBugSuccess,
            isPage2Visible:state.goldBug.isPage2Visible,
            contentText:state.goldBug.contentText
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ push, pop, reset, goBack, addGoldBug, page2ToPage1, switchToHome }, dispatch) }));
    }
)(AddGoldBugPage2);