import http from '../index';
import axios from "axios";

//登录api
export function postlogin(uname,pwd){
    return http({
        method:"post",
        url:'/api/login',
        data:{
            email:uname,
            pwd:pwd
        }
    })
}
//注册api
export function postenroll(name,email,pwd,code){
    return http({
        method:"post",
        url:'/api/register',
        data:{
            name:name,
            email:email,
            pwd:pwd,
            code:code
        }
    })
}

//获取验证码api
export function getverify(email){
    return http({
        method:"get",
        url:'/api/sendemail/register',
        params:{
            email:email
        }
    })
}
