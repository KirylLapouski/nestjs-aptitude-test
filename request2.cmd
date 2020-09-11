grpcurl -plaintext -import-path ./src/profile -proto profile.proto -d "{\"name\":\"name1\", \"email\":\"email1\", \"password\": \"password1\"}" localhost:5000 profile.ProfileService/edit
