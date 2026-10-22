<?php
include "connection.php";


function loginUser()
{
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $conn = connectToDatabase();
    $sql  = "SELECT id, password FROM admin WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['id'];
        header("Location: ?action=dashboard"); // redirect to dashboard on success
        exit;
    } else {
        header("Location: ?action=login&error=invalid"); // redirect back on failure
        exit;
    }
}

function logout()
{
    session_unset();
    session_destroy();
    echo "<script>alert('You have been logged out.'); window.location.href = '?action=login';</script>";
}

function createVehicle()
{
    $conn = connectToDatabase();

    $name = trim($_POST['name'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $category = trim($_POST['category'] ?? '');

    // 🔎 Check required fields
    if (empty($name) || empty($description) || empty($category)) {
        echo "<script>alert('❌ Please fill in all required fields (Name, Description, Category).'); window.history.back();</script>";
        return; // stop execution, don’t insert
    }


    // Handle image upload
    $imageName = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . "/uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Unique filename
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $imageName = uniqid("img_", true) . "." . strtolower($ext);
        $targetFile = $uploadDir . $imageName;

        // Validate allowed file types
        $allowedTypes = ["jpg", "jpeg", "png", "gif", "webp"];
        if (!in_array(strtolower($ext), $allowedTypes)) {
            die("Invalid file type. Allowed: JPG, PNG, GIF, WEBP.");
        }

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            die("Error uploading image.");
        }
    }

    // Insert into DB using PDO prepared statement
    $sql = "INSERT INTO vehicles (name, image, description, category) VALUES (:name, :image, :description, :category)";
    $stmt = $conn->prepare($sql);
    $success = $stmt->execute([
        ':name' => $name,
        ':image' => $imageName,
        ':description' => $description,
        ':category' => $category
    ]);

    if ($success) {
        echo "<script>
        alert('✅ Item Added successfully.');
        window.location.href='index.php?action=viewVehicles';
    </script>";
        exit();
    } else {
        echo "❌ Error inserting item.";
    }
}

function editVehicle()
{

    $conn = connectToDatabase();

    $id          = $_POST['id']; // Make sure you pass the car ID in your form (hidden input)
    $name        = trim($_POST['name']);
    $description = trim($_POST['description']);
    $category    = trim($_POST['category']);



    // 🔎 Check required fields
    if (empty($id) || empty($name) || empty($description) || empty($category)) {
        echo "<script>alert('❌ Please fill in all required fields (Name, Description, Category).'); window.history.back();</script>";
        return;
    }

    // Handle image upload
    $imageName = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . "/uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Unique filename
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $imageName = uniqid("img_", true) . "." . strtolower($ext);
        $targetFile = $uploadDir . $imageName;

        // Validate allowed file types
        $allowedTypes = ["jpg", "jpeg", "png", "gif", "webp"];
        if (!in_array(strtolower($ext), $allowedTypes)) {
            die("Invalid file type. Allowed: JPG, PNG, GIF, WEBP.");
        }

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            die("Error uploading image.");
        }

        // 📝 If new image uploaded → update with image
        $sql = "UPDATE vehicles 
                SET name = :name, image = :image, description = :description, category = :category 
                WHERE id = :id";
        $params = [
            ':name'        => $name,
            ':image'       => $imageName,
            ':description' => $description,
            ':category'    => $category,
            ':id'          => $id
        ];
    } else {
        // 📝 If no new image uploaded → update without touching image column
        $sql = "UPDATE vehicles 
                SET name = :name, description = :description, category = :category 
                WHERE id = :id";
        $params = [
            ':name'        => $name,
            ':description' => $description,
            ':category'    => $category,
            ':id'          => $id
        ];
    }

    $stmt = $conn->prepare($sql);
    $success = $stmt->execute($params);

    if ($success) {
        // echo "<script>window.history.back();</script>";
        header("Location: ../index.php?action=viewVehicles");
    } else {
        echo "❌ Error updating vehicle.";
    }
}


