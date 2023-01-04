<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
$statement = $conn->query("SELECT * FROM tb_post 
LEFT JOIN tb_user ON tb_post.user_id = tb_user.user_id WHERE tb_post.post_status = 0 ORDER By tb_post.post_id  DESC");

echo json_encode($statement->fetch_all());
