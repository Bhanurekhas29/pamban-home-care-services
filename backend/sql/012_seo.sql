USE pamban_home_care;

-- Also created automatically on backend start; run this only if you prefer Workbench
CREATE TABLE IF NOT EXISTS seo_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
