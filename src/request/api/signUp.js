import http from '../index.js'

export  function postSignUp(data){
    return http({
        method:"post",
        url:'/api/signup',
        data
    })
}
