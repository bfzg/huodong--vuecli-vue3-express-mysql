import http from '../index';

export function getHomeList(data){
    return http({
        method:'get',
        url:'/api/homeList',
        params:{
            data
        }
    })
}
