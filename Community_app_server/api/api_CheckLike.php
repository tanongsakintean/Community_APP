<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'checkLike':
            $statement = $conn->query("SELECT * FROM tb_likes WHERE like_user = '" . $req['like_user'] . "' AND user_id = '" . $req['user_id'] . "' AND post_id = '" . $req['post_id'] . "'");
            if ($statement->num_rows > 0) {
                if ($statement->fetch_object()->like_status != 0) {
                    echo json_encode(true);
                } else {
                    echo json_encode(false);
                }
            } else {
                echo json_encode(false);
            }
            break;
    }
}
