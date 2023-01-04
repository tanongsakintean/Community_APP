<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'editProfile':
            $statement = $conn->query("UPDATE tb_user SET user_fname = '" . $req['fname'] . "', user_lname = '" . $req['lname'] . "', user_description = '" . $req['bio'] . "' WHERE user_id = '" . $req['user_id'] . "'");
            if ($statement) {
                echo json_encode(['status' => true]);
            } else {
                echo json_encode(['status' => false]);
            }
            break;
    }
}
