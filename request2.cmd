grpcurl -plaintext -import-path ./profile -proto profile.proto -d "{\"name\":\"name1\", \"email\":\"email1\", \"password\": \"password1\"}" localhost:5000 profile.ProfileService/edit
