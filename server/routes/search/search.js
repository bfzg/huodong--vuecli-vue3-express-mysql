const express = require('express');
const router = express.Router();
const mysql = require('../../mysql/mysql');

router.get('/search',(req,res)=>{
    //获取活动名称
    let eventsName ='%'+req.query._value+'%';
    //创建sql语句  查询表school
    let sql1 = 'select * from all_events where eventsname like?;';
    var connection = mysql.createConnection({ multipleStatements: true });
    connection.connect();
    connection.query(sql1,[eventsName],(err,results)=>{
        if(err) return res.send({status:301,message:err});
        res.send({status:200,message:'获取数据成功!',results:results});
    })
    // 关闭数据库连接
    connection.end();
})

module.exports = router;
