<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'unlike':
            $have = $conn->query("SELECT like_user FROM tb_likes WHERE like_user = '" . $req['like_user'] . "' AND user_id = '" . $req['user_id'] . "' AND post_id = '" . $req['post_id'] . "'")->num_rows;
            if ($have) {
                $statement = $conn->query("UPDATE tb_likes SET like_status = 0 WHERE like_user = '" . $req['like_user'] . "' AND user_id = '" . $req['user_id'] . "' AND post_id = '" . $req['post_id'] . "'");
                if ($statement) {
                    $statement = $conn->query("UPDATE tb_post SET post_likes = post_likes - 1 WHERE post_id = '" . $req['post_id'] . "'");
                    $count = $conn->query("SELECT * FROM tb_post WHERE post_id = '" . $req['post_id'] . "' AND post_status != 1");
                    if ($statement && $count->num_rows > 0) {
                        echo json_encode(['status' => false, 'count' => $count->fetch_object()->post_likes]);
                    }
                }
            }

            break;
    }
}
