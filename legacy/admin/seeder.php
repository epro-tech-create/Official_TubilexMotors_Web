<?php

include 'connection.php';

// create Admin Account
if ($conn) {
    $hash = password_hash(getenv('LEGACY_ADMIN_PASSWORD'), PASSWORD_DEFAULT);
    $username = 'tubilex motors';
    $email = 'tubilexmotorslimited@gmail.com';
    $role = 'admin';
    $sql = "INSERT INTO admin ( username, email, password, role) VALUES ('$username','$email', '$hash', '$role')";
    $stmt = $conn->prepare($sql);
    try {
        $exc = $stmt->execute();
        echo "Admin Account Created Successfully";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Database Connection Failed";
}
