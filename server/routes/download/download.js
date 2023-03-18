
const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('../../mysql/mysql')

router.get('/download',(req,res)=>{
    let id = req.query.id;
    //连接数据库
    const sql = 'select file from all_events where id=?';
    let connection = mysql.createConnection();
    connection.connect();
    connection.query(sql,id,(err,results)=>{
        if(err) return console.log(err);
        res.send({status:200,file:results[0].file});
        // res.send({status:200,message:'下载成功!',file:results});
        // res.send({status: 200,message:'下载失败!'})
    })
    connection.end();
})

module.exports = router;
