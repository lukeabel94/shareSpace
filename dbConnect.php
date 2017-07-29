<?php
function connect() {
$host = "localhost";
$user = "postgres";
$pass = "fabregas94";
$db = "postgres";
$port = 5432;
$charset = 'utf8';

/* OPTIONS
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
*/

$dsn = "pgsql:host=$host;dbname=$db";

try {
    $pdo = new PDO($dsn, $user, $pass);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

return $pdo;
}


 ?>
