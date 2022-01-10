# [Trakr.app](https://trakr.app)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![Build Status](https://app.travis-ci.com/GREEB/trakr.app.svg?branch=main)](https://app.travis-ci.com/GREEB/trakr.app)
[![issues](https://github.com/GREEB/ForzaPointCloud/workflows/todo2issue/badge.svg)](https://github.com/GREEB/trakr.app/actions?query=workflow:"todo2issue")
![](https://user-images.githubusercontent.com/1221769/148322387-67a89550-77f5-4c04-80ac-af9329859144.gif)

WIP!

## Features

- [x]  Three: Dynamic point cloud prototype
- [x]  Nuxt: Discord login
- [x]  Nuxt: Simple Frontend

## Todo

- Three js code splitting making it more modular and smarter, bufferattribute system
- Better car representation 
- Camera System, support for multiple cameras
- Session System
- Modular Data input system to support more games easier in the future
- Friends System
- Custom Shader frontend
- Race System
- Replay System
- Download System
- Custom input api
- Custom model
- much more


## Bugs

Too many atm.

## Contributing

Contributions are always welcome!

Look at issues

## Development

If you only wanna see the code for the WebGl/Three stuff there is a file in the root of this repo called ```simple.html```, there should be everything you need.

First make sure you copy the example.env to .env

```cp example.env .env```

Read "Enviroment Variables" below


```bash
  yarn Install
  yarn dev
```
    
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


## Acknowledgements

 - [@jonathanlurie](https://github.com/jonathanlurie)/[pointCloud](https://github.com/jonathanlurie/pointCloud)
