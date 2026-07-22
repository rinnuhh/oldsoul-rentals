<?php
// ── Bookings Endpoint ────────────────────────────────────────
// GET  /api/bookings.php          → all bookings (admin)
// GET  /api/bookings.php?id=BKG001 → single booking
// POST /api/bookings.php          → create booking
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();
$db = getDB();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'] ?? null;

    if ($id) {
        $stmt = $db->prepare("SELECT * FROM bookings WHERE booking_code = ? LIMIT 1");
        $stmt->execute([$id]);
        $booking = $stmt->fetch();
        if (!$booking) errorResponse('Booking not found', 404);
        jsonResponse(['success' => true, 'data' => $booking]);
    }

    // All bookings with optional filters
    $status = $_GET['status'] ?? null;
    $sql    = "SELECT * FROM bookings";
    $params = [];
    if ($status) {
        $sql .= " WHERE status = ?";
        $params[] = $status;
    }
    $sql .= " ORDER BY created_at DESC";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $bookings = $stmt->fetchAll();
    jsonResponse(['success' => true, 'data' => $bookings]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);

    $required = ['user_id', 'vehicle_name', 'vehicle_type', 'amount'];
    foreach ($required as $field) {
        if (empty($body[$field])) {
            errorResponse("Missing required field: $field");
        }
    }

    // Generate booking code
    $stmt = $db->query("SELECT COUNT(*) as cnt FROM bookings");
    $count = $stmt->fetch()['cnt'];
    $bookingCode = 'BKG' . str_pad($count + 1, 3, '0', STR_PAD_LEFT);

    // Get user name
    $stmt = $db->prepare("SELECT name FROM users WHERE id = ? LIMIT 1");
    $stmt->execute([$body['user_id']]);
    $userRow  = $stmt->fetch();
    $userName = $userRow ? $userRow['name'] : 'Guest';

    $stmt = $db->prepare("
        INSERT INTO bookings
          (booking_code, user_id, user_name, host_id, host_name, vehicle_name,
           vehicle_type, start_date, end_date, days, amount, status, payment_status, purpose)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending', ?)
    ");
    $stmt->execute([
        $bookingCode,
        $body['user_id'],
        $userName,
        $body['host_id']    ?? null,
        $body['host_name']  ?? null,
        $body['vehicle_name'],
        $body['vehicle_type'],
        $body['start_date']  ?? null,
        $body['end_date']    ?? null,
        $body['days']        ?? 1,
        $body['amount'],
        $body['purpose']    ?? '',
    ]);

    jsonResponse(['success' => true, 'booking_code' => $bookingCode, 'id' => $db->lastInsertId()], 201);
}

errorResponse('Method not allowed', 405);
