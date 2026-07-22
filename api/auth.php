<?php
// ── Auth Endpoint: POST /api/auth.php ────────────────────────
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method not allowed', 405);
}

// Support JSON body, standard POST data, or raw input fallback
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true);

if (!is_array($body)) {
    // If json_decode failed, check if magic quotes or quotes escaping corrupted JSON
    $cleanRaw = stripslashes($rawInput);
    $body = json_decode($cleanRaw, true);
}

if (!is_array($body) || empty($body)) {
    $body = $_POST;
}

$email    = trim($body['email']    ?? '');
$password = trim($body['password'] ?? '');
$role     = trim($body['role']     ?? 'user');

if (empty($email) || empty($password)) {
    errorResponse('Email and password are required');
}

try {
    $db = getDB();

    // ── Admin Login ──────────────────────────────────────────────
    if ($role === 'admin') {
        $stmt = $db->prepare("SELECT id, name, email, role FROM admins WHERE email = ? AND password = ? LIMIT 1");
        $stmt->execute([$email, $password]);
        $admin = $stmt->fetch();

        if ($admin) {
            jsonResponse([
                'success' => true,
                'role'    => 'admin',
                'user'    => [
                    'id'    => $admin['id'],
                    'name'  => $admin['name'],
                    'email' => $admin['email'],
                    'role'  => $admin['role'],
                ]
            ]);
        } else {
            errorResponse('Invalid admin credentials. Use admin@oldsoul.in / admin123', 401);
        }
    }

    // ── Host Login ───────────────────────────────────────────────
    if ($role === 'host') {
        $stmt = $db->prepare("SELECT id, name, email, status, verified FROM hosts WHERE email = ? AND password = ? LIMIT 1");
        $stmt->execute([$email, $password]);
        $host = $stmt->fetch();

        if ($host) {
            jsonResponse([
                'success' => true,
                'role'    => 'host',
                'user'    => [
                    'id'       => $host['id'],
                    'name'     => $host['name'],
                    'email'    => $host['email'],
                    'status'   => $host['status'],
                    'verified' => (bool)$host['verified'],
                ]
            ]);
        } else {
            errorResponse('Invalid host credentials', 401);
        }
    }

    // ── User (Customer) Login ────────────────────────────────────
    $stmt = $db->prepare("SELECT id, name, email, status FROM users WHERE email = ? AND password = ? LIMIT 1");
    $stmt->execute([$email, $password]);
    $user = $stmt->fetch();

    if ($user) {
        jsonResponse([
            'success' => true,
            'role'    => 'user',
            'user'    => [
                'id'     => $user['id'],
                'name'   => $user['name'],
                'email'  => $user['email'],
                'status' => $user['status'],
            ]
        ]);
    } else {
        errorResponse('Invalid email or password', 401);
    }
} catch (Exception $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
