<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'getLike':
            $count = $conn->query("SELECT * FROM tb_post WHERE post_id = '" . $req['post_id'] . "' AND post_status != 1");
            if ($count->num_rows > 0) {
                echo json_encode($count->fetch_object()->post_likes);
            }
            break;
    }
}
