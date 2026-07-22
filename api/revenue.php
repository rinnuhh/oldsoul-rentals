<?php
// ── Revenue Endpoint: GET /api/revenue.php ───────────────────
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();
$db = getDB();

$year = (int)($_GET['year'] ?? date('Y'));

$stmt = $db->prepare("SELECT month_name, month_year, revenue, bookings_count FROM revenue_monthly WHERE month_year = ? ORDER BY id ASC");
$stmt->execute([$year]);
$rows = $stmt->fetchAll();

$data = array_map(function($r) {
    return [
        'month'    => $r['month_name'],
        'year'     => (int)$r['month_year'],
        'revenue'  => (float)$r['revenue'],
        'bookings' => (int)$r['bookings_count'],
    ];
}, $rows);

jsonResponse(['success' => true, 'data' => $data]);
