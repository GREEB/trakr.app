<template>
  <div class="contaner">
    <vue-scroll :ops="ops">
      <section class="intro">
        <div class="content">
          <h1 class="text-wrap">
            Track car telemetry in
            <img
              src="~/assets/image/3d-dynamic-gradient.png"
              alt="3D"
            >
            space
          </h1>
          <p class="text-wrap">
            <span>How this works:</span> The Games we support can deliver
            telemetry over UDP, we save parse and display this data.
          </p>
        </div>
        <div>
          <AppBarSocial
            style="
            position: absolute;
            top: calc(100vh - 50px);
            left: 1em;"
          />
        </div>
        <span class="scroll-btn">
          <a href="#">
            <span class="mouse">
              <span />
            </span>
          </a>
        </span>
      </section>
      <section class="features">
        <h1>Features</h1>
        <div class="content">
          <ul>
            <li>
              <img
                max-height="65"
                max-width="91"
                contain
                src="~/assets/image/roll-brush-dynamic-gradient.png"
                alt=""
              >
              <h3>GLSL Shaders for efficient visualization</h3>
              <p>
                Custom Vertex and Fragment shader support, pre made shader library
              </p>
            </li>
            <li>
              <img
                max-height="65"
                max-width="91"
                contain
                src="~/assets/image/wifi-dynamic-gradient.png"
                alt=""
              >
              <h3>Realtime visuals in a browser</h3>
              <p>Monitor Data from anywhere in the world with your browser</p>
            </li>
            <li>
              <img
                max-height="65"
                max-width="91"
                contain
                src="~/assets/image/flag-dynamic-gradient.png"
                alt=""
              >
              <h3>Race and compare data</h3>
              <p>Compare Lap times and look at corresponding telemetry</p>
            </li>
          </ul>
          <ul>
            <li>
              <img
                max-height="65"
                max-width="91"
                contain
                src="~/assets/image/zoom-dynamic-gradient.png"
                alt=""
              >
              <h3>YDIY fully download raw data at anytime</h3>
              <p>
                Your data is Yours, you can do whatever you want we are simple a
                middleman to save data
              </p>
            </li>
            <li>
              <img
                max-height="65"
                max-width="91"
                contain
                src="~/assets/image/scissor-dynamic-gradient.png"
                alt=""
              >
              <h3>Custom Input</h3>
              <p>Use custom inputs to visualize data from anywhere</p>
            </li>
            <li>
              <img
                max-height="65"
                max-width="91"
                contain
                src="~/assets/image/target-dynamic-gradient.png"
                alt=""
              >
              <h3>Collaborative Mapping</h3>
              <p>Many different clients can make up one map invite other users</p>
            </li>
          </ul>
          <p class="wipinfo">
            Most of the stuff above unfortunately doesn’t work yet help me build
            this on <a href="https://github.com/greeb/trakr.app">github</a>
          </p>
          <ul>
            <li>
              <img
                max-height="65"
                max-width="91"
                contain
                src="~/assets/image/key-dynamic-gradient.png"
                alt=""
              >
              <h3>Open Source</h3>
              <p>Fully open source ready to selfhost</p>
            </li>
          </ul>
        </div>
      </section>
      <footer>
        &copy;
        <span id="copyright" />
        trakr.app
      </footer>
    </vue-scroll>
  </div>
</template>
<script>
export default {
  // layout: 'about',
  data () {
    return {
      ops: {
        bar: {
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#151515 ',
          opacity: 1,
          minSize: 0,
          size: '6px'
        }
      }
    }
  },
  head: {
    title: 'About'
  },
  // Little fix to show and hide lil gui on page
  mounted () {
    this.overlay = false
    document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))
  }
}

</script>
<style scoped>

.v-toolbar{
  display:none
}
.v-main{
  padding-top:0 !important
}
canvas{
  display:none !important
}
.overlayer{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #0b0b0b;
    width: 100%;
    z-index: 99999;
}
.contaner {
  font-family: "Roboto", sans-serif;
  overflow: hidden;
  height: calc(100vh - 48px);
  padding:0;
  margin:0;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.01em;
}

