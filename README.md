![](https://user-images.githubusercontent.com/1221769/148717218-fe44c144-98e7-40b1-b806-f9d572c1cccd.png)

[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![Build Status](https://app.travis-ci.com/GREEB/trakr.app.svg?branch=main)](https://app.travis-ci.com/GREEB/trakr.app)
[![issues](https://github.com/GREEB/ForzaPointCloud/workflows/todo2issue/badge.svg)](https://github.com/GREEB/trakr.app/actions?query=workflow:"todo2issue") [![Join the chat at https://gitter.im/trakr-app/community](https://badges.gitter.im/trakr-app/community.svg)](https://gitter.im/trakr-app/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### Data 
Really not sure how to do data atm we parse on server and on client to get nice data to animate car. Saving raw bytes would be 200MB/h at ~160 packets/second. So for now to test we only save XYZ to build worldmaps saved every 1000/2 ms. Frontend still gets full telemetry at 12 packets/second.
~~We save the full telemetry bytes, frontend does parsing. Maybe implement [Draco](https://google.github.io/draco/)~~

## Features

- [x]  Three: Dynamic point rendering
- [x]  Nuxt: Discord oauth
- [x]  Nuxt: Usable Frontend
- [x]  Three: Little "stress" page
- [x]  Nuxt: Start of modular system for input data
- [x]  Nuxt/Three: Custom Shader frontend
- [x]  Nuxt: Simple Camera System
- [x]  Nuxt: Simple Global maps


## Contributing

Contributions are always welcome!


## Development

To run the production version which takes URL into consideration for callbacks and CORS and also redirects to ```/about``` if not logged in

If you only wanna see the code for the WebGl/Three stuff there look at the assets folder.

First make sure you copy the example.env to .env

```cp example.env .env```

Read "Environment Variables" below


```bash
  yarn Install
  yarn dev
```
## Games

This basically implements games ```assets/js/games```

## Url

Not really sure about this but for now, x is a uuid

### Map
- `/map/x`
  -  `/map/x/x`

### User
- `/user/x`
  - `/user/x/session/x`
  -  `/user/x/map/x`

### Challange
- `/c/12345`


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`IOPORT` Socket.io port

`URL` Url for CORS and ssl later not really implemented yet if empty defaults to localhost

`PORT` App port also for CORS and stuff

`JWTSECRET` Secret used for JWT, can be generated with:
```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
#or
openssl rand 256 | base64
```

`POSTGRES` Postgres URL

`DISCORDID` Discord oAuth id

`DISCORDSECRET` Discord oAuth secret


## Dump

![](https://user-images.githubusercontent.com/1221769/148322387-67a89550-77f5-4c04-80ac-af9329859144.gif)


## Acknowledgements

 - [@jonathanlurie](https://github.com/jonathanlurie)/[pointCloud](https://github.com/jonathanlurie/pointCloud)
