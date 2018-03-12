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

export const HOMEPAGE_Visibility = "HOMEPAGE_Visibility";

export const PAGE1_Visibility = "PAGE1_Visibility";

export const PAGE2_Visibility = "PAGE2_Visibility";

export const PUSH = "PUSH";
export const POP = "POP";
export const RESET = "RESET";//登出的时候使用
export const GOBACK = "GOBACK";