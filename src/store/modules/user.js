const user={
    state:{
        loginStatus:false,    //登录状态
        token: "",   //token
        userInfo: {},   //用户登录信息
        join:0,     //用户参加的活动数
        publish:0       //用户发布的活动数
    },
    getters:{

    },
    mutations:{
    //定义mutations 用于修改状态（同步）
        updateuser(state,user){
            state.loginStatus = true;
            state.userInfo = user;
            //持久化存储  本地存储
            localStorage.setItem('teaUserInfo',JSON.stringify(user));
        },
        //读取
        inituser(state){
            let userInfo = JSON.parse(localStorage.getItem('teaUserInfo'));
            if(userInfo){
                state.loginStatus = true;
                // state.token = userInfo.token;
                state.userInfo = userInfo;
            }
        },
        //修改登录状态
        displaylogin(state,disBtn){
            state.loginStatus = disBtn;
        },
        //获取用户参加的活动数量
        getUserJoinNumber(state,value){
            state.join=value;
            localStorage.setItem('join',value);
        },
        //获取用户发布的活动数量
        getUserPublishNumber(state,value){
            state.publish = value;
            localStorage.setItem('publish',value);
        },
        //读取用户发布信息
        getUserJPInfo(state){
            let join = localStorage.getItem('join');
            let publish = localStorage.getItem('publish');
            state.join = join;
            state.publish = publish
        }
    },
}
export default user;
