<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'comment':
            $statement = $conn->query("INSERT INTO tb_comment(post_id, user_reply,user_id, com_description, com_date,com_status) VALUES ('" . $req['post_id'] . "','" . $req['user_reply'] . "','" . $req['user_id'] . "','" . $req['comment'] . "',NOW(),0)");
            if ($statement) {
                echo json_encode(['status' => true]);
            } else {
                echo json_encode(['status' => false]);
            }
            break;
    }
}
