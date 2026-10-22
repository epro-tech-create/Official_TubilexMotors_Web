<?php

include __DIR__ . "/../connection.php";

$conn = connectToDatabase();
// Create table if not exists
$conn->exec("CREATE TABLE IF NOT EXISTS vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        image VARCHAR(255),
        description TEXT,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )");

echo "✅ Table check complete.<br>";

// Seeder data
$vehicles = [
    ["Toyota Corolla", "images/corolla.jpg", "Reliable sedan", "Car"],
    ["Honda Civic", "civic.jpg", "Compact car with good fuel economy", "Car"],
    ["Yamaha R1", "r1.jpg", "Superbike motorcycle", "Motorcycle"]
];

// Insert query using PDO placeholders
$sql = "INSERT INTO vehicles (name, image, description, category) 
            VALUES (:name, :image, :description, :category)";
$stmt = $conn->prepare($sql);

foreach ($vehicles as $v) {
    $stmt->execute([
        ':name' => $v[0],
        ':image' => $v[1],
        ':description' => $v[2],
        ':category' => $v[3]
    ]);
    echo "Inserted: {$v[0]}<br>";
}

echo "✅ Seeding complete.";
