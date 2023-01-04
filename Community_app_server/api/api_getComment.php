<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'getComment':
            $statement = $conn->query("SELECT * FROM tb_comment LEFT JOIN tb_user ON 
            tb_comment.user_id = tb_user.user_id WHERE tb_comment.post_id = '" . $req['post_id'] . "' AND com_status = 0 ORDER BY tb_comment.com_id DESC");

            if ($statement->num_rows > 0) {
                echo json_encode($statement->fetch_all());
            } else {
                echo json_encode(false);
            }
            break;
    }
}
