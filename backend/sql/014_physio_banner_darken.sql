USE pamban_home_care;

-- Optional dark layer over the banner picture (off = show the picture exactly as uploaded)
ALTER TABLE physiotherapy_sections
  ADD COLUMN banner_darken TINYINT(1) DEFAULT 0 AFTER banner_image_url;
