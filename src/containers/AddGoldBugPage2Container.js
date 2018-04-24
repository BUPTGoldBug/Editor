'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddGoldBugPage2 from "../components/AddGoldBugPage2"
import { addGoldBug, page2ToPage1, switchToHome, Page2ToHome,initStateOfSubmit } from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'
import {trunToSelectPage,turnOutFromPage} from '../actions/ARAction'
export default connect(
    (state) => {
        console.log("AddGoldBugPage2Container state")
        console.log(state);
        return Object.assign({
            isAddingGoldBug: state.goldBug.isAddingGoldBug,
            isAddingGoldBugSuccess: state.goldBug.isAddingGoldBugSuccess,
            isPage2Visible:state.goldBug.isPage2Visible,
            contentText:state.goldBug.contentText,
            arSelect:state.ar.select, //关注种虫,
            stateOfSubmitBug:state.goldBug.stateOfSubmitBug,//状态
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ 
            push, 
            pop, 
            reset, 
            goBack,
            Page2ToHome, 
            addGoldBug, 
            page2ToPage1, 
            switchToHome, 
            Page2ToHome,
            trunToSelectPage,
            initStateOfSubmit,
            turnOutFromPage
        }, dispatch) }));
    }
)(AddGoldBugPage2);