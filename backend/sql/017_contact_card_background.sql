USE pamban_home_care;

-- Picture behind the blue "Get in touch" card of the Contact Us section
ALTER TABLE contact_sections
  ADD COLUMN info_background_url VARCHAR(255) NULL AFTER background_overlay;
