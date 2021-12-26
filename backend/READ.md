# Build Docker image with Backend

docker build -t backend:lastest .

# Run Container of image
docker run -d -p 8000:5000 --name mybackend --network nft_network backend:lastest

