#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE authorization_server;
    \connect authorization_server;
    CREATE TABLE oauth2_authorization (
        id varchar(100) NOT NULL,
        registered_client_id varchar(100) NOT NULL,
        principal_name varchar(200) NOT NULL,
        authorization_grant_type varchar(100) NOT NULL,
        attributes text DEFAULT NULL,
        state varchar(500) DEFAULT NULL,
        authorization_code_value text DEFAULT NULL,
        authorization_code_issued_at timestamp DEFAULT NULL,
        authorization_code_expires_at timestamp DEFAULT NULL,
        authorization_code_metadata text DEFAULT NULL,
        access_token_value text DEFAULT NULL,
        access_token_issued_at timestamp DEFAULT NULL,
        access_token_expires_at timestamp DEFAULT NULL,
        access_token_metadata text DEFAULT NULL,
        access_token_type varchar(100) DEFAULT NULL,
        access_token_scopes varchar(1000) DEFAULT NULL,
        oidc_id_token_value text DEFAULT NULL,
        oidc_id_token_issued_at timestamp DEFAULT NULL,
        oidc_id_token_expires_at timestamp DEFAULT NULL,
        oidc_id_token_metadata text DEFAULT NULL,
        refresh_token_value text DEFAULT NULL,
        refresh_token_issued_at timestamp DEFAULT NULL,
        refresh_token_expires_at timestamp DEFAULT NULL,
        refresh_token_metadata text DEFAULT NULL,
        PRIMARY KEY (id)
    );

    CREATE TABLE oauth2_authorization_consent (
        registered_client_id varchar(100) NOT NULL,
        principal_name varchar(200) NOT NULL,
        authorities varchar(1000) NOT NULL,
        PRIMARY KEY (registered_client_id, principal_name)
    );

    CREATE TABLE oauth2_registered_client (
        id varchar(100) NOT NULL,
        client_id varchar(100) NOT NULL,
        client_id_issued_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
        client_secret varchar(200) DEFAULT NULL,
        client_secret_expires_at timestamp DEFAULT NULL,
        client_name varchar(200) NOT NULL,
        client_authentication_methods varchar(1000) NOT NULL,
        authorization_grant_types varchar(1000) NOT NULL,
        redirect_uris varchar(1000) DEFAULT NULL,
        scopes varchar(1000) NOT NULL,
        client_settings varchar(2000) NOT NULL,
        token_settings varchar(2000) NOT NULL,
        PRIMARY KEY (id)
    );

    INSERT INTO "oauth2_registered_client" ("id", "client_id", "client_id_issued_at", "client_secret", "client_secret_expires_at", "client_name", "client_authentication_methods", "authorization_grant_types", "redirect_uris", "scopes", "client_settings", "token_settings") VALUES
    ('c1806ab9-d4eb-48ca-9956-4c74ab0d3b7f',	'messaging-client',	'2022-04-25 16:44:07.234125',	'{noop}secret',	NULL,	'c1806ab9-d4eb-48ca-9956-4c74ab0d3b7f',	'client_secret_basic',	'refresh_token,client_credentials,authorization_code',	'http://127.0.0.1:8080/authorized,http://127.0.0.1:8080/login/oauth2/code/messaging-client-oidc',	'openid,message.read,message.write',	'{"@class":"java.util.Collections$UnmodifiableMap","settings.client.require-proof-key":false,"settings.client.require-authorization-consent":true}',	'{"@class":"java.util.Collections$UnmodifiableMap","settings.token.reuse-refresh-tokens":true,"settings.token.id-token-signature-algorithm":["org.springframework.security.oauth2.jose.jws.SignatureAlgorithm","RS256"],"settings.token.access-token-time-to-live":["java.time.Duration",300.000000000],"settings.token.access-token-format":{"@class":"org.springframework.security.oauth2.core.OAuth2TokenFormat","value":"self-contained"},"settings.token.refresh-token-time-to-live":["java.time.Duration",3600.000000000]}');

EOSQL