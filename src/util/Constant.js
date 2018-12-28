/*export const UserDetailField = {
    NAME_FIELD:1,
    PWD_FILED:2,
    POSITION_FILED:3
};*/
import { View, StyleSheet } from 'react-native'
import { ViroMaterials, ViroAnimations ,ViroARTrackingTargets} from 'react-viro'
import storage from 'redux-persist/es/storage';
import { PermissionsAndroid, BackAndroid } from 'react-native'
export const sharedProps = {
    apiKey: "142365C9-3C5A-4250-AD1A-FD21C10322EB",
}
export const ROOT_SERVER_URL = "http://101.201.64.196:8084/";

export const URL = {
    addUser: "user/addUser",
    login: "user/login",
    getUserDetail: "user/getDetail",//用cookies获取 
    addGoldBug: "goldbug/addGoldBug",
    getAroundBugs: "goldbug/getAroundBugs",
    getSpecBug: "goldbug/getSpecBug",

    getCheckedOrCheckingDetail: "goldbug/getSpecBug",

    vaild: "goldbug/vaildBug",
    //1
    getDetail: "goldbug/getSpecBug",
    //2
    getCheckingList: "superuser/getBugList",
    getCheckedList: "superuser/getBugList",
    //3
    checkBug: "superuser/checkBug",
    drawBackBug: "superuser/checkBug"

};

export const coordinate = {
    BUPT_Center_Lat: 39.961458366,
    BUPT_Center_Lon: 116.358147114516
}

export const feather = require('feather-icons')

export const permissions = [
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,


]
export const route_pathName = {
    addGoldBugPage2: "AddGoldBugPage2",
    homePage: "HomePage",
    positionSettingHome: "PositionSettingHome",
    DySettingPage: "DySettingPage",
    TimeSettingPage: "TimeSettingPage",
    arScene: "arScene",
    LoginPage: "LoginPage",
    HeaderPage: "HeaderPage",
    CheckPage: "CheckPage",


}
export const resultsOfPermission = {
    granted: 'granted',
    denied: 'denied',
    never_ask_again: 'never_ask_again'
}
ViroMaterials.createMaterials({
    grid: {
        lightingModel: "Blinn",
        diffuseTexture: require('../resources/res/grid_bg.jpg'),
    },
    hud_text_bg: {
        diffuseColor: "#00ffff"
    },
    ground: {
        diffuseColor: "#ffffff22"
    },
    unGround: {
        diffuseColor: "#ffffff00"
    },
    ground_hit: {
        diffuseColor: "#008141E6"
    },
    cube_color: {
        diffuseColor: "#0021cbE6"
    },
    white: {
        lightingModel: "PBR",
        diffuseTexture: require('../resources/tesla/object_car_main_Base_Color.png'),
        metalnessTexture: require('../resources/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../resources/tesla/object_car_main_Roughness.png'),
      },
      blue: {
        lightingModel: "PBR",
        diffuseTexture: require('../resources/tesla/object_car_main_Base_Color_blue.png'),
        metalnessTexture: require('../resources/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../resources/tesla/object_car_main_Roughness.png'),
      },
      grey: {
        lightingModel: "PBR",
        diffuseTexture: require('../resources/tesla/object_car_main_Base_Color_grey.png'),
        metalnessTexture: require('../resources/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../resources/tesla/object_car_main_Roughness.png'),
      },
      red: {
        lightingModel: "PBR",
        diffuseTexture: require('../resources/tesla/object_car_main_Base_Color_red.png'),
        metalnessTexture: require('../resources/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../resources/tesla/object_car_main_Roughness.png'),
      },
      yellow: {
        lightingModel: "PBR",
        diffuseTexture: require('../resources/tesla/object_car_main_Base_Color_yellow.png'),
        metalnessTexture: require('../resources/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../resources/tesla/object_car_main_Roughness.png'),
      },
      white_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(231,231,231)",
      },
      blue_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(19,42,143)",
      },
      grey_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(75,76,79)",
      },
      red_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(168,0,0)",
      },
      yellow_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(200,142,31)",
    },
});
ViroARTrackingTargets.createTargets({
    logo : {
      source : require('../resources/logo1.png'),
      orientation : "Up",
      physicalWidth : 0.165 // real world width in meters
    },
    poster : {
        source : require('../resources/blackpanther.jpg'),
        orientation : "Up",
        physicalWidth : 0.6096 // real world width in meters
      }
  });

