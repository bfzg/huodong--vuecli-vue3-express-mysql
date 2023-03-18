const express = require('express');
const router = express.Router();
const mysql = require('../../mysql/mysql');

router.get('/homeList',(req,res)=>{
    let requestParams = req.query.data;
    let pageNum = requestParams.pageNum*15;
    let pageSize = Number(requestParams.pageSize);

    const sql = 'select * from all_events limit ?,?'
    //连接数据库
    let connection = mysql.createConnection();
    connection.connect();
    connection.query(sql,[pageNum,pageSize],(err,results)=>{
        if(err) return res.send({status:301,message:err});
        res.send({status:200,message:'获取数据成功!',data:results})
    })
    // 关闭数据库连接
    connection.end();
})

module.exports = router;
