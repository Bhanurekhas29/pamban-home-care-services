USE pamban_home_care;

-- Both tables are also created automatically on backend start; run this only if you prefer Workbench
CREATE TABLE IF NOT EXISTS physiotherapy_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  is_visible TINYINT(1) DEFAULT 1,
  eyebrow VARCHAR(100),
  heading TEXT,
  highlight_text VARCHAR(150),
  banner_title VARCHAR(200),
  banner_text TEXT,
  banner_button_label VARCHAR(80),
  banner_button_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS physiotherapy_treatments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  icon VARCHAR(100),
  image_url VARCHAR(255),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
