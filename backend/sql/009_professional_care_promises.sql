USE pamban_home_care;

-- Both tables are also created automatically on backend start; run this only if you prefer Workbench
CREATE TABLE IF NOT EXISTS professional_care_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  is_visible TINYINT(1) DEFAULT 1,
  eyebrow VARCHAR(100),
  heading TEXT,
  description TEXT,
  image_url VARCHAR(255),
  button_label VARCHAR(60),
  button_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS promises_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  is_visible TINYINT(1) DEFAULT 1,
  eyebrow VARCHAR(100),
  heading TEXT,
  description TEXT,
  items JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
