<template>
  <div class="parent" @mousemove="ReDraw($event)" @mouseup="IsDragging(false)">
    <h4>Settings</h4>
    <div class="container">
      <div id="number-of-questions" class="text">100</div>
      <div id="number-of-questions-circle" class="circle"></div>
      <div
        @mousedown="IsDragging($event, true)"
        id="number-of-questions-slider"
        class="slider"
      ></div>
      <span class="settings-label">Number Of Questions</span>

      <div id="time-per-question" class="text">30</div>
      <div id="time-per-question-circle" class="circle"></div>
      <div
        @mousedown="IsDragging($event, true)"
        id="time-per-question-slider"
        class="slider"
      ></div>
      <span class="settings-label">Time Per Question</span>

      <a class="next" @click="SetSettings()">Next</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rangeSlider: [],
      rangeBullet: [],
      isDragging: false,
      currentSlider: "",
      currentCircle: "",
      currentSpan: "",
      max: 0
    };
  },
  methods: {
    showSliderValue(e) {
      //TODO change to have event listener in template directly
      var index = -1;
      this.rangeSlider.forEach((element, i) => {
        if (e.target.id == element.id) index = i;
      });
      this.rangeBullet[index].innerHTML = this.rangeSlider[index].value;
    },
    SetSettings() {
      var numberOfQuestions = Number(
        document.getElementById("number-of-questions").innerHTML
      );
      var secondsPerQuestion = Number(
        document.getElementById("time-per-question").innerHTML
      );
      var data = { numberOfQuestions, secondsPerQuestion };
      this.$store.dispatch("SetSettings", data);
    },
    IsDragging(e, state) {
      this.isDragging = state;
      if (e.type == "mousedown") {
        this.currentCircle = e.target.previousElementSibling.id;
        this.currentSlider = e.target.id;
        this.currentSpan = this.currentSlider.includes("number")
          ? document.getElementById("number-of-questions")
          : document.getElementById("time-per-question");
        this.max = this.currentSlider.includes("number") ? 200 : 60;
      }
    },
    ReDraw(e) {
      if (this.isDragging) {
        var circle = document.getElementById(this.currentCircle);
        var slider = document.getElementById(this.currentSlider);
        var centreX = circle.getBoundingClientRect().x + 80;
        var centreY = circle.getBoundingClientRect().y + 80;
        var posX = e.pageX;
        var posY = e.pageY;
        var deltaX = centreX - posX;
        var deltaY = centreY - posY;
        var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        angle -= 90;
        if (angle < 0) angle = 360 + angle;
        angle = Math.round(angle);
        if (180 > angle && angle > 140) angle = 140;
        if (180 < angle && angle < 215) angle = 215;

        slider.style.transform = "rotate(" + angle + "deg)";
        var value = angle > 140 ? angle - 215 : angle + 140;
        this.currentSpan.innerHTML = Math.round((value / 280) * this.max);
        // document.getElementById("number-of-questions").innerHTML = Math.round(angle);
      }
    },
  },
  mounted() {
    this.rangeSlider = document.getElementsByClassName("rs-range");
    this.rangeBullet = document.getElementsByClassName("rs-label");
    this.rangeSlider.forEach((element) => {
      element.addEventListener("input", this.showSliderValue, false);
    });
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #f5bb3e;
$primary-color-dark: #f8ba33;
$tertiary-color: #f5bb3e;
$tertiary-color-hover: #f8ba33;
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  --btn-width-max: 125px;
  --btn-width-min: 125px;
  --btn-height: 60px;
}

h4 {
  font-weight: 500;
  font-size: 100%;
  text-align: left;
  margin-bottom: 10%;
  margin-top: 0px;
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

.text {
  color: $tertiary-color;
  left: 8.5%;
  text-align: center;
  transform: translate3d(-50%, 325%, 0);
  z-index: 1;
  height: 50px;
  width: 81px;
  background-color: #2f2e2c;
  position: relative;
  border-radius: 50%;
}

.circle {
  top: 50%;
  left: 50%;
  background-color: $tertiary-color;
  border-radius: 50%;
  width: 35%;
  height: 0;
  padding-bottom: 35%;
  transform: translate3d(-50%, -50%, 0);
  box-shadow: 0 0 10px rgba(#000, 0.5);
  margin-top: 15%;
  margin-left: 35%;
  &:before {
    content: "";
    position: absolute;
    width: 90%;
    height: 90%;
    background-color: #2e2d2b;
    border-radius: 50%;
    top: 5%;
    left: 5%;
    box-shadow: inset 0 0 10px rgba(#000, 0.5);
  }
}

.slider {
  position: relative;
  width: 12px;
  height: 80px;
  transform: rotate(0deg);
  transform-origin: center bottom;
  top: -225px;
  left: 0%;
  z-index: 3;
  // background: red;
  content: "";
  &:before {
    content: "";
    position: absolute;
    background-color: $tertiary-color-hover;
    box-shadow: 0 0 10px #000;
    width: 220%;
    transform: translate3d(-25%, -25%, 0);
    height: 0;
    padding-bottom: 220%;
    border-radius: 50%;
    cursor: pointer;
  }
}

.settings-label {
  font-size: 60%;
  margin-top: -30%;
  margin-bottom: 5%;
}

// button
.next {
  position: relative;
  display: block;
  overflow: hidden;
  min-width: var(--btn-width-min);
  max-width: var(--btn-width-max);
  margin: 1rem auto;
  text-transform: uppercase;
  border: 1px solid currentColor;
  border-radius: 5px;
  font-weight: 400;
  font-size: 60%;
  $btn-color: $tertiary-color;
  color: $tertiary-color;
  margin-top: 25%;
}
.next:before,
.next:after {
  position: absolute;
  top: 50%;
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.next:before,
.next:after {
  background-color: $tertiary-color-hover;
  color: rgba(0, 0, 0, 0.59);
}
.next:before {
  left: -20px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.next:after {
  right: -20px;
  -webkit-transform: translate(50%, -50%);
  transform: translate(50%, -50%);
}
.next:hover {
  color: rgba(0, 0, 0, 0.59);
}
.next:hover:before {
  -webkit-animation: criss-cross-left 0.8s both;
  animation: criss-cross-left 0.8s both;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}
.next:hover:after {
  -webkit-animation: criss-cross-right 0.8s both;
  animation: criss-cross-right 0.8s both;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}
</style>