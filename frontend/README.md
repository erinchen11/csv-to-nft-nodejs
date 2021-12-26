# Build Docker image with frontend


docker build -t frontend:lastest .

# Run container of image
docker run -d -p 8085:80 --name myfrontend --network nft_network frontend:lastest



