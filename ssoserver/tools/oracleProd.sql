REM INSERTING into ROLE
SET DEFINE OFF;
Insert into ROLE (FUNC_NO,APP,ROLE) values (2152,'DRS_APPOINTMENT','ADMIN');

Insert into ROLE (FUNC_NO,APP,ROLE) values (2060,'DRS_APPOINTMENT','ADMIN');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2066,'DRS_APPOINTMENT','ADMIN');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2068,'DRS_APPOINTMENT','ADMIN');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2071,'DRS_APPOINTMENT','ADMIN');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2060,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2066,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2068,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2071,'DRS_APPOINTMENT','SOCIAL_WORKER');

Insert into ROLE (FUNC_NO,APP,ROLE) values (2057,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2058,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2061,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2062,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2064,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2065,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2067,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2069,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2070,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2072,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2075,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2131,'DRS_APPOINTMENT','SOCIAL_WORKER');
Insert into ROLE (FUNC_NO,APP,ROLE) values (2140,'DRS_APPOINTMENT','SOCIAL_WORKER');


REM INSERTING into OAUTH_CLIENT_DETAILS
SET DEFINE OFF;
Insert into OAUTH_CLIENT_DETAILS (CLIENT_ID,RESOURCE_IDS,CLIENT_SECRET,SCOPE,AUTHORIZED_GRANT_TYPES,WEB_SERVER_REDIRECT_URI,AUTHORITIES,ACCESS_TOKEN_VALIDITY,REFRESH_TOKEN_VALIDITY,ADDITIONAL_INFORMATION,AUTOAPPROVE) values ('DRS_APPOINTMENT',null,'da31d9068c024e9b','user_info,full_user_list','authorization_code,refresh_token,implicit,password,client_credentials','http://localhost:8080/wrapTest/login/oauth2/code/ias-sso-client',null,3600,7200,null,'user_info,full_user_list');