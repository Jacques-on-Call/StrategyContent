CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  logo_url TEXT,
  notes TEXT
);

CREATE TABLE proposals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  summary TEXT,
  status ENUM('draft', 'signed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  hours_you FLOAT,
  hours_staff FLOAT,
  tool_cost FLOAT,
  tool_name VARCHAR(255)
);

CREATE TABLE tools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  monthly_cost FLOAT,
  usage_limit INT,
  current_usage INT
);
