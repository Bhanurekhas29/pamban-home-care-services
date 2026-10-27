USE pamban_home_care;

-- Also created automatically on backend start; run this only if you prefer Workbench
CREATE TABLE IF NOT EXISTS why_choose_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  is_visible TINYINT(1) DEFAULT 1,
  eyebrow VARCHAR(100),
  heading TEXT,
  description TEXT,
  items JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