p span {
  font-weight: bold;
}
.icons {
  position: absolute;
  right: 6em;
  top: 1.5em;
}
footer {
  height: 100px;
  padding-right: 4em;
  background: #131313;
  font-size: 12px;
  text-align: right;
}
.icons * {
  color: #232324;
  height: 30px;
}
section {
  min-height: 100vh;
}
a {
  text-decoration: dotted;
  color: #e0af59;
}
table {
  filter: blur(5px);
  opacity: 1;
}
table::after {
  content: "N/A";
}
.intro .discord {
  filter: invert(1);
  position: absolute;
  margin-top: -0.4em;
  right: 2em;
  opacity: 0.1;
}
.intro {
  margin-top: -48px;
  background: #121212;
}
.theme--light .intro {
  margin-top: -48px;
  background: #fff;
}
.intro .content h1 {
  font-style: normal;
  font-weight: 600;
  font-size: 72px;
  line-height: 96px;
  text-align: center;
  letter-spacing: 0.01em;
  text-align: left;
  padding: 0;
  margin: 0;
}
.intro p {
  width: 45%;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #8d8d8d;
}
.intro h1 img {
  height: 308px;
  margin-left: -60px;
  margin-bottom: -140px;
  margin-right: -30px;
}
.intro h1 span {
  opacity: 0;
}
.intro nav img {
  height: 44px;
}
.intro nav .right {
  float: right;
}
button {
  pointer-events: all;
  cursor: pointer;
}
.openapp {
  background: radial-gradient( 283.2% 4771.01% at 143% 456%, #581cd5 0%, #db94ba 49.48%, #e5b565 100% );
  color: #fff;
  position: absolute;
  right: 36px;
  top: 4.5em;
}
.intro nav {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 48px;
  /* identical to box height */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
}
.intro{
  position: relative;
}
.intro .content {
  width: 63%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.logo h1 {
  float: left;
  padding: 0;
  margin: 0;
}
.logo img {
  float: left;
}
.logo {
  padding: 1.5em;
}

/* section:nth-child(3){
    background-color: #121314;
    width: 100%;
position: absolute;
} */
.wipinfo {
  padding: 1em;
  margin-bottom: 5em;
  clear: both;
  text-align: center;
  font-style: normal;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  /* identical to box height */
  letter-spacing: 0.01em;
}
.features .content .v-image{
  float: left;
}
.features .content {
  height: 100%;
  padding: 6.5em;
}
.features h1 {
  margin: 0;
  padding: 2em 0em 0em 4em;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 64px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
}
.features ul li h3 {
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  padding: 0;
  letter-spacing: 0.01em;
}
.features ul li h3,
.features ul li p {
  padding: 0;
  margin: 0px 0px 0px 120px;
}
.features ul li img {
  height: 72px;
  position: absolute;
}
.features ul li p {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.01em;
}
.features ul li {
  list-style: none;
  margin-bottom: 5em;
}
.features ul:last-of-type {
  margin: 0;
}
.features ul:last-of-type li {
  list-style: none;
  margin-bottom: 0em;
}
.features ul {
  float: left;
}

.features ul:nth-child(2) {
  margin-bottom: 4em;
}
.features {
  background-color: #131313;
  width: 100%;
}
.theme--light .features {
  background-color: rgb(230, 230, 230);
}
.theme--light footer{
  background-color: #e6e6e6;
}
.supported {
  background: linear-gradient(
    180deg,
    rgba(24, 26, 30, 1) 0%,
    rgba(18, 19, 20, 1) 100%
  );
  width: 100%;
}
.supported span {
  position: absolute;
  margin-top: 3em;
  text-align: center;
  margin-left: 4em;
  font-size: 24px;
}
.supported h1 {
  margin: 0;
  padding: 2em 0em 2em 4em;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 64px;
  display: flex;
  align-items: center;
  text-align: left;
  letter-spacing: 0.01em;
}
.supported .content {
  margin-left: 10em;
}
.supported table {
  width: 100%;
}
.supported table td {
  text-align: left;
}
.supported table {
  margin-bottom: 4em;
  text-align: left;
}
@media only screen and (max-width: 1809px) {
  .intro .content {
    width: 90%;
    white-space: unset;
  }
      .features ul:nth-child(2) {
    margin-left: 0;
  }
}
@media only screen and (max-width: 1337px) {
  .intro .content h1 img {
    height: 100px;
    margin-left: 0px;
    margin-bottom: -30px;
    margin-right: 0px;
  }
  .intro .content p {
    width: 90%;
  }
  .intro nav button {
    right: 2em;
  }
    .features ul:nth-child(2) {
    margin-left: 0;
  }
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .logo {
    padding: 20px;
  }
  .intro nav button {
    top: 52px;
    right: 20px;
  }
  .features h1,
  .supported h1 {
    padding: 0 0 0 1em;
  }
.icons {
    position: absolute;
    right: 1em;
    top: 3.5em;
}
  .supported .content {
    margin: 1em;
  }
  .features .content{
    padding: 1em
  }
  .features ul:nth-child(2) {
    margin-left: 0;
  }
  .features ul li h3,
  .features ul li p {
    padding: 0;
    margin: 0px 0px 0px 80px;
  }
  .logo h1 {
    float: left;
    padding: 0;
    margin: 0;
  }
  .intro nav,
  .features h1,
  .supported h1 {
    font-size: 28px;
    padding: 1em 1em 1em 1em;
  }
  .intro .content h1 {
    font-size: 61px;
  }
  .supported h1 {
    padding-top: 3em;
  }
}
@-webkit-keyframes ani-mouse {
  0% {
    opacity: 1;
    top: 29%;
  }
  15% {
    opacity: 1;
    top: 50%;
  }
  50% {
    opacity: 0;
    top: 50%;
  }
  100% {
    opacity: 0;
    top: 29%;
  }
}
@-moz-keyframes ani-mouse {
  0% {
    opacity: 1;
    top: 29%;
  }
  15% {
    opacity: 1;
    top: 50%;
  }
  50% {
    opacity: 0;
    top: 50%;
  }
  100% {
    opacity: 0;
    top: 29%;
  }
}
@keyframes ani-mouse {
  0% {
    opacity: 1;
    top: 29%;
  }
  15% {
    opacity: 1;
    top: 50%;
  }
  50% {
    opacity: 0;
    top: 50%;
  }
  100% {
    opacity: 0;
    top: 29%;
  }
}
.scroll-btn {
  pointer-events: none;
}
.scroll-btn {
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  left: 0;
  opacity: 0.1;
}
.scroll-btn > * {
  display: inline-block;
  line-height: 18px;
  font-size: 13px;
  font-weight: normal;
  color: #7f8c8d;
  color: #ffffff;
  font-family: "proxima-nova", "Helvetica Neue", Helvetica, Arial, sans-serif;
  letter-spacing: 2px;
}
.scroll-btn > *:hover,
.scroll-btn > *:focus,
.scroll-btn > *.active {
  color: #ffffff;
}
.scroll-btn > *:hover,
.scroll-btn > *:focus,
.scroll-btn > *:active,
.scroll-btn > *.active {
  opacity: 1;
  filter: alpha(opacity=100);
}
.scroll-btn .mouse {
  position: relative;
  display: block;
  width: 35px;
  height: 55px;
  margin: 0 auto 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid white;
  border-radius: 23px;
}
.scroll-btn .mouse > * {
  position: absolute;
  display: block;
  top: 29%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  background: white;
  border-radius: 50%;
  -webkit-animation: ani-mouse 2.5s linear infinite;
  -moz-animation: ani-mouse 2.5s linear infinite;
  animation: ani-mouse 2.5s linear infinite;
}

.styled-scrollbars {
  /* Foreground, Background */
  scrollbar-color: #999 #333;
}
.styled-scrollbars::-webkit-scrollbar {
  width: 10px; /* Mostly for vertical scrollbars */
  height: 10px; /* Mostly for horizontal scrollbars */
}
.styled-scrollbars::-webkit-scrollbar-thumb {
  /* Foreground */
  background: #999;
}
.styled-scrollbars::-webkit-scrollbar-track {
  /* Background */
  background: #333;
}
</style>