ViroAnimations.registerAnimations({
    scaleModel:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
    duration: 1000},
    animateObject: {
        properties: {

            rotateX: "-90"

        },
        easing: "Bounce",
        duration: 1000
    },
    initAnimateObject: {
        properties: {

            rotateX: "+90"

        },
        easing: "Bounce",
        duration: 1
    },
    scaleUp:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
                  duration: 500, easing: "bounce"},
    scaleDown:{properties:{scaleX:0, scaleY:0, scaleZ:0,},
                  duration: 200,},
    scaleCar:{properties:{scaleX:.09, scaleY:.09, scaleZ:.09,},
                  duration: 500, easing: "bounce"},
    scaleSphereUp:{properties:{scaleX:.8, scaleY:.8, scaleZ:.8,},
                  duration: 50, easing: "easeineaseout"},
    scaleSphereDown:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
                  duration: 50, easing: "easeineaseout"},
    tapAnimation:[["scaleSphereUp", "scaleSphereDown"],]
});

export const pushStrength = [1, 1.5, 2.5, 3.1, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.5]; //在3-4之间徘徊 3 3.1 3.2 3.3 3.4 3.5 3.6 3.7 3.8 3.9 4 (12个值)
export const xConfict = [-5, -4.5, -4, -3.5, -1.5, 1, 0, 1, 1.5, 3.5, 4, 4.5, 5]//x轴上的 4  -3.5 -2.5  -1.5 0 1.5  2.5 3.25 3.5  4
//vip几率更高 非vip几率更低
export const styles = StyleSheet.create({
    middle_text: {
        paddingTop: 100,
        paddingBottom: 100,
    },//在这个style下，子组件居中
    arContainer: {
        //总的那个view
        flex: 1
    },
    arScene: {
        //ar所在的那个view
        flex: 1
    },
    modalStyles: {
        borderRadius: 5
    },
    uiControl_header_quitButton_icon: {
        color: "#ffffff",

        fontSize: 16
    },
    uiControl_header_quitButton: {

        left: 10,//全占
        flex: 1,


    },
    uiControl_header_sureButton: {
        position: 'absolute',
        right: 10,


    },

    uiControl_select_Header: {
        //种虫的顶部菜单显示所在的view,
        position: 'absolute',
        display: 'flex',
        backgroundColor: "#ffffff22",
        top: 10,//距顶部10,
        left: 10,//全占
        right: 10,
        height: 40,
        justifyContent: 'space-between'

    },
    uiControl_catch_bottom_game2: {
        //捉虫-底部-游戏2
        position: 'absolute',
        display: 'flex',
        backgroundColor: "#ffffff22",
        bottom: 200,//距顶部10,
        left: 10,//全占
        right: 10,
        height: 50,


    },
    uiControl_catch_bottom_game2_input: {

        backgroundColor: "#ffffff22",
        textDecorationColor: "#ffffff",
        color: "#ffffff"

    },
    uiControl_catch_bottom_game2_button: {
        backgroundColor: "#ffffff22",
        fontSize: 50,
        textAlign: 'center',
        color: "#ffffff"
    },
    uiControl_catch_bottom_game1: {
        //捉虫-底部-游戏1
        position: 'absolute',
        display: 'flex',
        backgroundColor: "#ffffff22",
        bottom: 10,//距顶部10,
        left: 10,//全占
        right: 10,
        height: 40,
        justifyContent: 'center',

    },
    uiControl_catch_bottom_game1_text: {
        //文本提示
        color: "#ffffff",
        textAlign: 'center',
        paddingTop: 5
    },
    uiControl_select_GameImgList: {
        flexDirection: 'column',

    },
    uiControl_select_GameImgList_item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        height: 100,
        width: 100,

    },
    uiControl_select_GameImgList_item_hover: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        height: 100,
        width: 100,
        borderColor: "#ffffff", borderRadius: 5, borderWidth: 2

    },

    imageItem: {
        flex: 1,
        height: 100,
        width: 100,
    },
    uiControl_select_GameImgView: {
        //用于显示底部图片缩略图的列表的
        position: 'absolute',
        backgroundColor: "#ffffff22",
        flexDirection: 'column',
        bottom: 10,//距底部10,
        left: 10,
        right: 10,
        height: 120,//

    },
    uiControl_catch_uiCenter_panel: { //中间放置
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        height: 500,

    },
    msg_button_content: {
        //放置消息的
        display: "flex",

        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: "flex-end",

    },
    msg_catch_content: {
        //放置消息的
        display: "flex",
        flexDirection: "row",
        height: 30,
        justifyContent: 'center',
        marginBottom: 60


    },
    top_controller: {
        //放置消息的
        display: "flex",
        flexDirection: "row",
        height: 30,
        justifyContent: 'center',



    },
    msg_button_content_1: {
        //放置消息的
        display: "flex",

        justifyContent: 'center',
        flexDirection: "row",
        alignItems: "flex-end",

    },

    button_icon_style: {
        //按钮组
        fontSize: 30,
        color: "#ffffff",
        alignSelf: "center"
    },




    button_style: {
        //按钮属性
        justifyContent: 'center',

        borderRadius: 50,
        padding: 20,
        height: 70,
        flex: 1,

    },
    button_style_login: {
        //按钮属性
        justifyContent: 'center',

        borderRadius: 50,
        padding: 10,
        height: 40,
        flex: 1,

    },
    arSelect_button_style: {
        //按钮属性
        justifyContent: 'center',

        borderRadius: 50,
        padding: 1,
        flex: 1,

    },
    customMarker: {
        width: 35,
        height: 35
    },
    mainMark: {
        width: 45,
        height: 45
    },
    content_text_view: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },
    content_text: {
        //包含
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 100,
        marginTop: 100,

    },
    content_text_catchTitle: {
        //包含
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 20,
        marginTop: 20,

    },
    //左侧一个表示力度的
    loadingProcessor_zForce: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: "#ffffff22",
        bottom: 20,//距顶部10,
        left: 10,//全占

        width: 50,
        height: 40,
        justifyContent: 'center',
    },
    //顶上一个表示x干扰的
    loadingProcessor_xForce: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: "#ffffff22",
        bottom: 200,//
        left: 100,//全占
        right: 100,
        height: 40,
        justifyContent: 'center',
    },

})
export const vectorList = [3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4];//12个数字,速度数组
export const xConfilt = [-4, -3.5, -2.5, -1.5, -1, -0.5, 0, -0.5, 1, 1.5, 2.5, 3.5, 4]; //13个干扰因子
export const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'] // only navigation will be persisted
};
export const getRandom = function (start, end) {

    var length = end - start + 1;

    var num = parseInt(Math.random() * (length) + end);

    return num;

};
export const gameList = [1, 2,3,4];
export const getStrContent = function (txt, size) {

    if (txt.length > size) {
        let str = txt.substr(0, size) + "...";
        return str;
    } else {
        return txt;
    }
}
export const regUtils = {


    passwordReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    phone: /^1\d{10}$/,
    regEn: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]\s+\r+\n+]/im,
    regCn: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]\s+\r+\n+]/im,

}



