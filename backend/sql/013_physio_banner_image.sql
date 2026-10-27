USE pamban_home_care;

-- Background image for the blue banner of the Physiotherapy section
ALTER TABLE physiotherapy_sections
  ADD COLUMN banner_image_url VARCHAR(255) NULL AFTER banner_button_link;
