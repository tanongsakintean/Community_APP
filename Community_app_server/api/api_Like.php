<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'like':
            $have = $conn->query("SELECT * FROM tb_likes WHERE like_user = '" . $req['like_user'] . "' AND user_id = '" . $req['user_id'] . "' AND post_id = '" . $req['post_id'] . "'")->num_rows;
            $statement;
            if ($have) {
                $statement = $conn->query("UPDATE tb_likes SET like_status = 1 WHERE like_user = '" . $req['like_user'] . "' AND user_id = '" . $req['user_id'] . "' AND post_id = '" . $req['post_id'] . "'");
            } else {
                $statement = $conn->query("INSERT INTO tb_likes (like_user,user_id,post_id,like_status) VALUES ('" . $req['like_user'] . "','" . $req['user_id'] . "','" . $req['post_id'] . "',1) ");
            }
            if ($statement) {
                $statement = $conn->query("UPDATE tb_post SET post_likes = post_likes + 1 WHERE post_id = '" . $req['post_id'] . "'");
                $count = $conn->query("SELECT * FROM tb_post WHERE post_id = '" . $req['post_id'] . "' AND post_status != 1");
                if ($statement && $count->num_rows > 0) {
                    echo json_encode(['status' => true, 'count' => $count->fetch_object()->post_likes]);
                } else {
                    echo json_encode(['status' => false, 'count' => $count->fetch_object()->post_likes]);
                }
            }


            break;
    }
}
