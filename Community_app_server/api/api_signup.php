<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Content-type:application/json");

$req = json_decode(file_get_contents('php://input'), true)['data'];

if (isset($req)) {
    switch ($req['action']) {
        case 'signup':
            $statement = $conn->query("SELECT * FROM tb_user WHERE user_username = '" . $req['username'] . "' ");
            if ($statement->num_rows > 0) {
                echo json_encode(['status' => false, 'meg' => 'Have the email already!']);
            } else {
                $statement = $conn->query("INSERT INTO tb_user (user_username,user_password,user_fname,user_lname,user_img,user_description,user_follow,user_following,user_date,user_status)
                 VALUES ('" . $req['username'] . "','" . $req['NewPassword'] . "','" . $req['fname'] . "','" . $req['lname'] . "','','',0,0,NOW(),1)");

                if ($statement) {
                    $max_id = $conn->query("SELECT MAX(user_id) AS max_id FROM tb_user")->fetch_object()->max_id;
                    if ($max_id == null)
                    {
                        $max_id = 1;
                    }
                    
                    mkdir("../images/" . $max_id);
                    mkdir("../images/" . $max_id . '/posts');
                    mkdir("../images/" . $max_id . '/profile');
                    echo json_encode(['status' => true, 'meg' => 'Sign complete']);
                } else {
                    echo json_encode(['status' => false, 'meg' => 'Have problem try again']);
                }
            }

            break;
    }
}
