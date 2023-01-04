<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'del':
            $statement  = $conn->query("UPDATE tb_comment SET com_status = 1 WHERE com_id = '" . $req['com_id'] . "'");
            if ($statement) {
                echo json_encode(['status' => true]);
            } else {
                echo json_encode(['status' => false]);
            }
            break;
    }
}
