USE pamban_home_care;

-- New fields captured by the Contact Us form
ALTER TABLE enquiries
  ADD COLUMN age INT NULL AFTER email,
  ADD COLUMN gender VARCHAR(20) NULL AFTER age,
  ADD COLUMN enquiry_type VARCHAR(30) DEFAULT 'home_care' AFTER gender,
  ADD COLUMN service_name VARCHAR(150) NULL AFTER enquiry_type;

-- These tables are also created automatically on backend start; run only if you prefer Workbench
CREATE TABLE IF NOT EXISTS how_it_works_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  is_visible TINYINT(1) DEFAULT 1,
  eyebrow VARCHAR(100),
  heading TEXT,
  description TEXT,
  items JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS google_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  is_visible TINYINT(1) DEFAULT 1,
  heading VARCHAR(150),
  description TEXT,
  image_url VARCHAR(255),
  business_name VARCHAR(150),
  rating FLOAT,
  reviews_label VARCHAR(60),
  address TEXT,
  button_label VARCHAR(80),
  button_link VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  is_visible TINYINT(1) DEFAULT 1,
  eyebrow VARCHAR(100),
  heading TEXT,
  description TEXT,
  image_url VARCHAR(255),
  info_title VARCHAR(100),
  info_text TEXT,
  items JSON,
  tab_home_care_label VARCHAR(60),
  tab_physio_label VARCHAR(60),
  submit_label VARCHAR(60),
  success_message VARCHAR(250),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
