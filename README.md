Build a spring boot oauth server with mysql db

## docker
linux container

    $> docker-composer up # create env
    $> docker-composer start # rerun env
    $> docker-composer stop # stop env
    $> docker-composer down # delete env


## testing command

### test user password authentication
generate access token
```bash
curl -X POST \
	http://localhost:8081/auth/oauth/token \
	-F grant_type=password \
	-F username=john \
	-F password=456 \
	-F client_id=spring-security-oauth2-read-write-client \
	-F client_secret=spring-security-oauth2-read-write-client-password1234

curl -X POST \
	http://localhost:8081/auth/oauth/token \
	-F grant_type=password \
	-F username=john \
	-F password=456 \
	-F client_id=spring-security-oauth2-read-client \
	-F client_secret=spring-security-oauth2-read-client-password1234
```

use access token to get value
```bash
curl http://localhost:8081/auth/user/me -H "Authorization: Bearer 5a428f4c-3356-41c3-9a57-ca54971d75e0"
```

revoke
```bash
curl -X POST http://localhost:8081/auth/user/revoke -H "Authorization: Bearer 5a428f4c-3356-41c3-9a57-ca54971d75e0"
```

refresh
```bash
curl -X POST \
	http://localhost:8081/auth/oauth/token \
	-F grant_type=refresh_token \
	-F client_id=spring-security-oauth2-read-write-client \
	-F client_secret=spring-security-oauth2-read-write-client-password1234 \
	-F refresh_token=e06e4235-a00d-4944-a7d0-a604902eb99a
```

### test client_credentials authentication
```bash
# for old spring-security-oauth2
curl -X POST \
	http://localhost:8081/auth/oauth/token \
	-F grant_type=client_credentials \
	-F client_id=spring-security-oauth2-read-write-client \
	-F client_secret=spring-security-oauth2-read-write-client-password1234

# for spring-security-oauth2-authorization-server, if its client_authentication_methods is "client_secret_basic"
# it means that you need to base64 encode "client_id:client_secret" and put in header "Authorization: Basic base64(client_id:client_secret)"
# scope is optional
curl -v -X POST \
	http://localhost:9000/oauth2/token \
	-F scope="message.read message.write" \
	-F grant_type=client_credentials \
	-H "Authorization: Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ="

curl -v -X POST \
	http://localhost:9000/oauth2/token \
	-F grant_type=client_credentials \
	-H "Authorization: Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ="

# for spring-security-oauth2-authorization-server, if its client_authentication_methods is "client_secret_post"
# then it act as the old one
curl -v -X POST \
	http://localhost:9000/oauth2/token \
	-F grant_type=client_credentials \
	-F client_id=messaging-client \
	-F client_secret=secret
```

## introspect endpoint
For resource server to verify token. That is, forward the token to auth server to check if it valid

