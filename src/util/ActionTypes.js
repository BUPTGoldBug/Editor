//一个异步请求的四个action ,发起-正在-成功/拒绝
//只用触发一个第一个type的action，其他两个action-type 由 redux-promise-middleware 进行触发
//其他两个后缀必须是_PENDING,_FUL
export const ADD_USER = 'ADD_USER' ;

export const ADD_USER_PENDING = 'ADD_USER_PENDING' ;

export const ADD_USER_FULFILLED = 'ADD_USER_FULFILLED' ;

export const ADD_USER_REJECTED = 'ADD_USER_REJECTED' ;

export const ADD_GoldBug = 'ADD_GoldBug' ;

export const ADD_GoldBug_PENDING = 'ADD_GoldBug_PENDING' ;

export const ADD_GoldBug_FULFILLED = 'ADD_GoldBug_FULFILLED' ;

export const ADD_GoldBug_REJECTED = 'ADD_GoldBug_REJECTED' ;

export const GET_AROUND_BUGS = 'GET_AROUND_BUGS';

export const GET_AROUND_BUGS_PENDING = 'GET_AROUND_BUGS_PENDING' ;

export const GET_AROUND_BUGS_FULFILLED = 'GET_AROUND_BUGS_FULFILLED' ;

export const GET_AROUND_BUGS_REJECTED = 'GET_AROUND_BUGS_REJECTED' ;

export const HOMEPAGE_Visibility = "HOMEPAGE_Visibility";

export const PAGE1_Visibility = "PAGE1_Visibility";

export const PAGE2_Visibility = "PAGE2_Visibility";

export const PosSetPage_Visibility = "PosSetPage_Visibility";

export const EndPointSetPage_Visibility = "EndPointSetPage_Visibility";

export const DySettingPage_Visibility = "DySettingPage_Visibility";

export const TimeSettingPage_Visibility = "TimeSettingPage_Visibility";

export const DySettingPage_Param= "DySettingPage_Param";

export const PUSH = "PUSH";
export const POP = "POP";
export const RESET = "RESET";//登出的时候使用
export const GOBACK = "GOBACK";