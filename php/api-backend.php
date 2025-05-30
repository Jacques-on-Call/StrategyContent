<?php
// Brand Story Assessment API
// File: /api/brand-story-assessment.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection
$host = 'localhost';
$dbname = 'vpvfyjydzt_strategycontent_db';
$username = 'your_db_username'; // Replace with actual username
$password = 'your_db_password'; // Replace with actual password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Get request method and endpoint
$method = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

switch($method) {
    case 'POST':
        handlePost($pdo, $endpoint);
        break;
    case 'GET':
        handleGet($pdo, $endpoint);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function handlePost($pdo, $endpoint) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    switch($endpoint) {
        case 'start':
            startSession($pdo, $input);
            break;
        case 'answer':
            saveAnswer($pdo, $input);
            break;
        case 'complete':
            completeAssessment($pdo, $input);
            break;
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
}

function handleGet($pdo, $endpoint) {
    switch($endpoint) {
        case 'resume':
            resumeSession($pdo, $_GET['token']);
            break;
        case 'result':
            getResult($pdo, $_GET['token'], $_GET['component']);
            break;
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
}

function startSession($pdo, $input) {
    $token = generateSessionToken();
    $source_page = isset($input['source_page']) ? $input['source_page'] : '';
    $referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    $ip_address = $_SERVER['REMOTE_ADDR'];
    
    $stmt = $pdo->prepare("
        INSERT INTO brand_story_sessions 
        (session_token, source_page, referrer, user_agent, ip_address, created_at, last_active) 
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    ");
    
    try {
        $stmt->execute([$token, $source_page, $referrer, $user_agent, $ip_address]);
        echo json_encode([
            'success' => true,
            'session_token' => $token,
            'message' => 'Session started successfully'
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create session']);
    }
}

function saveAnswer($pdo, $input) {
    $token = $input['session_token'];
    $component = $input['component_number'];
    $question_id = $input['question_id'];
    $answer_value = json_encode($input['answer_value']);
    $answer_score = $input['answer_score'];
    
    // Update last active
    updateLastActive($pdo, $token);
    
    $stmt = $pdo->prepare("
        INSERT INTO brand_story_responses 
        (session_token, component_number, question_id, answer_value, answer_score, completed_at) 
        VALUES (?, ?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE 
        answer_value = VALUES(answer_value), 
        answer_score = VALUES(answer_score), 
        completed_at = NOW()
    ");
    
    try {
        $stmt->execute([$token, $component, $question_id, $answer_value, $answer_score]);
        
        // Calculate component progress
        $progress = calculateProgress($pdo, $token, $component);
        
        echo json_encode([
            'success' => true,
            'progress' => $progress,
            'next_questions' => getNextQuestions($pdo, $token, $component)
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save answer']);
    }
}

function resumeSession($pdo, $token) {
    $stmt = $pdo->prepare("
        SELECT * FROM brand_story_sessions 
        WHERE session_token = ? AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    $stmt->execute([$token]);
    $session = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$session) {
        http_response_code(404);
        echo json_encode(['error' => 'Session not found or expired']);
        return;
    }
    
    // Get current progress
    $progress = getCurrentProgress($pdo, $token);
    
    // Update last active
    updateLastActive($pdo, $token);
    
    echo json_encode([
        'success' => true,
        'session' => $session,
        'progress' => $progress
    ]);
}

function getResult($pdo, $token, $component) {
    $stmt = $pdo->prepare("
        SELECT * FROM brand_story_results 
        WHERE session_token = ? AND component_number = ?
    ");
    $stmt->execute([$token, $component]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'result' => json_decode($result['result_data'], true)
        ]);
    } else {
        // Generate result from responses
        $generatedResult = generateComponentResult($pdo, $token, $component);
        echo json_encode([
            'success' => true,
            'result' => $generatedResult
        ]);
    }
}

function completeAssessment($pdo, $input) {
    $token = $input['session_token'];
    
    // Generate final results and store
    $finalResults = generateFinalResults($pdo, $token);
    
    $stmt = $pdo->prepare("
        UPDATE brand_story_sessions 
        SET completed = 1, completed_at = NOW() 
        WHERE session_token = ?
    ");
    $stmt->execute([$token]);
    
    echo json_encode([
        'success' => true,
        'final_results' => $finalResults,
        'share_url' => generateShareUrl($token)
    ]);
}

// Helper functions
function generateSessionToken() {
    return 'bs_' . bin2hex(random_bytes(16));
}

function updateLastActive($pdo, $token) {
    $stmt = $pdo->prepare("UPDATE brand_story_sessions SET last_active = NOW() WHERE session_token = ?");
    $stmt->execute([$token]);
}

function calculateProgress($pdo, $token, $component) {
    $stmt = $pdo->prepare("
        SELECT component_number, COUNT(*) as answered 
        FROM brand_story_responses 
        WHERE session_token = ? 
        GROUP BY component_number
    ");
    $stmt->execute([$token]);
    $progress = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return [
        'current_component' => $component,
        'components_progress' => $progress,
        'overall_percentage' => calculateOverallPercentage($progress)
    ];
}

function getNextQuestions($pdo, $token, $component) {
    // Logic for dynamic question branching based on previous answers
    $stmt = $pdo->prepare("
        SELECT * FROM brand_story_responses 
        WHERE session_token = ? AND component_number = ?
    ");
    $stmt->execute([$token, $component]);
    $responses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Return personalized next questions based on scoring
    return determineNextQuestions($responses, $component);
}

function getCurrentProgress($pdo, $token) {
    $stmt = $pdo->prepare("
        SELECT MAX(component_number) as last_component,
               COUNT(DISTINCT component_number) as completed_components
        FROM brand_story_responses 
        WHERE session_token = ?
    ");
    $stmt->execute([$token]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function generateComponentResult($pdo, $token, $component) {
    // Get all responses for this component
    $stmt = $pdo->prepare("
        SELECT * FROM brand_story_responses 
        WHERE session_token = ? AND component_number = ?
    ");
    $stmt->execute([$token, $component]);
    $responses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Component-specific result generation
    switch($component) {
        case 1:
            return generateAuthorityResult($responses);
        case 2:
            return generateResonanceResult($responses);
        case 3:
            return generatePresenceResult($responses);
        case 4:
            return generateAuthenticityResult($responses);
        case 5:
            return generateBlueprintResult($responses);
        default:
            return ['error' => 'Invalid component'];
    }
}

function generateAuthorityResult($responses) {
    // Calculate maturity level and generate result
    $totalScore = array_sum(array_column($responses, 'answer_score'));
    $level = determineAuthorityLevel($totalScore);
    
    return [
        'component' => 1,
        'level' => $level,
        'score' => $totalScore,
        'visual_config' => getAuthorityVisualConfig($level),
        'next_component_hint' => getAuthorityNextHint($level)
    ];
}

function generateFinalResults($pdo, $token) {
    // Aggregate all component results
    $stmt = $pdo->prepare("
        SELECT component_number, answer_value, answer_score 
        FROM brand_story_responses 
        WHERE session_token = ? 
        ORDER BY component_number, completed_at
    ");
    $stmt->execute([$token]);
    $allResponses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return [
        'overall_profile' => calculateOverallProfile($allResponses),
        'component_results' => generateAllComponentResults($allResponses),
        'recommendations' => generatePersonalizedRecommendations($allResponses),
        'action_plan' => generateActionPlan($allResponses)
    ];
}

// Additional helper functions for specific logic...
function determineAuthorityLevel($score) {
    if ($score <= 2) return 'Story Seeker';
    if ($score <= 4) return 'Story Crafter';
    if ($score <= 6) return 'Story Teller';
    if ($score <= 8) return 'Story Connector';
    return 'Story Master';
}

function getAuthorityVisualConfig($level) {
    $configs = [
        'Story Seeker' => ['color' => '#FF6B6B', 'icon' => 'search', 'position' => 1],
        'Story Crafter' => ['color' => '#4ECDC4', 'icon' => 'edit', 'position' => 2],
        'Story Teller' => ['color' => '#45B7D1', 'icon' => 'megaphone', 'position' => 3],
        'Story Connector' => ['color' => '#96CEB4', 'icon' => 'link', 'position' => 4],
        'Story Master' => ['color' => '#FFEAA7', 'icon' => 'crown', 'position' => 5]
    ];
    return $configs[$level];
}

function calculateOverallPercentage($progress) {
    $totalQuestions = 15; // Adjust based on your total questions
    $answeredQuestions = array_sum(array_column($progress, 'answered'));
    return round(($answeredQuestions / $totalQuestions) * 100);
}

// More helper functions as needed...

?>
