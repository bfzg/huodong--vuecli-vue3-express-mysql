import http from "../index";
//提交动态 评论
export function postComments(data){
    // console.log(data)
    return http({
        method:"post",
        url:"/api/addComments",
        data
    })
}

//获取动态 评论
export function getComments(data){
    return http({
        method:"get",
        url:"/api/comments",
        params:{
            data
        }
    })
}
