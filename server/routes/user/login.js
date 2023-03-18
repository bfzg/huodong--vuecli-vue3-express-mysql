const express = require('express')
const router = express.Router()
// token生成插件模块
const jwt = require('jsonwebtoken');
//导入全局配置文件
const config = require('../../config');
//对密码进行解密处理
const bcrypt = require('bcryptjs');
// 引入数据库
const mysql = require('../../mysql/mysql')
var connection = null;

router.post('/login', (req, res) => {
    //数据库连接
    connection = mysql.createConnection();
    connection.connect();
    //查询语句
    var sql = 'SELECT * FROM user Where uemail=?';
    //前端传过来的参数
    var params = [req.body.email, req.body.pwd];
    //登录验证
    connection.query(sql, req.body.email, function (err, result) {
        //存储返回结果
        var result1;
        if (err) {
            console.log('[SELECT ERROR11111] ', err.message);
            result1 = {
                code: 501,
                msg: '数据库连接失败...'
            }
            return;
        } else {
            //用户没有输入时
            if (req.body.email === "" || req.body.pwd === "") {
                result1 = {
                    code: 401,
                    msg: '账号和密码不能为空',
                    xl: 0
                }
            } else {
                //这里对数据库密码经行解析，需要把密码解密

                if (result.length !== 0) {
                    //判断密码是否正确
                    const compareResult = bcrypt.compareSync(req.body.pwd, result[0].upwd)
                    //邮箱密码不正确的时候
                    if (req.body.email !== result[0].uemail && !compareResult) {
                        console.log('m1')
                        result1 = {
                            code: 400,
                            result: '邮箱或者密码错误！',
                            xl: 1
                        }
                    }
                    //邮箱密码输入正确
                    if (req.body.email === result[0].uemail && compareResult) {
                        var clientIp = getIp(req)
                        //传输token内容
                        let payload = {uid: result[0].uid, ip: clientIp,uname:result[0].uname};
                        let token = jwt.sign(payload, config.jwtSecretKey,{expiresIn:config.expiresIn});
                        //返回结果
                        //返回的用户信息
                        let userinfo = [{uid:result[0].uid,uimg:result[0].uimg,uintroduction:result[0].uintroduction,uname:result[0].uname,email:result[0].uemail}];
                        result1 = {
                            code: 200,
                            token: token,
                            msg: '信息正确，返回登录',
                            xl: 2,
                            ip: clientIp,
                            result:userinfo
                        }
                    }
                } else {
                    result1 = {
                        code: 402,
                        msg: '账号不存在，请注册！！'
                    }
                }
            }
        }
        //返回结果，关闭数据库连接
        res.send(result1)
        connection.end();
    });
})
//通过req的hearers来获取ip
var getIp = function (req) {
    var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    return ip;
}
//返回router，映射出去
module.exports = router