function getVehicles()
{
    $conn = connectToDatabase();
    $sql = "SELECT * FROM vehicles ORDER BY id DESC";
    $stmt = $conn->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function deleteVehicles()
{
    $conn = connectToDatabase();

    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        echo "<script>alert('❌ Invalid ID provided.'); window.history.back();</script>";
        exit;
    }

    $id = (int) $_GET['id']; // cast to integer to be safe

    $sql = "DELETE FROM vehicles WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $success = $stmt->execute([':id' => $id]);

    if ($success) {
        echo "<script>alert('✅ Vehicle deleted successfully.'); window.history.back();</script>";
    } else {
        echo "<script>alert('❌ Failed to delete vehicle.'); window.history.back();</script>";
    }
    exit;
}

function countVehicles()
{
    $conn = connectToDatabase();
    $sql = "SELECT COUNT(id) as total FROM vehicles";
    $stmt = $conn->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result['total'] ?? 0; // returns 0 if no vehicles
}

function countComments()
{
    $conn = connectToDatabase();
    $sql = "SELECT COUNT(id) as total FROM contact";
    $stmt = $conn->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result['total'] ?? 0;
}

function showDashboard()
{
    header("Location: admin/dashboard.php");
}

function visitors()
{
    $conn = connectToDatabase();
    $ip = $_SERVER['REMOTE_ADDR'];

    // Check if this IP already visited today
    $sqlCheck = "SELECT * FROM visitors WHERE ip_address = :ip AND DATE(visit_date) = CURDATE()";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->execute([':ip' => $ip]);

    if ($stmtCheck->rowCount() == 0) {
        // Insert new visitor
        $sqlInsert = "INSERT INTO visitors (ip_address) VALUES (:ip)";
        $stmtInsert = $conn->prepare($sqlInsert);
        $stmtInsert->execute([':ip' => $ip]);
    }

    // ✅ Correct way: count all rows in visitors table
    $sqlTotal = "SELECT COUNT(*) AS total FROM visitors";
    $stmtTotal = $conn->query($sqlTotal);
    $result = $stmtTotal->fetch(PDO::FETCH_ASSOC);

    return $result['total'] ?? 0;
}


function countVisitorsToday()
{
    $conn = connectToDatabase();
    $sql = "SELECT COUNT(*) AS total FROM visitors WHERE DATE(visit_date) = CURDATE()";
    $stmt = $conn->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result['total'] ?? 0;
}

function countVisitorsThisWeek()
{
    $conn = connectToDatabase();
    $sql = "SELECT COUNT(*) AS total 
            FROM visitors 
            WHERE YEARWEEK(visit_date, 1) = YEARWEEK(CURDATE(), 1)";
    $stmt = $conn->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result['total'] ?? 0;
}

function contact()
{
    $conn  = connectToDatabase();
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $sqlCheck = "SELECT COUNT(id) as total FROM contact WHERE email = :email";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->execute([':email' => $email]);
    $result = $stmtCheck->fetch(PDO::FETCH_ASSOC);
    if ($result['total'] > 0) {
        echo "<script>alert('❌ Email already exists. Please try again.'); window.history.back();</script>";
        exit;
    }
    $sql = "INSERT INTO contact (name, email, message) VALUES (:name, :email, :message)";
    $stmt = $conn->prepare($sql);
    $success = $stmt->execute([':name' => $name, ':email' => $email, ':message' => $message]);
    if ($success) {
        echo "<script>alert('✅ Message sent successfully.'); window.history.back();</script>";
        unset($_POST['name']);
        unset($_POST['email']);
        unset($_POST['message']);
    } else {
        echo "<script>alert('❌ Failed to send message.'); window.history.back();</script>";
    }
    exit;
}

function getComment()
{
    $conn = connectToDatabase();
    $sql = "SELECT * FROM contact ORDER BY id DESC";
    $stmt = $conn->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
