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
