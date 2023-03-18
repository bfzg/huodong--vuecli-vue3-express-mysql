//对图片进行处理 拼接路径
function splicingAddress (data){
    let baseUrl = "http://127.0.0.1:3000";
    let url=[];
    data.forEach(item=>{
        url.push(baseUrl+item.path.slice(6));
    })
    return url;
}

module.exports={
    splicingAddress
}
