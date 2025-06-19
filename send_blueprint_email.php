<?php
header('Content-Type: application/json');
// IMPORTANT: In production, change * to your specific domain for security! e.g., 'https://yourdomain.com'
// Read this from an environment variable if possible for flexibility between dev and prod.
$allowed_origin = getenv('ALLOWED_CORS_ORIGIN') ?: '*';
header('Access-Control-Allow-Origin: ' . $allowed_origin);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure this script is not accessed directly via GET or other methods
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Invalid request method. Only POST is accepted.']);
    exit();
}

// Include PHPMailer library.
// This assumes PHPMailer is installed via Composer and autoloaded,
// or that the PHPMailer class files are manually included.
// If using Composer, the path would typically be 'vendor/autoload.php'.
// Adjust the path if PHPMailer is included differently.
$phpmailer_autoload_path = __DIR__ . '/vendor/autoload.php'; // Common path if Composer is in root
if (file_exists($phpmailer_autoload_path)) {
    require $phpmailer_autoload_path;
} else {
    // Fallback or error if PHPMailer is not found - for now, log and exit
    // In a real scenario, you might have a specific path for manual inclusion.
    error_log("PHPMailer autoload not found at: " . $phpmailer_autoload_path);
    // Do not echo sensitive path info to client if possible
    echo json_encode(['success' => false, 'message' => 'Email server configuration error. Please contact support.']);
    exit();
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check for JSON decoding errors
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad Request
    error_log("Invalid JSON input: " . json_last_error_msg() . " | Raw input: " . $input);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input.']);
    exit();
}

// Sanitize and validate inputs
$userEmail = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$blueprintHtml = $data['blueprintHtml'] ?? ''; // Basic sanitization might be needed if HTML is complex or from untrusted source
// $userSelections = $data['userSelections'] ?? []; // Optional, if needed for logging or further processing

// Basic validation
if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address provided.']);
    exit();
}
if (empty($blueprintHtml)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Blueprint content is empty.']);
    exit();
}

// Securely load SMTP credentials and settings from environment variables
$smtpHost = getenv('SMTP_HOST') ?: 'mail.privateemail.com'; // Default if not set
$smtpPort = getenv('SMTP_PORT') ? (int)getenv('SMTP_PORT') : 587; // Default if not set
$smtpUsername = getenv('SMTP_USERNAME');
$smtpPassword = getenv('SMTP_PASSWORD');
$senderEmail = getenv('SENDER_EMAIL'); // e.g., no-reply@yourdomain.com
$senderName = getenv('SENDER_NAME') ?: 'Digital Impact Compass'; // Default if not set
$brandName = $data['brand_details']['brandName'] ?? 'Strategy Content Agency'; // Get from payload or default

// Check if essential SMTP settings are configured
if (empty($smtpUsername) || empty($smtpPassword) || empty($senderEmail) || empty($smtpHost)) {
    error_log("SMTP configuration is incomplete. Please check environment variables.");
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Email service is not configured correctly. Please contact support.']);
    exit();
}

$mail = new PHPMailer(true); // Enable exceptions

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    if ($smtpPort == 465) {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // More common for port 587
    }
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8'; // Ensure proper character encoding

    // Recipients
    $mail->setFrom($senderEmail, $senderName);
    $mail->addAddress($userEmail); // Send to the user's provided email
    // $mail->addReplyTo($senderEmail, $senderName); // Optional: if replies should go elsewhere

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Your Personalized Digital Impact Blueprint from ' . $brandName;

    // Construct a simple HTML wrapper for the email
    // The $blueprintHtml already contains a full HTML structure with its own styles.
    // We are sending $blueprintHtml as is because it's a complete document.
    $mail->Body = $blueprintHtml;

    // A simpler plain text alternative
    $mail->AltBody = 'Your Personalized Digital Impact Blueprint from ' . $brandName . '. Please view this email in an HTML-compatible client for best results. You can also download your blueprint from the website.';

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Blueprint sent successfully! Please check your inbox (and spam folder).']);

} catch (Exception $e) {
    error_log("Blueprint email failed for " . $userEmail . ": " . $mail->ErrorInfo . " | Exception: " . $e->getMessage());
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Failed to send blueprint due to a server error. Please try again later.']);
}

?>
