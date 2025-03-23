<?php
error_log("Script started");
error_log("Form submission received: " . print_r($_POST, true));

// Function definitions
function containsSpamPattern($string) {
    // ... (keep your existing function)
}

function checkSubmissionLimit($ip) {
    // ... (keep your existing function)
}

// Main form processing
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    error_log("POST request received");

    // Check honeypot

    if (!empty($_POST['honey'])) {
        error_log("Honeypot triggered");
        die('Bot detected');
    }


    // Check submission limit
    /*
function checkSubmissionLimit($ip) {
    error_log("Checking submission limit for IP: $ip");

    // Replace this with your method to get submission timestamps for the given IP
    $submissions = getSubmissionTimestampsForIp($ip); // Array of submission timestamps

    // Filter out submissions older than 1 minutes (300 seconds)
    $five_minutes_ago = time() - 60;
    $recent_submissions = array_filter($submissions, function($timestamp) use ($five_minutes_ago) {
        return $timestamp > $five_minutes_ago;
    });

    error_log("Recent submission count for IP: " . count($recent_submissions));

    // Assuming the limit is 3 submissions per 5 minutes
    if (count($recent_submissions) >= 3) {
        error_log("Submission limit exceeded for IP: $ip");
        return false;
    }

    error_log("Submission limit not exceeded for IP: $ip");
    return true;
}
    */

    // Verify reCAPTCHA
    
    $recaptcha_secret = "6LdMRV4qAAAAAIo_gH22YLwFo2q6s5R2rsp6TVrz";
    $recaptcha_response = $_POST['g-recaptcha-response'] ?? '';
    
    if (empty($recaptcha_response)) {
        error_log("reCAPTCHA response is empty");
        die('reCAPTCHA verification failed');
    }

    $verify_response = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $response_data = json_decode($verify_response);
    
    error_log("reCAPTCHA verification result: " . $verify_response);

    if (!$response_data->success || $response_data->score < 0.5) {
        error_log("reCAPTCHA verification failed. Score: " . ($response_data->score ?? 'N/A'));
        die('reCAPTCHA verification failed');
    }
    

    // Process the form
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $company = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_STRING);
    $project = filter_input(INPUT_POST, 'project', FILTER_SANITIZE_STRING);
    $service = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
    $newsletter = isset($_POST['newsletter']) ? 'Yes' : 'No';
    $contactMethod = filter_input(INPUT_POST, 'contact-method', FILTER_SANITIZE_STRING);

    error_log("Processed form data: " . print_r([
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'company' => $company,
        'project' => $project,
        'service' => $service,
        'newsletter' => $newsletter,
        'contactMethod' => $contactMethod
    ], true));

    // Check for spam patterns
    
    $spam_detected = false;
    foreach ([$name, $company, $project] as $field) {
        if (containsSpamPattern($field)) {
            error_log("Spam detected in field: $field");
            $spam_detected = true;
            break;
        }
    }
    if ($spam_detected) {
        die('Spam detected');
    }
    

    $to = "contact@strategycontent.agency";
    $subject = "New Contact Form Submission";
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nCompany: $company\nProject Details: $project\nService: $service\nNewsletter Subscription: $newsletter\nPreferred Contact Method: $contactMethod";

    $headers = "From: $email";

    error_log("Attempting to send email");
    if (mail($to, $subject, $message, $headers)) {
        error_log("Email sent successfully");
        echo 'success';
        exit;
    } else {
        $error = error_get_last();
        error_log("Failed to send email: " . ($error['message'] ?? 'Unknown error'));
        echo 'error: failed to send email';
        exit;
    }
} else {
    error_log("Invalid request method: " . $_SERVER["REQUEST_METHOD"]);
    echo 'Invalid request method';
    exit;
}
?>