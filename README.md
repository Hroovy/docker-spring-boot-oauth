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
curl -X POST \
	http://localhost:8081/auth/oauth/token \
	-F grant_type=client_credentials \
	-F client_id=spring-security-oauth2-read-write-client \
	-F client_secret=spring-security-oauth2-read-write-client-password1234
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
