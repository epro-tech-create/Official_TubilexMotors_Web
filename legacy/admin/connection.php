<?php

session_start();

function connectToDatabase()
{
    // Archived code only. The active application uses PostgreSQL via DATABASE_URL.
    $host = getenv('LEGACY_MYSQL_HOST');
    $user = getenv('LEGACY_MYSQL_USER');
    $pass = getenv('LEGACY_MYSQL_PASSWORD');
    $dbName = getenv('LEGACY_MYSQL_DATABASE');

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbName", $user, $pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        exit;
    }
}

$conn = connectToDatabase();