```bash
# this example is for spring-security-oauth2-authorization-server
# the client_id and client_secret need not to be the original client.
# that is, the token was generated by messaging-client, it still can verified by messaging-client2
curl -v -X POST \
	http://localhost:9000/oauth2/introspect \
	-F client_id=messaging-client2 \
	-F client_secret=secret \
	-F token=eyJraWQiOiI3Zjc0NmQ4NC04YjY2LTQ4YmMtYWQzNC0zMjkzZjViOGEzYWQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJtZXNzYWdpbmctY2xpZW50IiwiYXVkIjoibWVzc2FnaW5nLWNsaWVudCIsIm5iZiI6MTY1MTA0MTY5OSwic2NvcGUiOlsibWVzc2FnZS5yZWFkIiwibWVzc2FnZS53cml0ZSJdLCJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTAwMCIsImV4cCI6MTY1MTA0MTk5OSwiaWF0IjoxNjUxMDQxNjk5fQ.ctWxYgO2OcRqiRWWf7XHSbPfnlW-i-6A-hnzlnwx7gRy-QSUCbiM8xybCFYPNleEe4VFhscygkahmZQtTaHr3WMXl763DHwX2pRFObLVO0bIXnUbUfCI4QEriYue9mvkz8V50lcDyfObGAZT4d2g_vmSFLWzqwQqUZCQkhF9AhfLnKkfuviWEr9ewkKznbiJo2UvPfyC735ROZfGz5AQnunZbT--O7isvWV596D68Y4upIIqhrYYaaBBDywHAYnHuNY7ROVdSVNlAOeeVwXULr50uSjbRBz45zZD4Mwtzc5XES9oSWK6ZmqJtYjEG6yORnVWJwD2os_htHpZFP7YQw

curl -v -X POST \
	http://localhost:9000/oauth2/introspect \
	-H "Authorization: Basic bWVzc2FnaW5nLWNsaWVudDpzZWNyZXQ=" \
	-F token=xxx

# response will look like below.
# {"active":true,"sub":"messaging-client","aud":["messaging-client"],"nbf":1651041699,"scope":"message.read message.write","iss":"http://localhost:9000","exp":1651041999,"iat":1651041699,"client_id":"messaging-client","token_type":"Bearer"}
```


use access token to get value
```bash
curl http://localhost:8081/auth/app/fullUserList -H "Authorization: Bearer ed1f25a4-3d47-478b-9067-552aa066c2a6"
```

use access token to get value
```bash
curl -X GET \
    http://localhost:8081/auth/app/usersEmail \
    -H "Authorization: Bearer ed1f25a4-3d47-478b-9067-552aa066c2a6" \
    -F username[]=john \
    -F username[]=john2
```


### test code grant
```
curl -v -X GET "http://localhost:8081/auth/oauth/authorize?client_id=spring-security-oauth2-read-write-client&response_type=code&state=5ca75bd30&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fmy-client-2"

curl -v -X GET "http://localhost:8081/auth/login" --cookie "SESSION=ZWUyZWUzY2QtNTdhZi00ODE2LWFjNzItZWY1N2E1ZjJkZGI4"

curl -v -X POST "http://localhost:8081/auth/login" --cookie "SESSION=ZWUyZWUzY2QtNTdhZi00ODE2LWFjNzItZWY1N2E1ZjJkZGI4" -F _csrf=b50d4f23-a77e-4ddb-970b-42e64509e136 -F username=john -F password=456

curl -v -X GET "http://localhost:8081/auth/oauth/authorize?client_id=spring-security-oauth2-read-write-client&response_type=code&state=5ca75bd30&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fmy-client-2" --cookie "SESSION=OGM2NTdmYjgtMjA4Mi00MmIzLTk5MzEtNWQ2ZTU2MTM3NzMz"

curl -v -X POST "http://localhost:8081/auth/oauth/authorize" --cookie "SESSION=OGM2NTdmYjgtMjA4Mi00MmIzLTk5MzEtNWQ2ZTU2MTM3NzMz" -F _csrf=16fb5657-9ed0-4833-a523-7e1e64aaa364 -F user_oauth_approval=true -F scope.read=true -F scope.write=true -F scope.full_user_list=false -F scope.user_management=false

http://localhost:8080/login/oauth2/code/my-client-2?code=PEio1w&state=5ca75bd30

curl -X POST \
	http://localhost:8081/auth/oauth/token \
	-F grant_type=authorization_code \
	-F redirect_uri="http://localhost:8080/login/oauth2/code/my-client-2" \
	-F code=PEio1w \
	-F client_id=spring-security-oauth2-read-write-client \
	-F client_secret=spring-security-oauth2-read-write-client-password1234

{"access_token":"6e58306a-c371-4aa8-9dac-80083c7aab7f","token_type":"bearer","refresh_token":"d14c9aca-d7ab-49e6-bd05-5705aa6927d6","expires_in":10799,"scope":"read write"}
```
