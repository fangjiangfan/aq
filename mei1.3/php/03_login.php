<?php


//支持跨域访问
header('Access-Control-Allow-Origin: *');

//获取客户端提交的参数
$username = $_POST["username"];
$password = $_POST["password"];

//类
class  Res{
    public  $status;
    public  $msg;
}
//连接数据库
$conn = new mysqli("127.0.0.1", "root", "", "mydb7") or die("连接失败");
$sql = "select * from user where username='$username' and password='$password'";
$result = $conn->query($sql);
if ($result && $result->num_rows>0) {
    //登录成功
    $res = new Res();
    $res->status = 1;
    $res->msg = "登录成功!";
    echo  json_encode($res);
}
else {
    //登录失败
    $res = new Res();
    $res->status = 0;
    $res->msg = "登录失败! 用户名或密码错误";
    echo  json_encode($res);
}

$conn->close();













