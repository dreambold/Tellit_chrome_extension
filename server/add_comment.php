<?php

require('connect.php');
header("Content-Type: application/json");
$v = json_decode(stripslashes(file_get_contents("php://input")));
// $d = count($v);
$url = $v->url;
$comment = $v->comment;
$username = $v->username;
if (isset($v->troll))
    $troll = $v->troll;
else
    $troll = null;

if ($v->ref_id) {
    $ref_id = $v->ref_id;
    $sql = "INSERT INTO comments (username, email, url, comment, ref_id, troll) VALUES ('$username','', '$url',  '$comment', '$ref_id', '$troll')";
    if ($conn->query($sql) === true) {
        // echo "New record created successfully";
    }
} else {
    $sql = "INSERT INTO comments (username, email, url, comment, troll) VALUES ('$username', 'john@example.com', '$url', '$comment', '$troll')";
    if ($conn->query($sql) === true) {
        // echo "New record created successfully";
    }
}
// var_export($v);
$conn->close();
