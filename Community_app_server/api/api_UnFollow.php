<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'unFollow':
            $statement = $conn->query("UPDATE tb_follow SET follow_status = 1 WHERE user_id = '" . $req['user_id'] . "' AND follow_followers = '" . $req['follower_id'] . "' ");
            if ($statement) {
                $statement = $conn->query("UPDATE tb_user SET user_following = user_following - 1  WHERE user_id = '" . $req['user_id'] . "'");
                if ($statement) {
                    $statement = $conn->query("UPDATE tb_user SET user_follow = user_follow - 1  WHERE user_id = '" . $req['follower_id'] . "'");
                    if ($statement) {
                        echo json_encode(['status' => true]);
                    }
                }
            } else {
                echo json_encode(['status' => false]);
            }
            break;
    }
}
