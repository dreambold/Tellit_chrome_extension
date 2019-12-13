<?php

require('connect.php');
header('Content-Type: application/json');

if (isset($_GET['url'])) {
	$url = $_GET['url'];
	$count_check = 1;
	$checking = true;
	while ($checking == true) {
		$query = mysqli_query($conn, "SELECT * FROM ads ORDER BY RAND() LIMIT 1");
		$fetch = mysqli_fetch_array($query);
		$id = $fetch['id'];
		$check_query = mysqli_query($conn, "SELECT id FROM forbidden_links WHERE ad_id = '$id'");
		if (mysqli_num_rows($check_query) > 0) {
			if ($count_check < 4) {
				$checking = true;
			} else {
				$checking = false;
				$id = "no ads";
			}
		} else {
			$checking = false;
			$img = $fetch['image'];
			$link = $fetch['ad_link'];
		}
		$count_check++;
	}

	if ($id == "no ads") {
		$data = ['found' => 'false'];
	} else {
		$data = ['found' => 'true', 'link' => $link, 'img' => $img];
	}
	header('Content-type: application/json');
	echo json_encode($data);
} else {
	$data = ['found' => 'false'];
	header('Content-type: application/json');
	echo json_encode($data);
}
