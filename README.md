# Forwarding Service
This service helps to forward thegraph queries to spaces which have limited scripting abilities other than links

# Endpoints
1. `/:network/space/:id/image/:format/:style` (GET)
The fields are as supported in the zesty sdk repository. 

1. `/:network/space/:id/cta` (GET)
The fields are as supported in the zesty sdk repository. 


# Quickstart for Development
1. Install necessary dependencies with yarn. The version of node which this was developed on is version `v16.7.0`
```shell
$ yarn
```
2. Run index.js using
```shell
$ yarn start
```

# Quickstart for Deployment
1. You will need to have docker, and docker-compose installed.

2. Setup the necessary ssl certificates. `.pem` is the certificate, while `.key` refers to the private key
```
// replace

./nginx/zesty.market.pem
./nginx/zesty.market.key
```

3. Run docker-compose detached and build with the following command
```shell
$ docker-compose up -d --build
```

4. Stop the docker server
```shell
$ docker-compose stop
```

5. Shutdown the docker server and remove volumes and images
```shell
$ docker-compose down -v --rmi local
```
