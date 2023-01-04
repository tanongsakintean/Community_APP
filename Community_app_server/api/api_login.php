<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'login':
            $statement = $conn->query("SELECT * FROM tb_user WHERE user_username = '" . $req['username'] . "' AND user_password = '" . $req['password'] . "'");
            if ($statement->num_rows > 0) {
                echo json_encode(['status' => true, 'meg' => 'Login Successfully', 'data' => $statement->fetch_object()]);
            } else {
                echo json_encode(['status' => false, 'meg' => "email or password incorrect!"]);
            }
            break;
    }
}
