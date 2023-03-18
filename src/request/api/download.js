import http from '../index';

export function download(data){
    return http({
        method:'get',
        url:'/api/download',
        params: {
            id:data
        }
    })
}
