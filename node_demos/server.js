/**
 * Created by admin on 2017/2/27.
 */
var express=require("express")
var bodyParser = require('body-parser');
var fs=require("fs")
var multer=require("multer")
var cookieParser=require("cookie-parser")

var app=express()
// var urlencodedparser=bodyParser.urlencoded({ extended: false })
//设置静态文件
app.use(express.static("public"))
//设置编码方式为utf-8
app.use(bodyParser.urlencoded({extended:false}))
//设置上传文件
app.use(multer({ dest: '/tmp/'}).array('image'));
//设置cookie
app.use(cookieParser())

//获取客户端发送的cookie信息
app.get("/",function (req,res) {
    console.log("cookies:",req.cookies)
})

//获取主页
app.get("/index.html",function (req,res) {
    res.sendFile(__dirname+"/"+"index.html")
})
//处理get请求
app.get("/process_get",function (req,res) {
    //获取输入参数
    response={
        username:req.query.username,
        password:req.query.password
    }
    console.log(response)
    //返回参数
    res.end(JSON.stringify(response))
})

//处理post请求
app.post("/process_post",function (req,res) {
    response1={
        username1:req.body.username1,
        password1:req.body.password1
    }
    console.log(response1)
    res.end(JSON.stringify(response1))
})

//处理上传文件
app.post("/file_upload",function (req,res) {
    //显示上传信息
    console.log(req.files[0])
    //设置上传文件的保存地址
    var des_file = __dirname + "/file_upload/" + req.files[0].originalname;
    //读取文件并保存到指定地方
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response2 = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log( response2 );
            res.end( JSON.stringify( response2 ) )
        })
    })
})

var server=app.listen(9001,function () {
    var host=server.address().address
    var port=server.address().port
    console.log("http://%s:%s",host,port)
})