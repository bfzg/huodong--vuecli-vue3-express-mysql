import http from '../index';

export function upload(data){
    return http({
        method:'post',
        url:'/upload',
        data:data
    })
}
