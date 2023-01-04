<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'getReply':
            $statement = $conn->query("SELECT * FROM tb_user WHERE user_id = '" . $req['user_id'] . "'");
            if ($statement->num_rows > 0) {
                echo json_encode($statement->fetch_object());
            }
            break;
    }
}
