import http from '../index';

export function getSchoolData(data){
    return http({
        method:"get",
        url:'/api/school',
        params:{
            data
        }
    })
}
