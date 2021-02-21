<template>
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          :stroke-dasharray="circleDasharray"
          class="base-timer__path-remaining"
          :class="remainingPathColor"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span class="base-timer__label">{{ formattedTimeLeft }}</span>
  </div>
</template>

<script>
var timeLimit = 30;
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = timeLimit / 2;
const ALERT_THRESHOLD = timeLimit / 4;
const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};
export default {
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
      timeLeft: 0
    };
  },
  computed: {
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / timeLimit;
      return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    },
    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES;
      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    }
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    }
  },
  mounted() {
    timeLimit = this.$store.state.TimePerQuestion;
  },
  created() {
    var that = this;
    this.timeLeft = this.$store.state.TimePerQuestion;
    this.$gameHub.$on('heart-beat', (payload) => {
      that.timeLeft = payload;
    });
  },
  beforeDestroy() {
    // Make sure to cleanup SignalR event handlers when removing the component
    this.$gameHub.$off('heart-beat');
  },
  methods: {
    onTimesUp() {
     
    },
    setTimer() {
     
    },
    startTimer() {
      
    },
    stopTimer() {
        
    }
  }
};
</script>

<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 100px;
  height: 100px;
  left: 35%;
  &__svg {
    transform: scaleX(-1);
  }
  &__circle {
    fill: none;
    stroke: none;
  }
  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }
  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
    &.green {
      color: rgb(65, 184, 131);
    }
    &.orange {
      color: orange;
    }
    &.red {
      color: red;
    }
  }
  &__label {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
  }
}
</style>