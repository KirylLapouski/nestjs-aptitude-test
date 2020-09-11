grpcurl -plaintext -import-path ./src/profile -proto profile.proto -d "{\"name\":\"%1\"}" localhost:5000 profile.ProfileService/getByName
