const express = require('express');
const router = express.Router();
//使用文件上传
const multiparty = require('multiparty')
//引入数据库
const mysql = require('../../mysql/mysql');
//拼接图片路径
let splicAddress = require('../../javascript/splicingAddress.js')

router.post('/alterPicture',(req,res)=>{
    const form = new multiparty.Form();
    form.uploadDir ="public/upload";


    form.parse(req,(err,data,fileds)=>{
        if(err) {
            console.log(err)
            res.send({status:301,message:'上传图片出现错误!'});
            return}
        //获取用户id
        let id = data.uid.toString();
        //获取头像存放位置
        let uimg = splicAddress.splicingAddress(fileds.file);

        const sql = 'update user set uimg=? where uid=?';
        //连接数据库
        let connection = mysql.createConnection();
        connection.connect();
        connection.query(sql,[uimg,id],(err,results)=>{
            if(err){
                console.log(err)
                return
            }
            if (results.affectedRows!== 1){
                return res.send({status:301,message:'数据库存储失败!'});
            }
            res.send({status:200,message:'头像更新成功，请刷新!'});
        })
// 关闭数据库连接
        connection.end();
    })

})

module.exports = router;
