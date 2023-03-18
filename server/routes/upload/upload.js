const express = require('express');
const router = express.Router();
//使用文件上传
const multiparty = require('multiparty');
//使用数据库
const mysql = require('../../mysql/mysql');
//文件上传
router.post('/upload', (req, res) => {
    const form = new multiparty.Form();
    form.uploadDir = "public/upFile";
    form.parse(req, (err, data, fileds) => {
        if (err) return res.send({status: 302, message: '文件上传失败!'});
        // 接收到的表单数据
        let newData = {
            uid:data.uid[0],
            eventsname: data.eventsname[0],
            email: data.email[0],
            uname: data.uname[0],
            detailed: data.detailed[0],
            address: data.address[0],
            starttime: data.starttime[0],
            shuttime: data.shuttime[0],
            type: data.type[0],
            department: data.department[0],
            files: []
        };
        //遍历发来的文件
        var sql2;
        if (fileds.files !== undefined) {
            fileds.files.forEach((i) => {
                //补全文件路径
                var uimg = "http://127.0.0.1:3000/" + i.path.slice(6);
                newData.files.push(uimg);
            })
            sql2 = 'insert into all_events values(null,?,?,?,?,?,?,?,?,?,?,?)';
        }
        else {
            sql2 = 'insert into all_events values(null,?,?,?,?,?,?,?,?,?,?,null)';
        }
        //连接数据库
        let connection = mysql.createConnection();
        connection.connect();
        connection.query(sql2, [newData.uid, newData.eventsname, newData.uname, newData.email, newData.address, newData.detailed, newData.type, newData.department, newData.starttime, newData.shuttime, newData.files], (err, results) => {
            if (err) {
                return console.log(err);
            }
            res.send({status:200,message:'上传成功！'});
        })
        // 关闭数据库连接
        connection.end();
    })

})


module.exports = router;
