<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];


if (isset($req['action'])) {
    switch ($req['action']) {
        case 'getProfilePost':
            $statement = $conn->query("SELECT * FROM tb_comment WHERE post_id = '" . $req['post_id'] . "' AND com_status = 0");

            if ($statement->num_rows > 0) {
                $comment = [];
                while ($post = $statement->fetch_object()) {
                    array_push($comment, $post);
                }

                echo json_encode($comment);
            }
            break;
    }
}
