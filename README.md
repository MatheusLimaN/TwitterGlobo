# TwitterGlobo

### Built with
- NodeJS
- ExpressJS
- ReactJS
- Socket.io

### Prerequisites
[Docker](https://www.docker.com/get-docker)

## Starting 

Create an .env file with the environment variables:

- TW_CONSUMER_KEY (Twitter consumer key)
- TW_CONSUMER_SECRET (Twitter consumer secret)
- TW_TOKEN  (Twitter token)
- TW_TOKEN_SECRET  (Twitter token secret)
- USER  (User to login to the admin panel)
- PASSWORD  (Password to login to the admin panel)

Run this docker command:

```shell
docker-compose up -d
```

### Endpoints
- [Screen](http://localhost:3002/)
- [Admin Panel](http://localhost:3002/admin)