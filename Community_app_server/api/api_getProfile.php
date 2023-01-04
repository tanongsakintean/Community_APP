<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];


if (isset($req['action'])) {
    switch ($req['action']) {
        case 'getProfile':
            $statement = $conn->query("SELECT * FROM tb_user WHERE user_id = '" . $req['user_id'] . "' ");
            if ($statement->num_rows > 0) {
                $profile = [];
                array_push($profile, $statement->fetch_object());
                $statement = $conn->query("SELECT * FROM tb_post 
                 WHERE tb_post.user_id = '" . $req['user_id'] . "' AND tb_post.post_status = 0
                  ORDER BY tb_post.post_date DESC");
                if ($statement->num_rows > 0) {
                    $post = [];
                    while ($val = $statement->fetch_object()) {
                        array_push($post, $val);
                    }

                    $statement = $conn->query("SELECT * FROM tb_follow WHERE user_id = '" . $req['follower_id'] . "' AND follow_followers = '" . $req['user_id'] . "' AND follow_status = 0 ");
                    if ($statement->num_rows > 0) {
                        echo json_encode(['profile' => $profile, 'posts' => $post, 'isFollow' => true,]);
                    } else {
                        echo json_encode(['profile' => $profile, 'posts' => $post, 'isFollow' => false,]);
                    }
                } else {
                    $post = [];
                    echo json_encode(['profile' => $profile, 'posts' => $post]);
                }
            } else {
                echo json_encode(['status' => false]);
            }
            break;
    }
}
