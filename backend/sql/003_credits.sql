USE pamban_home_care;

ALTER TABLE site_settings
  ADD COLUMN show_credit TINYINT(1) DEFAULT 1,
  ADD COLUMN credit_text VARCHAR(150) DEFAULT 'Designed & Developed by Vetri IT Systems',
  ADD COLUMN credit_url VARCHAR(255) NULL;
