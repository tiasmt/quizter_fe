<template>
  <div class="parent" @mousemove="ReDraw($event)" @mouseup="IsDragging(false)">
    <h4>Settings</h4>
    <div class="container">
      <div id="number-of-questions" class="text">75</div>
      <div id="number-of-questions-circle" class="circle">
        <div
          @mousedown="IsDragging($event, true)"
          id="number-of-questions-slider"
          class="slider"
        ></div>
      </div>
      <span class="settings-label">Number Of Questions</span>

      <div id="time-per-question" class="text">10</div>
      <div id="time-per-question-circle" class="circle">
        <div
          @mousedown="IsDragging($event, true)"
          id="time-per-question-slider"
          class="slider"
        ></div>
      </div>
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
        this.currentSlider = e.target.offsetParent.id;
      }
    },
    ReDraw(e) {
      if (this.isDragging) {
        var circle = document.getElementById(this.currentSlider);
        var slider = circle.children[0];
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
        if (180 > angle && angle > 150) angle = 150;
        if (180 < angle && angle < 215) angle = 215;

        slider.style.transform = "rotate(" + angle + "deg)";
        var value = angle > 150 ? angle - 215 : angle + 150;
        document.getElementById("number-of-questions").innerHTML = Math.round(
          (value / 295) * 10
        );
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
  background-image: radial-gradient(#2f2e2c, #2f2e2c 60%,#2f2e2c00 68%);
  position: relative;
  // border-radius: 0%;
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
  position: absolute;
  width: 10%;
  height: 50%;
  left: 44%;
  top: 0;
  transform: rotate(0deg);
  transform-origin: center bottom;

  &:before {
    content: "";
    position: absolute;
    background-color: $tertiary-color-hover;
    // box-shadow: 0 0 10px #000;
    width: 120%;
    transform: translate3d(-25%, -25%, 0);
    height: 0;
    padding-bottom: 120%;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
    overflow: visible;
  }
}

.settings-label {
  font-size: 60%;
  margin-top: -10%;
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