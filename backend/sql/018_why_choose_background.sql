USE pamban_home_care;

-- Background picture behind the Why Choose Us section
-- (background_overlay = optional dark layer over it, for ordinary photos)
ALTER TABLE why_choose_sections
  ADD COLUMN background_image_url VARCHAR(255) NULL,
  ADD COLUMN background_overlay TINYINT(1) DEFAULT 0;
