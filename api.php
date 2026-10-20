<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Load project-root environment settings when PHP does not receive them from the host.
$envFile = __DIR__ . '/.env';
if (is_file($envFile)) {
    $env = parse_ini_file($envFile, false, INI_SCANNER_RAW);
    if ($env === false) {
        http_response_code(500);
        die(json_encode(["error" => "File .env tidak valid"]));
    }
    foreach ($env as $key => $value) {
        if (getenv($key) === false) {
            putenv("$key=$value");
        }
    }
}

// Koneksi Database
$host = getenv('DB_HOST') ?: "localhost";
$user = getenv('DB_USER') ?: "root";
$pass = getenv('DB_PASSWORD');
$db_name = getenv('DB_NAME') ?: "u633344023_pan_ntt";
$domain = "https://panwebtes.katongpung.com";

if ($pass === false || $pass === '') {
    http_response_code(500);
    die(json_encode(["error" => "DB_PASSWORD belum dikonfigurasi"]));
}

$conn = new mysqli($host, $user, $pass, $db_name);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Koneksi database gagal"]));
}

$method = $_SERVER['REQUEST_METHOD'];
// Trik untuk bypass limitasi hosting pada PUT/DELETE
$action = isset($_GET['action']) ? $_GET['action'] : '';
$resource = isset($_GET['resource']) ? $_GET['resource'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($method == 'OPTIONS') {
    exit;
}

// --- AUTHENTICATION (LOGIN) ---
if ($action == 'login' && $method == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode(["success" => true, "token" => "mock_token_" . time()]);
    } else {
        echo json_encode(["success" => false, "error" => "Username atau password salah"]);
    }
    exit;
}

// --- SETUP DATABASE (MIGRATION) ---
if ($action == 'setup' && $method == 'GET') {
    $queries = [
        "ALTER TABLE berita ADD COLUMN kategori VARCHAR(100) DEFAULT 'Umum'",
        "ALTER TABLE dokumentasi ADD COLUMN kategori VARCHAR(100) DEFAULT 'Umum'",
        "ALTER TABLE dokumentasi ADD COLUMN image2 VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE dokumentasi ADD COLUMN image3 VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE dokumentasi ADD COLUMN image4 VARCHAR(255) DEFAULT NULL",
        "ALTER TABLE dokumentasi ADD COLUMN image5 VARCHAR(255) DEFAULT NULL"
    ];
    
    $results = [];
    foreach ($queries as $q) {
        if ($conn->query($q)) {
            $results[] = "Success: " . $q;
        } else {
            $results[] = "Error/Already Exists: " . $conn->error;
        }
    }
    echo json_encode(["status" => "Setup finished", "details" => $results]);
    exit;
}

// --- READ (GET) ---
if ($method == 'GET') {
    $sql = "";
    if ($resource == 'berita') $sql = "SELECT * FROM berita ORDER BY date DESC";
    elseif ($resource == 'dokumentasi') $sql = "SELECT * FROM dokumentasi ORDER BY id DESC";
    elseif ($resource == 'pengurus') $sql = "SELECT * FROM pengurus ORDER BY id ASC";
    elseif ($resource == 'agenda') $sql = "SELECT * FROM agenda ORDER BY date ASC";
    elseif ($resource == 'statistik') $sql = "SELECT * FROM statistik ORDER BY id ASC";
    
    if ($sql != "") {
        $result = $conn->query($sql);
        if ($result) {
            $data = [];
            while($row = $result->fetch_assoc()) $data[] = $row;
            echo json_encode($data);
        } else {
            echo json_encode(["error" => $conn->error]);
        }
    }
    exit;
}

// Helper function to handle image uploads
function handleImageUpload($fileKey, $domain, $oldImage = '') {
    $imageUrl = "";
    if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['size'] > 0) {
        $target_dir = "uploads/";
        if (!file_exists($target_dir)) mkdir($target_dir, 0777, true);
        
        // Delete old image if exists
        if ($oldImage && strpos($oldImage, $domain . '/uploads/') === 0) {
            $oldFilePath = $target_dir . basename(parse_url($oldImage, PHP_URL_PATH));
            if (file_exists($oldFilePath)) {
                @unlink($oldFilePath);
            }
        }
        
        $file_name = time() . "_" . preg_replace("/[^a-zA-Z0-9.]/", "_", basename($_FILES[$fileKey]["name"]));
        if (move_uploaded_file($_FILES[$fileKey]["tmp_name"], $target_dir . $file_name)) {
            $imageUrl = $domain . "/uploads/" . $file_name;
        }
    }
    return $imageUrl;
}

