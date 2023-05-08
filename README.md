# Forwarding Service

This service helps to forward thegraph queries to spaces which have limited scripting abilities other than links

You may deploy the forwarding service yourself or utilize the one provided by Zesty Market at `https://forward.zesty.market`

## Endpoints

1. `/space/:id/image/:format/:style?url=<url>&beacon=<beacon>` (GET)

    This endpoint allows you to get the current image for the space. The fields are as supported in the zesty sdk repository.

    **Parameters**

    `:id` this field is a string that corresponds to your ad unit id on the Zesty Marketplace

    `:format` this field can be `square`, `wide`, `tall`

    `:style` this field can be `standard`, `minimal`, `transparent`

    `?url` this field is the canonical URL of your experience (e.g. `https://www.mygame.com`)

    `&beacon` this is an optional argument to specify analytics behavior

    If `?beacon=1` _onload_ metrics will be sent to the beacon server at `https://beacon.zesty.market`.

    By default, beacon is not enabled.

    **Examples**

    `/space/1/square/standard?url=https://www.mygame.com&beacon=1`

    This refers to a Zesty ad unit with id=1.
    Displays a default image that's square and standard.
    Specifies it's hosted on `https://www.mygame.com`.
    Turns on the beacon to track _onload_ data.

2. `/space/:id/cta?url=<url>beacon=<beacon>` (GET)

    This endpoint allows you to get the current CTA. The fields are as supported in the zesty sdk repository.

    **Parameters**

    `:id` this field is a string that corresponds to your ad unit id on the Zesty Marketplace

    `?url` this field is the canonical URL of your experience (e.g. `https://www.mygame.com`)

    `&beacon` this is an optional argument to specify analytics behavior

    If `?beacon=1` _onload_ metrics will be sent to the beacon server at `https://beacon.zesty.market`.

    By default, beacon is not enabled.

    **Examples**

    `/space/1/cta?url=https://www.mygame.com&beacon=1`

    This refers to a Zesty ad unit with id=1.
    Specifies it's hosted on `https://www.mygame.com`.
    Turns on the beacon to track _onclick_ data.

## Quickstart for Development

1. Install necessary dependencies with yarn. The version of node which this was developed on is version `v16.7.0`

    ```shell
    yarn
    ```

2. Run index.js using

    ```shell
    yarn start
    ```

## Quickstart for Deployment

1. You will need to have docker and docker-compose installed.

2. Setup the necessary ssl certificates. `.pem` is the certificate, while `.key` refers to the private key

    ```text
    // replace

    ./nginx/zesty.market.pem
    ./nginx/zesty.market.key
    ```

3. Create an `.env` file in the root of the repository. For now this is empty.

4. Run docker-compose detached and build with the following command

    ```shell
    docker-compose up -d --build
    ```

5. Stop the docker server

    ```shell
    docker-compose stop
    ```

6. Shutdown the docker server and remove volumes and images

    ```shell
    docker-compose down -v --rmi local
    ```
