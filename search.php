<?php
 include ('dbConnect.php');

$lat = $_GET["latitude"];
$long = $_GET["longitude"];
$seas = $_GET["season"];

try {
    $pdo = connect();
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

$sql = "SELECT p.plantKey, p.name, p.scientific, p.planting, p.growing, p.pests, p.harvesting, p.info
FROM conditions as c, plant AS p, zone AS z, seasons AS s
WHERE c.plantKey = p.plantKey
  AND c.zoneID = z.zoneID
  AND c.seasonKey = s.seasonKey
  AND s.seasonKey = ?
  AND ST_Intersects(ST_SetSRID(ST_MakePoint(?, ?),4326), geom)";

$stmt = $pdo->prepare($sql);

$stmt->execute([$seas, $long, $lat]);

while ($row = $stmt->fetch()) {
      $ID = $row['plantKey'];
      $name = $row['name'];
      $scien = $row['scientific'];
      $planting = $row['planting'];
      $growing = $row['growing'];
      $pests = $row['pests'];
      $harvest = $row['harvesting'];
      $info = $row['info'];


      // Create the search results
      echo "<a href='#modal$name' class='result-link' data-toggle='modal'>";
      echo "<div class='results_item'>";
      echo "<img class='plant-img' src='img/plants/$name.png'>";
      echo "<div class='plant_name'>$name</div></div></a>";

      //Create the modal
      echo "<div class='result-modal modal fade' id='modal$name' role='dialog' aria-hidden='true'>";
      echo "<div class='modal-content'><div class='close-modal' data-dismiss='modal'>";
      echo "<div class='lr'><div class='rl'></div></div></div>";
      echo "<div class='container'><div class='modal-body'>";
      echo "<img class='modalImage' src='img/plants/$name.png'><h2>$name</h2><hr>";
      echo "<h4><i>$scien</i></h4><br><h5>General</h5><p>$info</p><h5>Planting</h5><p>$planting</p><h5>Growing</h5><p>$growing</p>";
      echo "<h5>Pests</h5><p>$pests</p><h5>Harvesting</h5><p>$harvest</p>";
      echo "</div></div></div></div>";
}
 ?>