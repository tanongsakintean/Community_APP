<?php
$ServerName = "localhost";
$username = "root";
$password = "root";
$db = "DB_community";


$conn = new mysqli($ServerName, $username, $password, $db);
$conn->set_charset('utf8mb4');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
