grpcurl -plaintext -import-path ./src/profile -proto profile.proto -d "{\"name\":\"name\", \"email\":\"email1\", \"password\": \"password\"}" localhost:5000 profile.ProfileService/edit
grpcurl -plaintext -import-path ./src/profile -proto profile.proto -d "{\"name\":\"name1\", \"email\":\"email1\", \"password\": \"password\"}" localhost:5000 profile.ProfileService/edit


start cmd.exe /k "test\user-case\watchProfileByNameRequest.cmd" name
start cmd.exe /k "test\user-case\watchProfileByNameRequest.cmd" name1

TIMEOUT /T 3

grpcurl -plaintext -import-path ./src/profile -proto profile.proto -d "{\"name\":\"name\", \"email\":\"email1\", \"password\": \"new password for user name\"}" localhost:5000 profile.ProfileService/edit
grpcurl -plaintext -import-path ./src/profile -proto profile.proto -d "{\"name\":\"name1\", \"email\":\"email1\", \"password\": \"new password for user name1\"}" localhost:5000 profile.ProfileService/edit
