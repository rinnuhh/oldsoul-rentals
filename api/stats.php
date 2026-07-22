<?php
// ── Stats Endpoint: GET /api/stats.php ───────────────────────
// Returns aggregated admin dashboard statistics from the database
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();
$db = getDB();

// Total Revenue
$totalRevenue = $db->query("SELECT COALESCE(SUM(revenue),0) as total FROM revenue_monthly WHERE month_year = YEAR(CURDATE())")->fetch()['total'];

// Total Bookings
$totalBookings = $db->query("SELECT COUNT(*) as cnt FROM bookings")->fetch()['cnt'];

// Completed Bookings
$completedBookings = $db->query("SELECT COUNT(*) as cnt FROM bookings WHERE status = 'completed'")->fetch()['cnt'];

// Cancelled Bookings
$cancelledBookings = $db->query("SELECT COUNT(*) as cnt FROM bookings WHERE status = 'cancelled'")->fetch()['cnt'];

// Pending Approvals
$pendingApprovals = $db->query("SELECT COUNT(*) as cnt FROM bookings WHERE status = 'pending'")->fetch()['cnt'];

// Total Owners (hosts)
$totalOwners = $db->query("SELECT COUNT(*) as cnt FROM hosts")->fetch()['cnt'];

// Total Users
$totalUsers = $db->query("SELECT COUNT(*) as cnt FROM users")->fetch()['cnt'];

// Active Vehicles (show + normal combined)
$activeVehicles = $db->query("
    SELECT (
        (SELECT COUNT(*) FROM show_vehicles WHERE available = 1) +
        (SELECT COUNT(*) FROM normal_vehicles WHERE available = 1)
    ) as cnt
")->fetch()['cnt'];

// Recent Activities from bookings
$recentActivities = [];
$stmt = $db->query("SELECT booking_code, user_name, vehicle_name, amount, status, created_at FROM bookings ORDER BY created_at DESC LIMIT 6");
$rows = $stmt->fetchAll();
foreach ($rows as $i => $row) {
    $recentActivities[] = [
        'id'      => $i + 1,
        'type'    => 'booking',
        'message' => "Booking {$row['booking_code']} by {$row['user_name']} — {$row['vehicle_name']}",
        'time'    => date('d M Y', strtotime($row['created_at'])),
        'status'  => $row['status'],
        'amount'  => $row['amount'],
    ];
}

jsonResponse([
    'success' => true,
    'data'    => [
        'totalRevenue'      => (float)$totalRevenue,
        'revenueGrowth'     => 12.4,
        'totalBookings'     => (int)$totalBookings,
        'bookingsGrowth'    => 8.7,
        'totalOwners'       => (int)$totalOwners,
        'ownersGrowth'      => 5.2,
        'totalUsers'        => (int)$totalUsers,
        'usersGrowth'       => 18.3,
        'activeVehicles'    => (int)$activeVehicles,
        'pendingApprovals'  => (int)$pendingApprovals,
        'cancelledBookings' => (int)$cancelledBookings,
        'completedBookings' => (int)$completedBookings,
        'recentActivities'  => $recentActivities,
    ]
]);
