# Forwarding Service
This service helps to forward thegraph queries to spaces which have limited scripting abilities other than links

You may deploy the forwarding service yourself or utilize the one provided by Zesty Market at `https://forward.zesty.market`

# Endpoints
1. `/:network/space/:id/image/:format/:style?beacon=?` (GET)

    This endpoint allows you to get the current image for the space. The fields are as supported in the zesty sdk repository. 


    **Parameters**

    `:network` this field can be `polygon`, `matic`, `rinkeby`

    `:id` this field is a integer greater or equal to 0 that corresponds with the ZestyNFT id

    `:format` this field can be `square`, `wide`, `tall`

    `:style` this field can be `standard`, `minimal`, `transparent`

    `?beacon` this is an optional argument. 

    If `?beacon=1` _onload_ metrics will be sent to the beacon server at `https://beacon.zesty.market`.

    By default, beacon is not enabled.


    **Examples**

    `/polygon/space/1/square/standard?beacon=1`

    This uses the polygon network. Refers to ZestyNFT id=1. 
    Displays a default image that's square and standard.
    Turns on the beacon to track _onload_ data.


2. `/:network/space/:id/cta?beacon=?` (GET)

    This endpoint allows you to get the current CTA. The fields are as supported in the zesty sdk repository. 


    **Parameters**

    `:network` this field can be `polygon`, `matic`, `rinkeby`

    `:id` this field is a integer greater or equal to 0 that corresponds with the ZestyNFT id

    `?beacon` this is an optional argument. 

    If `?beacon=1` _onclick_ metrics will be sent to the beacon server at `https://beacon.zesty.market`

    By default, beacon is not enabled.


    **Examples**

    `/polygon/space/1/cta?beacon=1`

    This uses the polygon network. Refers to ZestyNFT id=1. 
    Turns on the beacon to track _onclick_ data.

3. `/:network/space/:id/click`

    This endpoint increments the click count for a given space

    **Parameters**

    `:network` this field can be `polygon`, `matic`, `rinkeby`

    `:id` this field is a integer greater or equal to 0 that corresponds with the ZestyNFT id

3. `/:network/space/:id/visits`

    This endpoint increments the visits count for a given space

    **Parameters**

    `:network` this field can be `polygon`, `matic`, `rinkeby`

    `:id` this field is a integer greater or equal to 0 that corresponds with the ZestyNFT id

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

3. Create an `.env` file in the root of the repository. For now this is empty.

4. Run docker-compose detached and build with the following command
```shell
$ docker-compose up -d --build
```

5. Stop the docker server
```shell
$ docker-compose stop
```

6. Shutdown the docker server and remove volumes and images
```shell
$ docker-compose down -v --rmi local
```
