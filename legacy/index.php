<?php
include "./admin/controllers.php";

$reqMethod = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($reqMethod === 'POST') {
    switch ($action) {
        case 'login':
            loginUser();
            break;
        case 'logout':
            logout();
            break;
        case 'createVehicle':
            createVehicle();
            break;
        case 'getVehicles':
            getVehicles();
            break;
        case 'editVehicle':
            editVehicle();
            break;
        case 'deleteVehicles':
            deleteVehicles();
            break;
        case 'dashboard':
            showDashboard();
            break;
        case 'countVehicles':
            countVehicles();
            break;
        case 'contact':
            contact();
            break;
        default:
            header("Location: home.php");
            break;
    }
} else {
    switch ($action) {
        case 'login':
            include './admin/login.php';
            break;
        case 'viewVehicles':
            include './admin/Vehicles/viewVehicles.php';
            break;
        case 'dashboard':
            include './admin/dashboard.php';
            break;
        case 'contact':
            include 'home.php';
        default:
            include 'home.php';
            break;
    }
}
