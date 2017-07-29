<?php
    include ('dbConnect.php');

    $lat = $_GET["latitude"];
    $long = $_GET["longitude"];

    $db = new MySQLDatabase(); // create a Database object
    $db->connect('admin', 'password', 'data') or die(mysql_error());
 ?>