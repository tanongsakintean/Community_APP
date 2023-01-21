<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");



if (isset($_REQUEST['action'])) {
    switch ($_REQUEST['action']) {
        case 'add':
            $status = 0;
            $target_dir = "../images/";
            
            if (file_exists($target_dir)) {
                } else {
                    mkdir($target_dir);
                }
            
            foreach ($_FILES['user_img']['name'] as $key => $val) {
                $imageFileType = pathinfo($val, PATHINFO_EXTENSION);
                if ($imageFileType != "JPG" && $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
                    $status += 1;
                }
            }

            if ($status == 0) {
                $count = $conn->query("SELECT  MAX(post_id) AS max_id FROM tb_post ")->fetch_object()->max_id;

                //bug if don't have data in tb_post $count = null 
                $count += 1;
                mkdir($target_dir . $_REQUEST['user_id'] . "/posts/" . $count);
                $img = "";
                foreach ($_FILES['user_img']['tmp_name'] as $key => $value) {
                    $img .= $key . "." . pathinfo($_FILES['user_img']['name'][$key])['extension'] . ",";
                    move_uploaded_file($value, $target_dir . $_REQUEST['user_id'] . "/posts/" . $count . '/' . $key . "." . pathinfo($_FILES['user_img']['name'][$key])['extension']);
                }

                $statement = $conn->query("INSERT INTO tb_post (user_id,post_description,post_img,post_likes,post_date,post_status) VALUES ('" . $_REQUEST['user_id'] . "','" . $_REQUEST['caption'] . "','" . substr($img, 0, -1)  . "',0,NOW(),0)");
                if ($statement) {
                    echo json_encode(['status' => true]);
                } else {
                    echo json_encode(['status' => true, 'meg' => "have error"]);
                }
            } else {
                echo json_encode(['status' => true, 'meg' => "type image not correct!"]);
            }

            break;
    }
}
