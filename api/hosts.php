<?php
// ── Hosts Endpoint: GET /api/hosts.php ───────────────────────
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();
$db = getDB();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;

    if ($id) {
        $stmt = $db->prepare("SELECT id,host_code,name,email,phone,location,company_name,avatar_initials,total_earnings,rating,vehicles_count,status,verified,joined_date FROM hosts WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $host = $stmt->fetch();
        if (!$host) errorResponse('Host not found', 404);
        $host['verified'] = (bool)$host['verified'];
        jsonResponse(['success' => true, 'data' => $host]);
    }

    $stmt = $db->query("SELECT id,host_code,name,email,phone,location,company_name,avatar_initials,total_earnings,rating,vehicles_count,status,verified,joined_date FROM hosts ORDER BY id ASC");
    $hosts = $stmt->fetchAll();
    foreach ($hosts as &$h) {
        $h['verified'] = (bool)$h['verified'];
    }
    jsonResponse(['success' => true, 'data' => $hosts]);
}

errorResponse('Method not allowed', 405);
