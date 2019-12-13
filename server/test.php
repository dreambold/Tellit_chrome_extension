<?php

require('connect.php');
$url = "chrome://extensions/";
if ($url != '') {
    $sql = "SELECT id, username, comment, upvote, downvote, ref_id FROM comments WHERE url = '$url' ";
    $result = $conn->query($sql);
    $rows;
    // echo $rows;
    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {

            $rows['id'][] = $row["id"];
            $rows['comment'][] = $row['comment'];
            $rows['username'][] = $row['username'];
            $rows['upvote'][] = $row['upvote'];
            $rows['downvote'][] = $row['downvote'];
            $rows['ref_id'][] = $row['ref_id'];
            $rows[$row['id']] = $row['ref_id'];
        }
        $rows['nodata'] = "false";
        echo json_encode($rows);
    } else {
        $rows['nodata'] = "true";
        echo json_encode($rows);
    }
}


$arr = array(
    '216' => 103,
    '217' => 216,
    '88' => 216,
    '102' => NULL,
    '103' => 102,
    '104' => 102
);
function parseTree($tree, $root = null)
{
    $return = array();
    # Traverse the tree and search for direct children of the root
    foreach ($tree as $child => $parent) {
        # A direct child is found
        if ($parent == $root) {
            # Remove item from tree (we don't need to traverse this again)
            unset($tree[$child]);
            # Append the child into result array and parse its children
            $return[] = array(
                'name' => $child,
                'children' => parseTree($tree, $child)
            );
        }
    }


    return empty($return) ? null : $return;
}

function printtree($tree)
{
    if (!is_null($tree) && count($tree) > 0) {
        echo '<ul>';
        foreach ($tree as $b) {
            echo '<li>' . $b['name'];
            printtree($b['children']);
            echo '</li>';
        }
        echo '</ul>';
    }
}

echo '<br>';
echo '===========================';
echo '<br>';
echo json_encode(parseTree($rows));

printtree(parseTree($rows));
