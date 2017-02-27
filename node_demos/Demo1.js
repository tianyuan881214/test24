/**
 * Created by admin on 2017/2/27.
 */
var express=require("express")
var app=express()

app.use(express.static("public"))

app.get("/",function (req,res) {
    res.send("hello get!")
})
app.post("/",function (req,res) {
    res.send("hello post!")
})
app.get("/a",function (req,res) {
    res.send("hello a!")
})
app.get("/b",function (req,res) {
    res.send("hello b!")
})
app.get("/c",function (req,res) {
    res.send("hello c!")
})
app.delete("/d_a",function (req,res) {
    res.send("delete")
})
var server=app.listen(9001,function () {
    var host=server.address().address
    var port=server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})