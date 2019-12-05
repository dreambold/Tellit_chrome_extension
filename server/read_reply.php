<?php

require('connect.php');
header("Content-Type: application/json");
$v = json_decode(stripslashes(file_get_contents("php://input")));
$url = $v->url;
$sortby = $v->sortby;
// echo $v;
// if ($sortby == "test") {

// if ($url != '') {
// $sql = "SELECT id, username, comment, upvote, downvote FROM comments WHERE url = '$url' ";
// $result = $conn->query($sql);
// $rows;
// // echo $rows;
// if ($result->num_rows > 0) {
// // output data of each row
// while ($row = $result->fetch_assoc()) {

// $rows['id'][] = $row["id"];
// $rows['comment'][] = $row['comment'];
// $rows['username'][] = $row['username'];
// $rows['upvote'][] = $row['upvote'];
// $rows['downvote'][] = $row['downvote'];
// }
// $rows['nodata'] = "false";
// echo json_encode($rows);
// } else {
// $rows['nodata'] = "true";
// echo json_encode($rows);
// }
// } else {
// $rows = "You can't open this app!";
// echo json_encode($row);
// }
// } else {
// if ($sortby == "upvote") {
// $sql = "SELECT id, username, comment, upvote, downvote FROM comments WHERE url = '$url' ORDER BY upvote ASC ";
// $result = $conn->query($sql);
// $rows;
// // echo $rows;
// if ($result->num_rows > 0) {
// // output data of each row
// while ($row = $result->fetch_assoc()) {
// $rows['id'][] = $row["id"];
// $rows['comment'][] = $row['comment'];
// $rows['username'][] = $row['username'];
// $rows['upvote'][] = $row['upvote'];
// $rows['downvote'][] = $row['downvote'];
// }
// $rows['nodata'] = "false";
// echo json_encode($rows);
// } else {
// $rows['nodata'] = "true";
// echo json_encode($rows);
// }
// } else if ($sortby == "recent") {
// $sql = "SELECT id, username, comment, upvote, downvote FROM comments WHERE url = '$url' ORDER BY reg_date ASC ";
// $result = $conn->query($sql);
// $rows;
// // echo $rows;
// if ($result->num_rows > 0) {
// // output data of each row
// while ($row = $result->fetch_assoc()) {

// $rows['id'][] = $row["id"];
// $rows['comment'][] = $row['comment'];
// $rows['username'][] = $row['username'];
// $rows['upvote'][] = $row['upvote'];
// $rows['downvote'][] = $row['downvote'];
// }
// $rows['nodata'] = "false";
// echo json_encode($rows);
// } else {
// $rows['nodata'] = "true";
// echo json_encode($rows);
// }
// } else if ($sortby == "comment") {
// $sql = "SELECT id, username, comment, upvote, downvote FROM comments WHERE url = '$url' ORDER BY id ASC ";
// $result = $conn->query($sql);
// $rows;
// // echo $rows;
// if ($result->num_rows > 0) {
// // output data of each row
// while ($row = $result->fetch_assoc()) {

// $rows['id'][] = $row["id"];
// $rows['comment'][] = $row['comment'];
// $rows['username'][] = $row['username'];
// $rows['upvote'][] = $row['upvote'];
// $rows['downvote'][] = $row['downvote'];
// }
// $rows['nodata'] = "false";
// echo json_encode($rows);
// } else {
// $rows['nodata'] = "true";
// echo json_encode($rows);
// }
// }
// }
// $conn->close();