// --- WRITE (POST / UPDATE / DELETE) ---
if ($method == 'POST') {
    // 1. Handle DELETE
    if ($action == 'delete' && $id) {
        // Fetch old image first to delete file, but only for resources with images
        if (in_array($resource, ['berita', 'dokumentasi', 'pengurus'])) {
            $res = $conn->query("SELECT * FROM $resource WHERE id = $id");
            if ($res && $item = $res->fetch_assoc()) {
                $imagesToDelete = [$item['image'] ?? ''];
                if ($resource == 'dokumentasi') {
                    array_push($imagesToDelete, $item['image2'] ?? '', $item['image3'] ?? '', $item['image4'] ?? '', $item['image5'] ?? '');
                }
                
                foreach ($imagesToDelete as $oldImage) {
                    if ($oldImage && strpos($oldImage, $domain . '/uploads/') === 0) {
                        $oldFilePath = "uploads/" . basename(parse_url($oldImage, PHP_URL_PATH));
                        if (file_exists($oldFilePath)) {
                            @unlink($oldFilePath);
                        }
                    }
                }
            }
        }

        $stmt = $conn->prepare("DELETE FROM $resource WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) echo json_encode(["success" => true, "message" => "Dihapus"]);
        else echo json_encode(["error" => $conn->error]);
        exit;
    }

    // 3. Handle UPDATE (EDIT)
    if ($action == 'update' && $id) {
        if ($resource == 'berita') {
            $kategori = $_POST['kategori'] ?? 'Umum';
            $imageUrl = handleImageUpload('imageFile', $domain, $_POST['oldImage'] ?? '');
            
            if ($imageUrl != "") {
                $stmt = $conn->prepare("UPDATE berita SET title=?, excerpt=?, content=?, date=?, image=?, kategori=? WHERE id=?");
                if ($stmt) $stmt->bind_param("ssssssi", $_POST['title'], $_POST['excerpt'], $_POST['content'], $_POST['date'], $imageUrl, $kategori, $id);
            } else {
                $stmt = $conn->prepare("UPDATE berita SET title=?, excerpt=?, content=?, date=?, kategori=? WHERE id=?");
                if ($stmt) $stmt->bind_param("sssssi", $_POST['title'], $_POST['excerpt'], $_POST['content'], $_POST['date'], $kategori, $id);
            }
        } elseif ($resource == 'dokumentasi') {
            $kategori = $_POST['kategori'] ?? 'Umum';
            $imageUrl = handleImageUpload('imageFile', $domain, $_POST['oldImage'] ?? '');
            $image2 = handleImageUpload('imageFile2', $domain, $_POST['oldImage2'] ?? '');
            $image3 = handleImageUpload('imageFile3', $domain, $_POST['oldImage3'] ?? '');
            $image4 = handleImageUpload('imageFile4', $domain, $_POST['oldImage4'] ?? '');
            $image5 = handleImageUpload('imageFile5', $domain, $_POST['oldImage5'] ?? '');
            
            // Build dynamic update query for images since they are optional
            $updates = ["title=?", "kategori=?"];
            $types = "ss";
            $params = [$_POST['title'], $kategori];
            
            if ($imageUrl != "") { $updates[] = "image=?"; $types .= "s"; $params[] = $imageUrl; }
            if ($image2 != "") { $updates[] = "image2=?"; $types .= "s"; $params[] = $image2; }
            if ($image3 != "") { $updates[] = "image3=?"; $types .= "s"; $params[] = $image3; }
            if ($image4 != "") { $updates[] = "image4=?"; $types .= "s"; $params[] = $image4; }
            if ($image5 != "") { $updates[] = "image5=?"; $types .= "s"; $params[] = $image5; }
            
            $types .= "i";
            $params[] = $id;
            
            $sql = "UPDATE dokumentasi SET " . implode(", ", $updates) . " WHERE id=?";
            $stmt = $conn->prepare($sql);
            if ($stmt) {
                // Dynamically bind params
                $bind_names[] = $types;
                for ($i=0; $i<count($params); $i++) {
                    $bind_name = 'bind' . $i;
                    $$bind_name = $params[$i];
                    $bind_names[] = &$$bind_name;
                }
                call_user_func_array([$stmt, 'bind_param'], $bind_names);
            }
        } elseif ($resource == 'pengurus') {
            $imageUrl = handleImageUpload('imageFile', $domain, $_POST['oldImage'] ?? '');
            if ($imageUrl != "") {
                $stmt = $conn->prepare("UPDATE pengurus SET nama=?, jabatan=?, image=? WHERE id=?");
                if ($stmt) $stmt->bind_param("sssi", $_POST['nama'], $_POST['jabatan'], $imageUrl, $id);
            } else {
                $stmt = $conn->prepare("UPDATE pengurus SET nama=?, jabatan=? WHERE id=?");
                if ($stmt) $stmt->bind_param("ssi", $_POST['nama'], $_POST['jabatan'], $id);
            }
        } elseif ($resource == 'agenda') {
            $stmt = $conn->prepare("UPDATE agenda SET title=?, date=?, location=? WHERE id=?");
            if ($stmt) $stmt->bind_param("sssi", $_POST['title'], $_POST['date'], $_POST['location'], $id);
        } elseif ($resource == 'statistik') {
            $value = (int)$_POST['value'];
            $stmt = $conn->prepare("UPDATE statistik SET key_name=?, label=?, value=?, suffix=? WHERE id=?");
            if ($stmt) $stmt->bind_param("ssisi", $_POST['key_name'], $_POST['label'], $value, $_POST['suffix'], $id);
        }
    } 
    // 4. Handle CREATE (TAMBAH)
    else {
        if ($resource == 'berita') {
            $kategori = $_POST['kategori'] ?? 'Umum';
            $imageUrl = handleImageUpload('imageFile', $domain);
            $stmt = $conn->prepare("INSERT INTO berita (title, excerpt, content, image, date, kategori) VALUES (?, ?, ?, ?, ?, ?)");
            if ($stmt) $stmt->bind_param("ssssss", $_POST['title'], $_POST['excerpt'], $_POST['content'], $imageUrl, $_POST['date'], $kategori);
        } elseif ($resource == 'dokumentasi') {
            $kategori = $_POST['kategori'] ?? 'Umum';
            $imageUrl = handleImageUpload('imageFile', $domain);
            $image2 = handleImageUpload('imageFile2', $domain);
            $image3 = handleImageUpload('imageFile3', $domain);
            $image4 = handleImageUpload('imageFile4', $domain);
            $image5 = handleImageUpload('imageFile5', $domain);
            
            $stmt = $conn->prepare("INSERT INTO dokumentasi (title, image, kategori, image2, image3, image4, image5) VALUES (?, ?, ?, ?, ?, ?, ?)");
            if ($stmt) $stmt->bind_param("sssssss", $_POST['title'], $imageUrl, $kategori, $image2, $image3, $image4, $image5);
        } elseif ($resource == 'pengurus') {
            $imageUrl = handleImageUpload('imageFile', $domain);
            $stmt = $conn->prepare("INSERT INTO pengurus (nama, jabatan, image) VALUES (?, ?, ?)");
            if ($stmt) $stmt->bind_param("sss", $_POST['nama'], $_POST['jabatan'], $imageUrl);
        } elseif ($resource == 'agenda') {
            $stmt = $conn->prepare("INSERT INTO agenda (title, date, location) VALUES (?, ?, ?)");
            if ($stmt) $stmt->bind_param("sss", $_POST['title'], $_POST['date'], $_POST['location']);
        } elseif ($resource == 'statistik') {
            $value = (int)$_POST['value'];
            $stmt = $conn->prepare("INSERT INTO statistik (key_name, label, value, suffix) VALUES (?, ?, ?, ?)");
            if ($stmt) $stmt->bind_param("ssis", $_POST['key_name'], $_POST['label'], $value, $_POST['suffix']);
        }
    }

    if ($stmt && $stmt->execute()) echo json_encode(["success" => true]);
    else echo json_encode(["error" => isset($conn) ? $conn->error : "Stmt Error"]);
}

$conn->close();
?>
