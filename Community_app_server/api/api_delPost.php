<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];


if (isset($req['action'])) {
    switch ($req['action']) {
        case 'delPost':

            $statement = $conn->query("UPDATE tb_post SET post_status = 1 WHERE post_id = '" . $req['post_id'] . "'");
            if ($statement) {
                echo json_encode(['status' => true]);
            } else {
                echo json_encode(['status' => false]);
            }
            break;
    }
}
