<template>
  <div class="container">
            <div class="question game">
                <input type="text" required/>
                <label>Game Name</label>
            </div>
            <div class="question player">
                <input type="text" required/>
                <label>Player Name</label>
            </div>
            <a class="join" @click="JoinGame()">Join</a>
      <!-- <div class="div-label" id="label-quiz-name"><h4>Arena Name: </h4> <input type="text" class="quiz-name"></div>
      <div class="div-label" id="label-player-name"><h4>Player Name: </h4> <input type="text" class="player-name"></div> -->

  </div>
</template>

<script>
export default {
    methods: {
      JoinGame() {
          console.log("JoinGame"); //call VueX store
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
.container {
    margin-top: 35%;
}
.join {
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
  margin-top: 40%;
}
.join {
  $btn-color: $secondary-color;
  color: $secondary-color;
}
.join:before, .join:after{
  position: absolute;
  top: 50%;
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.join:before, .join:after {
    background-color: $secondary-color-hover;
}
.join:before{
  left: -20px;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}
.join:after {
  right: -20px;
  -webkit-transform: translate(50%, -50%);
          transform: translate(50%, -50%);
}
.join:hover {
  color: whitesmoke;
}
.join:hover:before {
  -webkit-animation: criss-cross-left 0.8s both;
          animation: criss-cross-left 0.8s both;
  -webkit-animation-direction: alternate;
          animation-direction: alternate;
}
.join:hover:after {
  -webkit-animation: criss-cross-right 0.8s both;
          animation: criss-cross-right 0.8s both;
  -webkit-animation-direction: alternate;
          animation-direction: alternate;
}
.transition, .question label, .question input[type="text"] {
  -moz-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  -o-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  -webkit-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
}
.question {
  margin-top: 10%;
  position: relative;
  padding: 10px 0;
}
.question:first-of-type {
  padding-top: 0;
}
.question:last-of-type {
  padding-bottom: 0;
}
.question label {
  transform-origin: left center;
  font-weight: 100;
  letter-spacing: 0.01em;
  font-size: 17px;
  box-sizing: border-box;
  padding: 3px 15px;
  display: block;
  position: absolute;
  margin-top: -40px;
    margin-left: 10%;
  z-index: 2;
  pointer-events: none;
}
.question.game label{
    color: $primary-color-hover;
}
.question.player label {
    color: $secondary-color-hover;
}
.question input[type="text"] {
  appearance: none;
  background-color: rgba(0, 0, 0, 0.048);
  line-height: 0;
  font-size: 50%;
  width: 80%;
  margin-left: 10%;
  display: block;
  box-sizing: border-box;
  padding: 15px 15px;
  border-radius: 60px;
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
}
.question.game input[type="text"] {
    border: 1px solid $primary-color-hover;
    color: $primary-color-hover;
}
.question.player input[type="text"] {
    border: 1px solid $secondary-color-hover;
    color: $secondary-color-hover;
}
.question input[type="text"]:focus {
  outline: none;
  color: white;
  margin-top: 30px;
}
.question.game input[type="text"]:focus {
    background: $primary-color-hover;
}
.question.player input[type="text"]:focus {
    background: $secondary-color-hover;
}
.question input[type="text"]:valid {
  margin-top: 30px;
}
.question input[type="text"]:focus ~ label {
  -moz-transform: translate(0, -50px);
  -ms-transform: translate(0, -50px);
  -webkit-transform: translate(0, -50px);
  transform: translate(0, -50px);
}
.question input[type="text"]:valid ~ label {
  text-transform: uppercase;
  font-style: bold;
  -moz-transform: translate(5px, -50px) scale(0.70);
  -ms-transform: translate(5px, -50px) scale(0.70);
  -webkit-transform: translate(5px, -50px) scale(0.70);
  transform: translate(5px, -50px) scale(0.70);
}
@media (min-width: 320px) and (max-width: 480px) {
  
.join {
        min-width: var(--btn-width-min);
        max-width: var(--btn-width-max);
        max-height: 80px;
        font-weight: 500;
        font-size: 50%;
    }
}
</style>