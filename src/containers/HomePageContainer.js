'use stric'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from "../components/HomePage"
import { homeToPosSetPage, homeToPage1, getAroundBugs,catchOneBug,initSpecBugState,resetCatchBugs,vaildContent} from "../actions/AddGoldBugAction"
import { push, pop, reset, goBack } from '../actions/NavigatorAction'
import {trunToCatchPage} from '../actions/ARAction'

export default connect(
    (state) => {
        console.log("HomePageContainer state")
        console.log(state);
        return Object.assign({
            isHomePageVisible: state.goldBug.isHomePageVisible,
            
            bugsAround: state.goldBug.bugsAround,
            arCatch:state.ar.catch,//监听ar的catch
            loadingSpecBug:state.goldBug.loadingSpecBug,//0 没有加载 1 正在加载 2加载成功  3 加载失败
            specBug:state.goldBug.specBug,
            specBugWindow:state.goldBug.specBugWindow,//是否打开捉虫窗口
            specBugWindowStep2:state.goldBug.specBugWindowStep2,//是否显示第二段窗口,
            user:state.user
        })
    },
    (dispatch) => {

        return (Object.assign({ dispatch: dispatch }, { actions: bindActionCreators({ 
            push,
            pop,
            reset,
            goBack,
            homeToPosSetPage,
            homeToPage1,
            getAroundBugs,
            catchOneBug,
            resetCatchBugs,
            vaildContent,
            trunToCatchPage

        }, dispatch) }));
    }
)(HomePage);