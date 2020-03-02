use oauth2;

ALTER TABLE `app_user`
ADD `is_active` varchar(256) DEFAULT 'Y' AFTER `display_name`;