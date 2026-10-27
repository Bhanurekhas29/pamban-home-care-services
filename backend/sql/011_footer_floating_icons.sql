USE pamban_home_care;

-- Both tables are also created automatically on backend start; run this only if you prefer Workbench
CREATE TABLE IF NOT EXISTS footer_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  about_text TEXT,
  social_links JSON,
  quick_links_heading VARCHAR(60),
  quick_links JSON,
  services_heading VARCHAR(60),
  physio_heading VARCHAR(60),
  contact_heading VARCHAR(60),
  copyright_text VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS floating_icons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(30) NOT NULL,
  label VARCHAR(60),
  value VARCHAR(500) NOT NULL,
  message VARCHAR(300),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
