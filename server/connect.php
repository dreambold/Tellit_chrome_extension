<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "extension";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// $conn->set_charset('utf8mb4');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// sql to create table
// $sql = "CREATE TABLE  comments (
// id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// username VARCHAR(30),
// email VARCHAR(50),
// url VARCHAR(500),
// comment VARCHAR(500),
// reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// like Int(20),   
// )";

// if ($conn->query($sql) === TRUE) {
//     echo "Table comments created successfully";
// } else {
//     echo "Error creating table: " . $conn->error;
// }

// $conn->close();
