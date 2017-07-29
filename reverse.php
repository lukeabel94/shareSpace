<?php
 include ('dbConnect.php');

if (isset($_GET['term'])){
    $return_arr = array();
    try {
        $pdo = connect();
        $sql = "SELECT name FROM plant WHERE name LIKE :term";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array('term' => $_GET['term'].'%'));
        while($row = $stmt->fetch()) {
                $return_arr[] =  $row['name'];
        }
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
    echo json_encode($return_arr);
    //echo $return_arr;
}
?>