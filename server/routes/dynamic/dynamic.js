const express = require('express');
const router = express.Router();
const mysql = require('../../mysql/mysql');
//使用文件上传
const multiparty = require('multiparty');
//拼接图片路径
let splicAddress = require('../../javascript/splicingAddress.js')

//获取评论
router.get('/comments',(req,res)=>{
    let requestParams = req.query.data;
    let pageNum = requestParams.pageNum*15;
    let pageSize = Number(requestParams.pageSize);

    let connection = mysql.createConnection();
    connection.connect();
    let sql = 'select * from dynamic limit ?,?';
    connection.query(sql,[pageNum,pageSize],(err,results)=>{
        if(err) return console.log(err);
        /* 对数据经行处理 */
        const result =[];
        const map = {};
        results.forEach(item=>{
            map[item.id] = item;
            item.img = JSON.parse(item.img)   //解除json
        });
        results.forEach(item=>{
            const parent = map[item.pid];
            if(parent){
                (parent.children || (parent.children=[])).unshift(item)
            }else {
                result.unshift(item);
            }
        })
        res.send({status:200,data:result})
    })
    connection.end();
})

//添加评论
router.post('/addComments',(req,res)=>{
    const form = new multiparty.Form();
    form.uploadDir = "public/upCommentsImg";
    form.parse(req,(err,data,fileds)=>{
        if (err) return console.log(err);
       if(data.comment[0] != ''){
           if(fileds.images != undefined){
               let imgUrl = splicAddress.splicingAddress(fileds.images);
               //把处理好的img放入对象
               data.img = JSON.stringify(imgUrl);
           }
           if(data.pid[0] === 'null'){
               data.pid[0] = null;
           }

           var sql = 'insert into dynamic values(null,?,?,?,?,?,?,?)';
           let connection = mysql.createConnection();
           connection.connect();
           connection.query(sql,[data.pid,data.uid[0],data.uimg,data.uname,data.pname,data.comment,data.img],(err,results)=>{
               if(err) return console.log(err)
               if (results.affectedRows !== 0){
                   return  res.send({status:200,message:'评论成功!'});
               }
               return;
           });
           connection.end();
       }else{
           return;
       }
    })
})

module.exports = router;
