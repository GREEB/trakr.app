### [0.0.22](https://github.com/GREEB/trakr.app/compare/v0.0.21...v0.0.22) (2022-02-01)


### Features

* **accessibility:** standard accessibility for buttons and images ([3259d88](https://github.com/GREEB/trakr.app/commit/3259d8875de4159e9ecbf0928ce967b63e83fb4f))
* **errorHandling:** Do some error handling on slug pages ([ed4d03b](https://github.com/GREEB/trakr.app/commit/ed4d03bcad1239d665d09ef2e4cab7f606641b67))
* **MaxConnections:** Not really a feature but helps to limit connections because we don't broadcast to every tab atm ([f8d8dc4](https://github.com/GREEB/trakr.app/commit/f8d8dc46ebbb967e8c1f9a23ae61f1ce79eb770a))


### Bug Fixes

* **flying:** flying data is hidden when serving data ([672a79d](https://github.com/GREEB/trakr.app/commit/672a79d41c3b3e0f4b357bb8b95a1d3fd8aaff95))
* **sockets:** socket should try to autoconnect now if server restarts ([7b87886](https://github.com/GREEB/trakr.app/commit/7b87886a187ba4bc30c985fa1d87a56a0e1aa759))

### [0.0.21](https://github.com/GREEB/trakr.app/compare/v0.0.20...v0.0.21) (2022-01-31)


### Features

* **adaptiveThrottle:** frist quick version of adaptive throttle, basically only sending 12 p/s if user is on frontend ([4ba6550](https://github.com/GREEB/trakr.app/commit/4ba65508cc308a9f24101bb5b42c6c3e473fe6ce))
* **connectionPanel:** added simple connection panel with chips and logs ([441dbe3](https://github.com/GREEB/trakr.app/commit/441dbe316135cea75ad8126014449f6798938b91))


### Bug Fixes

* **data:** data was actually saved to wrong id ([72f02ff](https://github.com/GREEB/trakr.app/commit/72f02ff5d33087a5d8c94169b1c6965c08ae9be2))
* **sessionManager:** We now recheck after x ms to see if udp really disconnected, this helps ([9ed29d4](https://github.com/GREEB/trakr.app/commit/9ed29d4a049c6cc0a88458b05d16a59da6d575b7))
* **shaders:** shaders now actually save between pages ([0a2f66f](https://github.com/GREEB/trakr.app/commit/0a2f66f690bfd730aba335c660b326e08fb5cae3))
* **three:** actually removing points from scene when getting new ones, this actually fixes shaders and double drawing points ([77f5595](https://github.com/GREEB/trakr.app/commit/77f559547c8802b7a4f7d2206bb8e71cdfb387bb))

### [0.0.20](https://github.com/GREEB/trakr.app/compare/v0.0.19...v0.0.20) (2022-01-30)


### Features

* **mapping:** mapping now tracks NormSuspensionTravel, WheelInPuddle & SurfaceRumble ([b6c9cfb](https://github.com/GREEB/trakr.app/commit/b6c9cfbb4d6a3ae0b10b1967865d47adaab8da83))

### [0.0.19](https://github.com/GREEB/trakr.app/compare/v0.0.17...v0.0.19) (2022-01-30)


### Features

* **gameMap:** implemented global map ([adc96e1](https://github.com/GREEB/trakr.app/commit/adc96e1cfcbea78b3907ac28159aee4710ea76d1))


### Bug Fixes

* **clientMatching:** matching for client and frontend ([b8cc076](https://github.com/GREEB/trakr.app/commit/b8cc0762a14db58af33fc93e95b950ae0f5c8cae))
* **login:** sockets getting called on auth before we have token ([92d3269](https://github.com/GREEB/trakr.app/commit/92d32697a789881f819af58382b63b10277588b0))

### [0.0.17](https://github.com/GREEB/trakr.app/compare/v0.0.16...v0.0.17) (2022-01-26)


### Features

* **cameras:** added new follow system, cam2car and more ([f435db8](https://github.com/GREEB/trakr.app/commit/f435db83df8d5212b9a9b7c7fb95b4c100be9989))
* **car:** fully animated all axes of car and wheels, first slerp time function bad for now ([be7be4f](https://github.com/GREEB/trakr.app/commit/be7be4f1523220358b27f18fe146cdfe4532454a))
* **fh5:** fully implemented parsing ([dad38a9](https://github.com/GREEB/trakr.app/commit/dad38a9ca2ea1379956a8de8939a83f65a22dd57))
* **shaders:** update shader on change in frontend & frustumCulled to avoid calucating bounds ([e1279d3](https://github.com/GREEB/trakr.app/commit/e1279d34c9ac6cb4a4c19d36e56ab4a935da721d))
* **statsjs:** custom instance of statsjs, returns fps now ([c274e44](https://github.com/GREEB/trakr.app/commit/c274e443f8aec2ac143ce2c27d599aa6add9e65f))
* **threejs:** inject app into $stage to use toastify ([f1aad4a](https://github.com/GREEB/trakr.app/commit/f1aad4a4fd0fd8acc5823ab43acf4b3794cb35cd))
* **toolbar:** floating toolbar with camera & shader buttons ([55d2786](https://github.com/GREEB/trakr.app/commit/55d27863dbc5f59c1e418328ef0aade04047a439))

### [0.0.16](https://github.com/GREEB/trakr.app/compare/35c17531881180e843a06aac2d15c8f9faced531...v0.0.16) (2022-01-23)


### Features

* **changelog:** changelog page and content module added ([a15d1b4](https://github.com/GREEB/trakr.app/commit/a15d1b40d84141c98d6999423a96fbb032848511))
* **compatibility:** added compatilility list very simple atm ([b969290](https://github.com/GREEB/trakr.app/commit/b96929080605f00ce7a42e2dea0841461bd52347))
* **connectivity:** show tooltip to see connectivity ([a1b1a83](https://github.com/GREEB/trakr.app/commit/a1b1a83d5c017c5f36fd92f57f9e5787ede0e543))
* **firstVisit:** fristvisit to /about firstlogin to /hello ([a253854](https://github.com/GREEB/trakr.app/commit/a25385463e1bc87c800a18aeeff25e60c4ddcbf8))
* **firstVisit:** tracking first visit to show /hello ([79f0e2b](https://github.com/GREEB/trakr.app/commit/79f0e2baecb525e4bf28e7c040d9c0d7dc29c39c))
* **hello:** added hello page ([30b3165](https://github.com/GREEB/trakr.app/commit/30b3165b8d8ab2ce5d75fa6995d4de26038f10d0))
* **mixin:** added mixing for sockets, gui, stage ([efb3c8b](https://github.com/GREEB/trakr.app/commit/efb3c8b9b3978773da7f0f527223cd2a35735c84))
* **modularUdp:** kinda have a scalable system for udp ([4567589](https://github.com/GREEB/trakr.app/commit/4567589ba5a7e46df59cf0382111da9405e20730))
* **settings:** settings preferences get saved to cookie ([39dbbd3](https://github.com/GREEB/trakr.app/commit/39dbbd3be4a7077a442f079c39c81b43bfb6cbae))
* **stress:** added stress testing site ([35c1753](https://github.com/GREEB/trakr.app/commit/35c17531881180e843a06aac2d15c8f9faced531))
* **threebg:** added functionality to change stage bg ([c477dee](https://github.com/GREEB/trakr.app/commit/c477deec1c875502aaf29734c74d385475824596))


### Bug Fixes

* **about:** fixed dark/light modes on about page ([3beb509](https://github.com/GREEB/trakr.app/commit/3beb50960fc7dd26575794143d498a44d411ef54))
* **auth:** Fixed bad cookie parsing ([817aeb4](https://github.com/GREEB/trakr.app/commit/817aeb44ebde1a2c47c86d24d64effcf0e6c7fbc))
* **error:** styled error a bit ([95c3c50](https://github.com/GREEB/trakr.app/commit/95c3c50265ce469e7aa24c12f8b4f6fcf1689120))
* **lilgui:** auto place off and place it into card ([3b4c07e](https://github.com/GREEB/trakr.app/commit/3b4c07e04a40569268510e54c056114d69adaa51))
* **threejs:** fixed height by substracting navbar ([5cf5888](https://github.com/GREEB/trakr.app/commit/5cf5888731f52597a2d711f3b9d5323dc105adad))

