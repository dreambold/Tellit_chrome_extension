<?php

require('connect.php');
header("Content-Type: application/json");
$v = json_decode(stripslashes(file_get_contents("php://input")));
// $d = count($v);
$url = $v->url;
$comment = $v->comment;
$username = $v->username;
if ($v->bg_img)
    $bg_img = $v->bg_img;
else
    $bg_img = null;

if (isset($v->ref_id)) {
    $ref_id = $v->ref_id;
    $sql = "INSERT INTO comments (username, email, url, comment, ref_id, bg_img) VALUES ('$username','', '$url',  '$comment', '$ref_id', '$bg_img')";
    if ($conn->query($sql) === true) {
        // echo "New record created successfully";
    }
} else if ($url != '' && $comment != '') {
    $sql = "INSERT INTO comments (username, email, url, comment, bg_img) VALUES ('$username', 'john@example.com', '$url', '$comment', '$bg_img')";
    if ($conn->query($sql) === true) {
        // echo "New record created successfully";
    }
} else {
    echo "Please Enter the Data!";
}
// var_export($v);
$conn->close();
