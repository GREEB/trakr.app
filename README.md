![](https://user-images.githubusercontent.com/1221769/148717218-fe44c144-98e7-40b1-b806-f9d572c1cccd.png)

[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![Build Status](https://app.travis-ci.com/GREEB/trakr.app.svg?branch=main)](https://app.travis-ci.com/GREEB/trakr.app)
[![issues](https://github.com/GREEB/ForzaPointCloud/workflows/todo2issue/badge.svg)](https://github.com/GREEB/trakr.app/actions?query=workflow:"todo2issue")

WIP

## Features

- [x]  Three: Dynamic point cloud
- [x]  Nuxt: Discord login
- [x]  Nuxt: Ok Frontend
- [x]  Three: Little stress site
- [x]  Start of modular system for input data

## Todo

- Accessibility everything
- TS everything
- Three js code splitting making it more modular and smarter, bufferattribute system
- Better car representation 
- Camera System, support for multiple cameras
- Session System
- Friends System
- Custom Shader frontend
- Race System
- Replay System
- Download System
- Custom input api
- Custom model
- Progressive images with vue-loader
- much more


## Bugs

Big bugs/features to fix/create
 - Nuxt with three js is a bit big should be 600kb minified 
 - Camera System
 - Session System
 - Social System

## Contributing

Contributions are always welcome!

```
type(category): description [flags]
```

Where `type` is one of the following:

* `breaking`
* `build`
* `ci`
* `chore`
* `docs`
* `feat`
* `fix`
* `other`
* `perf`
* `refactor`
* `revert`
* `style`
* `test`



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
    

## [Flow Diagram](https://asciiflow.com/#/share/eJytkktOwzAQhq8ymnUVJCRUyDIs2LBEYuONSabBNHEi24VWVXccAYW7IE7DSXCKIiXUbuKCZckea%2F5vHp4tSl4SxnJVFDMs%2BIYUxrhluGYYX13MZww39nY%2Bv7Q3Q2tjDYY3VqOjJ11JyERquCENv9fX2%2BfEzZh8eeQG8pYKXBGIsi6oJGkoGwDhTvGlinhdW%2FP99ZBzkIVjtZx7etDCUGf%2BHJ1%2BYtpOcoB2GLHX0oCYw6eTawgh%2B1r63%2FomvDJwOjSeigP%2BqZ%2FH6Cx3jhHJZ7ek%2BWiZ15VciNyD3LskPF2SzODsNunn4lNAXWmTK9J%2F6ZZvPoK6NZE%2BMhUjc9JFmoQ4lkVztKbQMMlKFBksVFVCuv%2FhE4ue2HMHHXe4%2BwZ70bxY)

Games.json is not yet implemented

`Games.json` will be read by front/backend to see what games are implemented
full implementation of udp packet parsing could be done in single json object for each game in games.json
goal is to have uniform data and an easy way to enable disable a game on the app

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
