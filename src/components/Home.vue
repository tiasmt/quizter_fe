<template>
  <div class="home container">
      <a class="create" @click="CreateGame()">New Game</a>
      <a class="join" @click="Join()">Join Game</a>
      <a class="observe" @click="Join()">Observe Game</a>
  </div>
</template>

<script>
export default {
     data() {
        return {
        }
    },
    methods : {
        CreateGame() {
            this.$store.dispatch("CreateGame");
        },
        Join() {
            this.$store.dispatch("Join");
        },
        Observe() {
            this.$store.dispatch("Observe");
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
--btn-width-max: 250px;
--btn-width-min: 250px;
--btn-height: 80px;
}
$primary-color: #7DADFF;
$primary-color-hover: #4d8eff;
$secondary-color: rgb(246, 153, 124);
$secondary-color-hover: #f8663a;
$tertiary-color: #77da9e;
$tertiary-color-hover: #12ae51e0;
*:before,
*:after {
  z-index: -1;
}
.home {
    margin: 20%;
    margin-bottom: 0px;
}
a {
  text-align: center;
  text-decoration: none;
  line-height: var(--btn-height);
  font-size: 70%;
  *,
  *:before,
  *:after {
    transition: 1s ease-in-out;
  }
}
.create, .join, .observe {
  position: relative;
  display: block;
  overflow: hidden;
  min-width: var(--btn-width-min);
  max-width: var(--btn-width-max);
  margin: 1rem auto;
  text-transform: uppercase;
  border: 1px solid currentColor;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.048);
  font-weight: 500;
}
.create {
  $btn-color: $primary-color;
  color: $primary-color;
}
.observe {
  $btn-color: $tertiary-color;
  color: $tertiary-color;
}
.join {
  $btn-color: $secondary-color;
  color: $secondary-color;
}
.create:before, .create:after, .join:before, .join:after, .observe:before, .observe:after {
  position: absolute;
  top: 50%;
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.create:before, .create:after {
    background-color: $primary-color-hover;
}
.join:before, .join:after {
    background-color: $secondary-color-hover;
}
.observe:before, .observe:after {
    background-color: $tertiary-color-hover;
}
.create:before, .join:before, .observe:before {
  left: -20px;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}
.create:after, .join:after, .observe:after {
  right: -20px;
  -webkit-transform: translate(50%, -50%);
          transform: translate(50%, -50%);
}
.create:hover, .join:hover, .observe:hover {
  color: whitesmoke;
}
.create:hover:before, .join:hover:before, .observe:hover:before {
  -webkit-animation: criss-cross-left 0.8s both;
          animation: criss-cross-left 0.8s both;
  -webkit-animation-direction: alternate;
          animation-direction: alternate;
}
.create:hover:after, .join:hover:after, .observe:hover:after {
  -webkit-animation: criss-cross-right 0.8s both;
          animation: criss-cross-right 0.8s both;
  -webkit-animation-direction: alternate;
          animation-direction: alternate;
}
/* 
  ##Device = Desktops
  ##Screen = 1281px to higher resolution desktops
*/
@media (min-width: 1281px) {
  
  //CSS
  
}
/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/
@media (min-width: 1025px) and (max-width: 1280px) {
  
  //CSS
  
}
/* 
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/
@media (min-width: 768px) and (max-width: 1024px) {
  
  //CSS
  
}
/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  
  //CSS
  
}
/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/
@media (min-width: 481px) and (max-width: 767px) {
    .create, .join, .observe {
        min-width: var(--btn-width-min) ;
        max-width: var(--btn-width-max) ;
        font-size: 50%;
    }
    // a {
    //     line-height: var(--btn-height);
    //     font-size: 10%;
    // }
}
/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (min-width: 320px) and (max-width: 480px) {
  
    .home {
        margin-top: 50%;
    }
    .create, .join, .observe {
        min-width: var(--btn-width-min);
        max-width: var(--btn-width-max);
        max-height: 80px;
        font-weight: 500;
        font-size: 50%;
    }
}
</style>