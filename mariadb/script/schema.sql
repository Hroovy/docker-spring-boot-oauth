CREATE DATABASE oauth2 COLLATE 'utf8_bin';

use oauth2;

create table oauth_client_details (
  client_id VARCHAR(256) PRIMARY KEY,
  resource_ids VARCHAR(256),
  client_secret VARCHAR(256),
  scope VARCHAR(256),
  authorized_grant_types VARCHAR(256),
  web_server_redirect_uri VARCHAR(256),
  authorities VARCHAR(256),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information VARCHAR(4096),
  autoapprove VARCHAR(256)
);

create table oauth_client_token (
  token_id VARCHAR(256),
  token LONGBLOB,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256)
);

create table oauth_access_token (
  token_id VARCHAR(256),
  token LONGBLOB,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256),
  authentication LONGBLOB,
  refresh_token VARCHAR(256)
);

create table oauth_refresh_token (
  token_id VARCHAR(256),
  token LONGBLOB,
  authentication LONGBLOB
);

create table oauth_code (
  code VARCHAR(256), authentication LONGBLOB
);

create table oauth_approvals (
	userId VARCHAR(256),
	clientId VARCHAR(256),
	scope VARCHAR(256),
	status VARCHAR(10),
	expiresAt DATETIME,
	lastModifiedAt DATETIME
);


create table app_user (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  username varchar(256) NOT NULL,
  password varchar(256) NOT NULL,
  email varchar(256) DEFAULT NULL,
  PRIMARY KEY (id)
);

create table app_user_role(
  id bigint(20) NOT NULL AUTO_INCREMENT,
  username varchar(256) NOT NULL,
  app_id varchar(256) NOT NULL,
  app_role varchar(256) NOT NULL,
  PRIMARY KEY (id)
);

create table app_user_acting (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  from_date datetime NOT NULL,
  to_date datetime NOT NULL,
  username varchar(256) NOT NULL,
  acting_for_username varchar(256) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE SPRING_SESSION (
	PRIMARY_ID CHAR(36) NOT NULL,
	SESSION_ID CHAR(36) NOT NULL,
	CREATION_TIME BIGINT NOT NULL,
	LAST_ACCESS_TIME BIGINT NOT NULL,
	MAX_INACTIVE_INTERVAL INT NOT NULL,
	EXPIRY_TIME BIGINT NOT NULL,
	PRINCIPAL_NAME VARCHAR(100),
	CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);

CREATE TABLE SPRING_SESSION_ATTRIBUTES (
	SESSION_PRIMARY_ID CHAR(36) NOT NULL,
	ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
	ATTRIBUTE_BYTES BLOB NOT NULL,
	CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
	CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

insert into oauth_client_details(client_id, resource_ids, client_secret, scope, authorized_grant_types, authorities, access_token_validity, refresh_token_validity)
 values ('spring-security-oauth2-read-client', 'resource-server-rest-api',
   /*spring-security-oauth2-read-client-password1234*/'$2a$04$WGq2P9egiOYoOFemBRfsiO9qTcyJtNRnPKNBl5tokP7IP.eZn93km',
	  'read', 'password,authorization_code,refresh_token,implicit', 'user', 10800, 2592000);


insert into oauth_client_details(client_id, resource_ids, client_secret, scope, authorized_grant_types, authorities, access_token_validity, refresh_token_validity,
  web_server_redirect_uri)
 values ('spring-security-oauth2-read-write-client', 'resource-server-rest-api',
  /*spring-security-oauth2-read-write-client-password1234*/'$2a$04$soeOR.QFmClXeFIrhJVLWOQxfHjsJLSpWrU1iGxcMGdu.a5hvfY4W',
	 'read,write,full_user_list', 'password,authorization_code,refresh_token,implicit,client_credentials', 'user', 10800, 2592000,
   'http://localhost:8080/login/oauth2/code/my-client-2,'
   );


INSERT INTO app_user (id, username, password, email) VALUES (1,	'john',	/*456*/'$2a$10$cNwLajdYxWN6ao1ynC0PBugoJqTr2krISx1FFEQ2n8eXX5S.5OW2y',	'test@localhost.com');
INSERT INTO app_user (id, username, password, email) VALUES (2, 'john2', /*456*/'$2a$10$cNwLajdYxWN6ao1ynC0PBugoJqTr2krISx1FFEQ2n8eXX5S.5OW2y', 'test2@localhost.com');
INSERT INTO app_user_role (id, username, app_id, app_role) VALUES (1, 'john', 'spring-security-oauth2-read-write-client',  'readwriteclient');
INSERT INTO app_user_acting (id, from_date, to_date, username, acting_for_username) VALUES (1, '2019-03-22 00:00:00',  '2019-04-22 23:59:59',  'john2',  'john');
INSERT INTO app_user_acting (id, from_date, to_date, username, acting_for_username) VALUES (2, CURDATE(),  DATE_ADD(CURDATE(), INTERVAL 31 DAY),  'john2',  'john');

create view acting_role as
select acting.from_date, acting.to_date, acting.username, acting.acting_for_username, app_user_role.app_id, app_user_role.app_role
from app_user_acting acting, app_user_role
where acting.acting_for_username = app_user_role.username
and acting.to_date >= CURDATE()
