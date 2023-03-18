const express = require('express');
const router = express.Router();
const mysql = require('../../mysql/mysql');

router.post('/signup',(req,res)=>{
    //用户数据
    let data = req.body;
    //查询语句
    let sql1 = 'select * from events_join where uid=? and tid=? and uname=?';
    //连接数据库
    let connection = mysql.createConnection();
    connection.connect();
    connection.query(sql1,[data.uid,data.tid,data.uname],(err,results)=>{
        // 查询数据库 防止重复报名
        if(err){
            return console.log(err);
        }
        console.log(results)
        if(results.length !=0 ){
            return res.send({status:201,message:'你已经报名该活动!'});
        }
        else if(results.length === 0){
            //插入数据 报名
            let sql2 = 'insert into events_join values (null,?,?,?,?,?,?,?,?,?);';
            connection = mysql.createConnection();
            connection.connect();
            connection.query(sql2,[data.uid,data.tid,data.uname,data.uemail,data.eventsname,data.tname,data.address,data.time,data.file],(err,results)=>{
                if(err) {
                    return console.log(err);
                }
                //报名成功
                return  res.send({status:200,message:'报名成功!'});
            })
        }

    })
    // 关闭数据库连接
    connection.end();
})

module.exports = router;
