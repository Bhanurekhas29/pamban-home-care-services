USE pamban_home_care;

-- Also created automatically on backend start; run this only if you prefer Workbench
CREATE TABLE IF NOT EXISTS hero_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eyebrow VARCHAR(150),
  heading TEXT,
  description TEXT,
  background_image_url VARCHAR(255),
  primary_btn_label VARCHAR(60),
  primary_btn_link VARCHAR(255),
  secondary_btn_label VARCHAR(60),
  secondary_btn_link VARCHAR(255),
  features JSON,
  card_icon VARCHAR(60),
  card_tagline VARCHAR(100),
  card_heading VARCHAR(100),
  card_highlight VARCHAR(100),
  card_description TEXT,
  options JSON,
  card_footer VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
