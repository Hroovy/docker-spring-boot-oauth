use oauth2;

ALTER TABLE `app_user`
ADD `display_name` varchar(256) NULL AFTER `email`;