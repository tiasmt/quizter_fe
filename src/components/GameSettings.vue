<template>
  <div class="container">
      <h5>Game Settings</h5>
    <div id="no-of-players" class="range-slider">
        <span id="rs-bullet-no-of-players" class="rs-label">1</span>
        <input id="rs-range-line-no-of-players" class="rs-range" type="range" value="1" min="1" max="6">    
    </div>
    <div class="box-minmax">
        <span>1</span>
        <span class="settings-description">Players</span>
        <span>6</span>
    </div>

     <div class="range-slider">
        <span id="rs-bullet-no-of-questions" class="rs-label">10</span>
        <input id="rs-range-line-no-of-questions" class="rs-range" type="range" value="10" min="10" max="500">    
    </div>

    <div class="box-minmax">
        <span>10</span>
        <span class="settings-description">Questions</span>
        <span>500</span>
    </div>
     <div class="range-slider">
        <span id="rs-bullet-no-of-seconds" class="rs-label">5</span>
        <input id="rs-range-line-no-of-seconds" class="rs-range" type="range" value="5" min="5" max="60">    
    </div>
    
    <div class="box-minmax">
        <span>5</span>
        <span class="settings-description">Time / Question</span>
        <span>60</span>
    </div>

    <a class="create" @click="CreateGame()">Create</a>
  </div>
</template>

<script>
export default {
    data() {
        return {
            rangeSlider : [],
            rangeBullet : []
        }
    },
    methods: {
        showSliderValue(e) {
            //TODO change to have event listener in template directly
            var index = -1;
            this.rangeSlider.forEach((element, i) => {
                if(e.target.id == element.id) index = i;
            });
            this.rangeBullet[index].innerHTML = this.rangeSlider[index].value;
        },
        CreateGame() {
            // var numberOfPlayers = Number(document.getElementById('rs-bullet-no-of-players').innerHTML);
            // var numberOfQuestions = Number(document.getElementById('rs-bullet-no-of-questions').innerHTML);
            // var secondsPerQuestion = Number(document.getElementById('rs-bullet-no-of-seconds').innerHTML);
            console.log("CreateGame");
        }
    },
    mounted() {
        this.rangeSlider = document.getElementsByClassName("rs-range");
        this.rangeBullet = document.getElementsByClassName("rs-label");
        this.rangeSlider.forEach(element => {
            element.addEventListener("input", this.showSliderValue, false);
        });
    }
}
</script>

<style lang="scss" scoped> 
$primary-color: #7DADFF;
$primary-color-dark: #4d8eff;
$tertiary-color: #77da9e;
$tertiary-color-hover: #12ae51e0;
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    --btn-width-max: 125px;
    --btn-width-min: 125px;
    --btn-height: 60px;
}
.box-minmax{
  margin-top: 30px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: $primary-color;
  span:first-child{
    margin-left: 10px;
  }
}
.range-slider {
    margin-top: 7%; 
}
.rs-range {
    margin-top: 29px;
    width: 280px;
    -webkit-appearance: none;
    &:focus {
        outline: none;
    }
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 1px;
        cursor: pointer;
        box-shadow: none;
        background: $primary-color;
        border-radius: 0px;
        border: 0px solid #010101;
    }
    &::-moz-range-track {
        width: 100%;
        height: 1px;
        cursor: pointer;
        box-shadow: none;
        background: $primary-color;
        border-radius: 0px;
        border: 0px solid #010101;
    }
  
    &::-webkit-slider-thumb {
        box-shadow: none;
        border: 0px solid $primary-color;
        box-shadow: 0px 10px 10px rgba(0,0,0,0.25);
        height: 42px;
        width: 22px;
        border-radius: 22px;
        background: $primary-color;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -20px;
    }
  &::-moz-range-thumb{
        box-shadow: none;
        border: 0px solid $primary-color;
        box-shadow: 0px 10px 10px rgba(0,0,0,0.25);
        height: 42px;
        width: 22px;
        border-radius: 22px;
        background: $primary-color;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -20px;
  }
  &::-moz-focus-outer {
    border: 0;
    }
}
.rs-label {
    
    position: relative;
    transform-origin: center center;
    display: block;
    width: 35px;
    height: 35px;
    background: transparent;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    padding-top: 4px;
    box-sizing: border-box;
    border: 2px solid $primary-color-dark;
    margin-left: -38px;
    left: 55%;
    color: $primary-color;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 40%;
    margin-bottom: -20px;
    &::after {
        content: " ";
        display: inline;
        font-size: 70%;
        letter-spacing: 0.07em;
    } 
}
    h5 {
        margin-bottom: 0px;
        &::after {
            display:block;
            height: 2px;
            background-color: $primary-color ;
            content: " ";
            width: 100px;
            margin: 0 auto;
            margin-top: 5px;
        }
    }
    #no-of-players {
        margin-top: 13%;
    }
    .settings-description {
            color: #2c3e50
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
*:before,
*:after {
  z-index: -1;
}
.create {
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
  font-weight: 400;
  font-size: 60%;
    $btn-color: $tertiary-color;
  color: $tertiary-color;
}
.create:before, .create:after {
  position: absolute;
  top: 50%;
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.create:before, .create:after {
    background-color: $tertiary-color-hover;
      color: whitesmoke;
}
.create:before {
  left: -20px;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}
.create:after {
  right: -20px;
  -webkit-transform: translate(50%, -50%);
          transform: translate(50%, -50%);
}
.create:hover {
  color: whitesmoke;
}
.create:hover:before {
  -webkit-animation: criss-cross-left 0.8s both;
          animation: criss-cross-left 0.8s both;
  -webkit-animation-direction: alternate;
          animation-direction: alternate;
}
.create:hover:after {
  -webkit-animation: criss-cross-right 0.8s both;
          animation: criss-cross-right 0.8s both;
  -webkit-animation-direction: alternate;
          animation-direction: alternate;
}
</style>