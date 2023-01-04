<?php
include("../connect.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");



if (isset($_REQUEST['action'])) {
    switch ($_REQUEST['action']) {
        case 'uploadImg':
            $status = 0;
            $target_dir = "../images/";

            if (pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION) != "JPG" && pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION) != "jpg" && pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION) != "png" && pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION) != "jpeg" && pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION) != "gif") {
                $status += 1;
            }

            if ($status == 0) {
                $img = "";
                $img .= "1." . pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION);

                move_uploaded_file($_FILES['img']['tmp_name'], $target_dir . $_REQUEST['user_id'] . "/profile/" .  "1." . pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION));

                $statement = $conn->query("UPDATE tb_user SET user_img = '" . $img . "' WHERE user_id = '" . $_REQUEST['user_id'] . "'");
                if ($statement) {
                    echo json_encode(['status' => true, 'img' => $img,]);
                } else {
                    echo json_encode(['status' => true, 'meg' => "have error"]);
                }
            } else {
                echo json_encode(['status' => true, 'img' => "type image not correct!"]);
            }

            break;
    }
}
