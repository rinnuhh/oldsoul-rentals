<?php
// Debug test script
$raw = file_get_contents('php://input');
echo json_encode([
    'method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? '',
    'raw_len' => strlen($raw),
    'raw' => $raw,
    'post' => $_POST,
    'json' => json_decode($raw, true)
]);
