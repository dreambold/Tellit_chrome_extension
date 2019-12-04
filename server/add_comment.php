<?php

require('connect.php');
header("Content-Type: application/json");
$v = json_decode(stripslashes(file_get_contents("php://input")));
// $d = count($v);
$url = $v->url;
$comment = $v->comment;
$username = $v->username;
if ($url != '' && $comment != '') {
    $sql = "INSERT INTO comments (username, email, url, comment) VALUES ('$username', 'john@example.com', '$url', '$comment')";
    if ($conn->query($sql) === true) {
        // echo "New record created successfully";
    }
} else {
    echo "Please Enter the Data!";
}
// var_export($v);
$conn->close();
?>