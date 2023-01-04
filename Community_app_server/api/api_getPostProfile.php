<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];


if (isset($req['action'])) {
    switch ($req['action']) {
        case 'getPostDetail':
            $statement = $conn->query("SELECT * FROM tb_post 
            LEFT JOIN tb_user ON tb_post.user_id = tb_user.user_id 
            WHERE tb_post.post_status = 0 AND tb_post.post_id = '" . $req['post_id'] . "' ");

            if ($statement->num_rows > 0) {
                echo json_encode($statement->fetch_object());
            }

            break;
    }
}
