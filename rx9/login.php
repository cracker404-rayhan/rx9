<?php
// Sample login logic (you need to integrate with a database)

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Sample hardcoded credentials
    $correctUsername = "admin";
    $correctPassword = "password123";

    if ($username === $correctUsername && $password === $correctPassword) {
        echo "Welcome, " . $username;
    } else {
        echo "Invalid credentials.";
    }
}
?>
