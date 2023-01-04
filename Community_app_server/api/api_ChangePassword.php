<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'changepassword':
            $statement = $conn->query("UPDATE tb_user SET user_password = '" . $req['password'] . "' WHERE user_username = '" . $req['email'] . "' ");
            if ($statement) {
                echo json_encode(['status' => true, 'meg' => 'Change Password Compete!']);
            } else {
                echo json_encode(['status' => false, 'meg' => "Have problem please try again!"]);
            }
            break;
    }
}
