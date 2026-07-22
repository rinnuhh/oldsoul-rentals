<?php
// ── Users Endpoint: GET /api/users.php ───────────────────────
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();
$db = getDB();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;

    if ($id) {
        $stmt = $db->prepare("SELECT id,user_code,name,email,phone,avatar_initials,total_bookings,total_spent,status,last_active,joined_date FROM users WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        if (!$user) errorResponse('User not found', 404);
        jsonResponse(['success' => true, 'data' => $user]);
    }

    $stmt = $db->query("SELECT id,user_code,name,email,phone,avatar_initials,total_bookings,total_spent,status,last_active,joined_date FROM users ORDER BY id ASC");
    $users = $stmt->fetchAll();
    jsonResponse(['success' => true, 'data' => $users]);
}

errorResponse('Method not allowed', 405);
