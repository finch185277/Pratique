<?php

$servername = "localhost";
$username = "thdl";
$password = "thdl";
$dbname = "odsky";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM `metadata` LIMIT 17;";
$result = $conn->query($sql);

$rows = array();
while($row = mysqli_fetch_assoc($result)) {
	$rows[] = $row;
}

header("Content-type: application/json;");
echo json_encode($rows);
$conn->close();
