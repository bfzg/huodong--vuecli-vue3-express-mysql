import http from '../index';
//这是搜索
export function getSearch(eventsName){
    return http({
        method:'get',
        url:'/api/search/',
        params:eventsName
    })
}
