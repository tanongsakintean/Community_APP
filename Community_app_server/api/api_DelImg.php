<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];


if (isset($req['action'])) {
    switch ($req['action']) {
        case 'delProfile':
            $statement = $conn->query("UPDATE tb_user SET user_img = '' WHERE user_id = '" . $req['user_id'] . "'");
            if ($statement) {
                echo json_encode(['status' => true, 'img' => $img,]);
            } else {
                echo json_encode(['status' => true, 'meg' => "have error"]);
            }
            break;
    }
}
