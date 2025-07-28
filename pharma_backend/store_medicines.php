<?php
// store_medicines.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$host = "localhost";
$username = "root";
$password = "";
$dbname = "pharmacy_db";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "DB Connection Failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

foreach ($data as $medicine) {
    $name = $conn->real_escape_string($medicine['title']);
    $brand = "Dummy Brand";
    $composition = $conn->real_escape_string($medicine['description']);
    $price = $conn->real_escape_string($medicine['price']);
    $stock = 100;
    $image = $conn->real_escape_string($medicine['thumbnail']);

    $sql = "INSERT INTO medicines (name, brand, composition, price, stock, image)
            VALUES ('$name', '$brand', '$composition', '$price', '$stock', '$image')
            ON DUPLICATE KEY UPDATE
            brand='$brand', composition='$composition', price='$price', stock='$stock', image='$image'";

    $conn->query($sql);
}

echo json_encode(["message" => "Medicines stored successfully"]);

$conn->close();