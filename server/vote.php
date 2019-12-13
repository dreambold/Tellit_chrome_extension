<?php

require('connect.php');
header("Content-Type: application/json");
$v = json_decode(stripslashes(file_get_contents("php://input")));
// $d = count($v);
$id = $v->id;
$upvote = $v->vote;
$vote;

if ($upvote == 'true') {
    $sql = "SELECT upvote FROM comments WHERE id = '$id' "; //WHERE url = '$url' ORDER BY reg_date DESC
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $vote = $row['upvote'] + 1;

        $sql = "UPDATE comments SET upvote='$vote' WHERE id='$id'";
        $conn->query($sql);
    }
} else {
    $sql = "SELECT downvote FROM comments WHERE id = '$id' "; //WHERE url = '$url' ORDER BY reg_date DESC
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $vote = $row['downvote'] + 1;

        $sql = "UPDATE comments SET downvote='$vote' WHERE id='$id'";
        $conn->query($sql);
    }
}
// var_export($d);
$conn->close();
