'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from "../components/HomePage"
import { homeToPosSetPage, homeToPage1 } from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'

export default connect(
    (state) => {
        console.log("HomePageContainer state")
        console.log(state);
        return Object.assign({
            isHomePageVisible: state.goldBug.isHomePageVisible
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ push, pop, reset, goBack, homeToPosSetPage, homeToPage1 }, dispatch) }));
    }
)(HomePage);