export const rootRequests = [

    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

];

export const baseRequests = [

    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.CAMERA

];
export const arRequest = [
    PermissionsAndroid.PERMISSIONS.WAKE_LOCK
];
export const checkPermissions = async function (permissions) {
    if (permissions instanceof Array) {
        let result = true;
        for (let i in permissions) {
            //循环判断
            let a = await checkPermissions(permissions[i])
            console.log(permissions[i]+":"+a)
            if ( a == false) {
                return false;//失败了
            }
        }
        return true; //都有，那就true
    } else {

        //检查权限的通用函数
        try {
            //返回Promise类型
            const granted = await PermissionsAndroid.check(
                permissions
            )
            return granted;
        } catch (err) {
            //出错，返回false
            return false;
        }

    }





}
export const requsetPermissions = async function (permissions) {
    if (permissions instanceof Array) {
        //多个权限
        try {
            const granteds = await PermissionsAndroid.requestMultiple(permissions);
            for (let i in permissions) {
                //遍历检查每个权限是否申请完整
                if (granteds[permissions[i]] === resultsOfPermission.granted) {
                    continue;
                } else {
                    //不同意被，退出
                    BackAndroid.exitApp();
                }
            }
            return true;
        } catch (error) {
            BackAndroid.exitApp();
        }

    } else {
        //不是数组
        try {
            const granted = await PermissionsAndroid.request(
                permissions
            );
            if (granted === resultsOfPermission.granted) {
                //申请成功
                return true;
            } else {
                BackAndroid.exitApp();
            }


        } catch (error) {
            BackAndroid.exitApp();
        }


    }


}
