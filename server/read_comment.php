<?php
require('connect.php');
header("Content-Type: application/json");
$request = json_decode(stripslashes(file_get_contents("php://input")));

$url = $request->url;
isset($request->sortby) ? $sortby = $request->sortby : $sortby = '';
isset($request->ref_id) ? $ref_id = $request->ref_id : $ref_id = '';
// echo $v;

$sql = "SELECT * FROM comments WHERE url = '$url' ";


if ($ref_id != '') $sql = $sql . "AND ref_id = $ref_id";


if ($sortby == "upvote")
    $sql = $sql . "ORDER BY upvote ASC ";
else if ($sortby == "recent")
    $sql = $sql . "ORDER BY reg_date ASC ";
else if ($sortby == "comment")
    $sql = $sql . "ORDER BY id ASC ";


$result = $conn->query($sql);
$rows;

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {

        $rows['id'][$row['id']] = $row["id"];
        $rows['comment'][$row['id']] = $row['comment'];
        $rows['username'][$row['id']] = $row['username'];
        $rows['upvote'][$row['id']] = $row['upvote'];
        $rows['downvote'][$row['id']] = $row['downvote'];
        $rows['ref_id'][$row['id']] = $row['ref_id'];
        $rows['troll'][$row['id']] = $row['troll'];
        $rows[$row['id']] = $row['ref_id'];
    }
    $rows['nodata'] = "false";
} else {
    $rows['nodata'] = "true";
}

$rows['tree'] = parseTree($rows);
echo json_encode($rows);

$conn->close();




function parseTree($tree_child, $root_child = null)
{
    $return = array();
    # Traverse the tree and search for direct children of the root
    foreach ($tree_child as $child => $parent) {
        # A direct child is found
        if ($parent == $root_child) {
            # Remove item from tree (we don't need to traverse this again)
            unset($tree_child[$child]);
            # Append the child into result array and parse its children
            $return[] = array(
                'id' => $child,
                'children' => parseTree($tree_child, $child)
            );
        }
    }
    return empty($return) ? null : $return;
}
