var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

//index入口模块
var indexRouter = require('./routes/index');

// 解析参数格式
const bodyParser = require('body-parser')
// 跨域
const cors = require('cors')

var app = express();

//解决跨域问题
app.use(cors())
app.listen(8000, function () {
  console.log('start')
})

//配置解析前端传来的token
// const expressJWT = require('express-jwt');
// const config = require('./config');
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))
// 解析 application/json
app.use(bodyParser.json());
// 静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 引入登录模块
const login = require('./routes/user/login')
app.use('/api',login)
//引入注册模块
const register=require('./routes/user/register')
app.use('/api',register);
//引入首页活动模块
const homeList = require('./routes/home/home');
app.use('/api',homeList);
//引入查询学校活动模块
const school = require('./routes/school/school');
app.use('/api',school);
//引入使用搜索模块
const search = require('./routes/search/search');
app.use('/api',search);
//引入报名模块
const upSignUp = require('./routes/signUp/signUp');
app.use('/api',upSignUp);
//引入我的 修改头像模块
const my = require('./routes/my/alterPicture')
app.use(my);
//引入文件上传及活动上传模块
const upload = require('./routes/upload/upload');
app.use(upload);
//引入下载模块
const download = require('./routes/download/download');
app.use('/api',download);
//查询活动模块
const myJoin = require('./routes/my/myEvents');
app.use('/api',myJoin);
//动态模块
const dynamic = require('./routes/dynamic/dynamic');
app.use('/api',dynamic);


// 监听服务开启
app.listen('3000', '127.0.0.1', (res) => {
  console.log('Server running http://127.0.0.1:3000')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
