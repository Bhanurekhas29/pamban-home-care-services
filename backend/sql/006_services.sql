USE pamban_home_care;

ALTER TABLE services
  ADD COLUMN is_wide TINYINT(1) DEFAULT 0 AFTER image_url;

-- Also created automatically on backend start; run this only if you prefer Workbench
CREATE TABLE IF NOT EXISTS services_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  is_visible TINYINT(1) DEFAULT 1,
  eyebrow VARCHAR(100),
  heading TEXT,
  description TEXT,
  cta_text VARCHAR(200),
  cta_button_label VARCHAR(60),
  cta_button_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
