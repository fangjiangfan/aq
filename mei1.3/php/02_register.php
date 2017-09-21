<?php

//支持跨域访问
header('Access-Control-Allow-Origin: *');

//接收客户端的参数
$username = $_POST["username"];
$password = $_POST["password"];
//类
class  Res{
    public  $status;
    public  $msg;
}

//连接数据库
$conn = new mysqli("127.0.0.1", "root", "", "mydb7") or die("连接失败");

//判断用户是否已经存在
$sql = "select * from user where username='$username'";
$result = $conn->query($sql);
if ($result && $result->num_rows>0){
    //存在相同用户
    $res = new Res();
    $res->status = 0;
    $res->msg = "该用户名已经存在， 请重新输入用户名!";
    echo  json_encode($res);
}
else {
    //不存在相同用户

    //注册（插入数据）
    
    $sql = "insert into user(username, password) values('$username','$password')";
//  echo  json_encode($sql);
    $result = $conn->query($sql);
    if ($result) {
        //echo "注册成功！";
        $res = new Res();
        $res->status = 1;
        $res->msg = "恭喜您， 注册成功!";
          echo  json_encode($res);
    }
    else {
        //echo "注册失败！";
        $res = new Res();
        $res->status = 2;
        $res->msg = "很抱歉， 注册失败!";
          echo  json_encode($res);
    }
}

$conn->close();








