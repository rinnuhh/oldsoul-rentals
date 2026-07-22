<?php
// ── Vehicles Endpoint: GET /api/vehicles.php ─────────────────
// ?type=show          → all show vehicles
// ?type=normal        → all normal vehicles
// ?type=show&id=3     → single show vehicle
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();

$db   = getDB();
$type = $_GET['type'] ?? 'show';
$id   = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($type === 'normal') {
    // ── Normal Vehicles ─────────────────────────────────────
    if ($id) {
        $stmt = $db->prepare("SELECT * FROM normal_vehicles WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $v = $stmt->fetch();
        if (!$v) errorResponse('Vehicle not found', 404);
        $v['features']  = json_decode($v['features'],  true) ?? [];
        $v['available'] = (bool)$v['available'];
        jsonResponse(['success' => true, 'data' => $v]);
    }

    $stmt = $db->query("SELECT * FROM normal_vehicles ORDER BY id ASC");
    $vehicles = $stmt->fetchAll();
    foreach ($vehicles as &$v) {
        $v['features']  = json_decode($v['features'],  true) ?? [];
        $v['available'] = (bool)$v['available'];
        // Map DB columns to frontend field names
        $v['image']       = $v['image_url'];
        $v['pricePerDay'] = (float)$v['price_per_day'];
        $v['pricePerKm']  = (float)$v['price_per_km'];
    }
    jsonResponse(['success' => true, 'data' => $vehicles]);

} else {
    // ── Show Vehicles ───────────────────────────────────────
    if ($id) {
        $stmt = $db->prepare("SELECT * FROM show_vehicles WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $v = $stmt->fetch();
        if (!$v) errorResponse('Vehicle not found', 404);
        $v['tags']      = json_decode($v['tags'],      true) ?? [];
        $v['verified']  = (bool)$v['verified'];
        $v['available'] = (bool)$v['available'];
        jsonResponse(['success' => true, 'data' => $v]);
    }

    $stmt = $db->query("SELECT * FROM show_vehicles ORDER BY id ASC");
    $vehicles = $stmt->fetchAll();
    foreach ($vehicles as &$v) {
        $v['tags']        = json_decode($v['tags'],      true) ?? [];
        $v['verified']    = (bool)$v['verified'];
        $v['available']   = (bool)$v['available'];
        // Map DB columns to frontend field names
        $v['image']       = $v['image_url'];
        $v['name']        = $v['name'];
        $v['categoryLabel'] = $v['category_label'];
        $v['pricePerDay'] = (float)$v['price_per_day'];
        $v['reviews']     = (int)$v['reviews_count'];
    }
    jsonResponse(['success' => true, 'data' => $vehicles]);
}
