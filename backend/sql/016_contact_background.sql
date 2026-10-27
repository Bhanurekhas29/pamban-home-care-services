USE pamban_home_care;

-- Background picture behind the whole Contact Us section
-- (background_overlay = optional soft white layer over it, for ordinary photos)
ALTER TABLE contact_sections
  ADD COLUMN background_image_url VARCHAR(255) NULL,
  ADD COLUMN background_overlay TINYINT(1) DEFAULT 0;
