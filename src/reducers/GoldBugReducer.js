import * as types from '../util/ActionTypes'

const initialState = {
    isAddingGoldBug: true,
    isAddingGoldBugSuccess: true,
    isPage1Visible: false,
    isPage2Visible: false,
    isPosSetHomeVisible: false,
    isEndPointPageVisible: false,
    isHomePageVisible: true,
    isDySettingPageVisible: false,
    isTimeSettingPageVisible: false,
    contentText: "Connecting...",

    loadingSpecBug:0,//0 没有加载 1 正在加载 2加载成功  3 加载失败
    specBugWindow:false,//是否打开捉虫窗口
    specBugWindowStep2:false,//是否显示第二段窗口,

    specBug:{
        question:"",
        answers:[],
        rightIndex:-1,
        arIndex:-1,
        bugId:-1,
        des:"",
        score:0
    },
    stateOfSubmitBug:0,//虫子上传状态 0 没发生 1 正在上传 2成功 3
    dySettingParams: {},
    bugsAround:[]
};

export default function GoldBugReducer(state = initialState, action = {}) {
    
    switch (action.type) {
        case types.ADD_GoldBug_PENDING: {
            //正在加载
            let newState = {
                ...state,
                isAddingUser: true,
                isAddingUserSuccess: false,
                //isVisible: true,
                stateOfSubmitBug:1,//正在上传
                contentText: "Connecting..."
            };
            return newState;
        }
        case types.ADD_GoldBug_FULFILLED: {
            //成功加载-或者catch了异常

            if (action.payload == false || action.payload.status ==404) {
                //加载失败
                let newState = {
                    ...state,
                    isAddingUser: false,
                    isAddingUserSuccess: false,
                    stateOfSubmitBug:3,
                    // isVisible: false,
                    contentText: "Connection Error"
                };
                return newState;

            } else if(true == Boolean(action.payload.success)){
                let newState = {
                    ...state,
                    isAddingUser: false,
                    isAddingUserSuccess: true,
                    // isVisible: false,
                    stateOfSubmitBug:2,
                    contentText: "Success"
                };
                return newState;

            }

        }
        case types.ADD_GoldBug_REJECTED: {
            //加载失败
            let newState = {
                ...state,
                isAddingUser: false,
                isAddingUserSuccess: false,
                //isVisible: false,
                stateOfSubmitBug:3,
                contentText: "Failed"
            };
            return newState;
        }
        case types.changeStateOfSubmit:{
            let newState = {
                ...state,
                stateOfSubmitBug:action.payload.state

            }
            return newState;
        }
        case types.initSpecBugState:{
            let newState = {
                ...state,
                loadingSpecBug:0,//什么都没发生
                specBugWindow:false,//是否打开捉虫窗口
                specBugWindowStep2:false,//是否显示第二段窗口
                specBug:initialState.specBug

            }
            return newState;
        }
        case types.GET_ONE_BUGCONTENT_PENDING:{
            let newState = {
                ...state,
                loadingSpecBug:1,//正在加载
                specBug:initialState.specBug
            }
            return newState;
        }
        case types.GET_ONE_BUGCONTENT_FULFILLED:{
            if(action.payload == false){
                let newState = {
                    ...state,
                    loadingSpecBug:3,//失败
                    specBug:initialState.specBug
                }
                return newState;
            }else {
                console.log("------action.payload")
                if(Boolean(action.payload.success)== true){

                    let newState = {
                        ...state,
                        loadingSpecBug:2,//成功
                        specBug:action.payload
                    }
                    return newState;
                }else {
                    let newState = {
                        ...state,
                        loadingSpecBug:3,//失败
                        specBug:action.payload
                    }
                    return newState;
                }
                
            }
        }
        case types.VAILD_BUGCONTENT_FULFILLED:{

            if(action.payload == false){
                let newState = {
                    ...state,
                    loadingSpecBug:6,//失败
    
                }
                return newState;
            }else {
                if(Boolean(action.payload.success) == true ){
                    let newState = {
                        ...state,
                        loadingSpecBug:5,//成功
        
                    }
                    return newState;
                }else {
                    let newState = {
                        ...state,
                        loadingSpecBug:6,//失败
                      
                    }
                    return newState;
                }
                
            }
            
        }
        case types.VAILD_BUGCONTENT_PENDING:{
            let newState = {
                ...state,
                loadingSpecBug:4,//加载

            }
            return newState;

            
        }
        case types.VAILD_BUGCONTENT_REJECTED:{

            let newState = {
                ...state,
                loadingSpecBug:6,//失败
         
            }
            return newState;
            
        }
        case types.GET_AROUND_BUGS_REJECTED:{
            let newState = {
                ...state,
                loadingSpecBug:3,//加载错误
                specBug:initialState.specBug
            }
            return newState;
        }
        case types.PAGE1_Visibility: {
            let newState = {
                ...state,
                isPage1Visible: action.payload
            };
            return newState;
        }
        case types.PAGE2_Visibility: {
            let newState = {
                ...state,
                isPage2Visible: action.payload,
                stateOfSubmitBug:0,//初始化到未发生
            };
            return newState;
        }
        case types.HOMEPAGE_Visibility: {
            let newState = {
                ...state,
                isHomePageVisible: action.payload
            };
            return newState;
        }
  
        case types.PosSetPage_Visibility: {
            let newState = {
                ...state,
                isPosSetHomeVisible: action.payload
            };
            console.log("HERE IS THE NEW STATE AFTER GOLDBUGREDUCER PROCESSING~~~~~");
            console.log(newState);
            return newState;
        }
        case types.EndPointSetPage_Visibility: {
            let newState = {
                ...state,
                isEndPointPageVisible: action.payload
            };
            return newState;
        }
        case types.DySettingPage_Visibility: {
            let newState = {
                ...state,
                isDySettingPageVisible: action.payload
            };
            return newState;
        }
        case types.TimeSettingPage_Visibility: {
            let newState = {
                ...state,
                isTimeSettingPageVisible: action.payload
            };
            return newState;
        }
        case types.DySettingPage_Param: {
            console.log("DySettingPage_Param is ~~~~~~~~~~~~~~~~***~~~~~~~~~~~~~~~~~~~~");
            console.log(action.payload);
            let newState = {
                ...state,
                dySettingParams: Object.assign({},action.payload)
            };
            return newState;
        }
        case types.GET_AROUND_BUGS_FULFILLED:{
            if (action.payload == false || action.payload.status ==404 ) {
                //加载失败
                let newState = {
                    ...state,
                    bugsAround:[],
                    contentText: "Connection Error"
                };
                return newState;

            } else {
                let newState = {
                    ...state,
                    bugsAround:action.payload,
                    contentText: "Success"
                };
                return newState;

            }
        }
        case types.GET_AROUND_BUGS_PENDING:{
            let newState = {
                ...state,
                contentText: "Connecting..."
            };
            return newState;
        }
        case types.GET_AROUND_BUGS_REJECTED:{
            let newState = {
                ...state,
                bugsAround:[],
                contentText: "Failed"
            };
            return newState;
        }
        default: {
            return state;
        }
    }
} 