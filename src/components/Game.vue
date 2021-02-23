<template>
  <div class="container">
    <div v-if="inProgress == false">
      <button @click="StartGame()">Start Game</button>
    </div>
    <div v-else>
      <div class="navbar">
        <div class="questions"><font-awesome-icon icon="question" /></div>
        <div class="leaderboard"><font-awesome-icon icon="trophy" /></div>
      </div>
      <div id="start-game-modal" class="modal">
        <div class="modal-content">
          <button class="start-game-button" @click="StartTimer()">Start</button>
        </div>
      </div>
      <div class="questions-screen">
        <div class="score-value">
          {{ correctQuestions }} / {{ totalQuestions }}
        </div>
        <basetimer></basetimer>
        <div class="avatar">
          <homer v-show="isHomer()"></homer>
          <bart v-show="isBart()"></bart>
          <krusty v-show="isKrusty()"></krusty>
          <marge v-show="isMarge()"></marge>
          <maggie v-show="isMaggie()"></maggie>
          <lisa v-show="isLisa()"></lisa>
        </div>

        <div class="question">
          {{ currentQuestion.body }}
        </div>

        <div class="answer-options">
          <button
            :id="['answer' + (index + 1)]"
            v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            @click="setAnswer($event, index)"
          >
            {{ currentQuestion.answers[index].body }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import homer from "./avatars/Homer";
import bart from "./avatars/Bart";
import krusty from "./avatars/Krusty";
import marge from "./avatars/Marge";
import maggie from "./avatars/Maggie";
import lisa from "./avatars/Lisa";
import basetimer from "./partial/BaseTimer.vue";
export default {
  data() {
    return {
      numberOfQuestions: 0,
      score: 0,
      correctQuestions: 0,
      totalQuestions: 0,
      answerId: null,
      answerEvent: null,
      timer: null,
      gameId: 1,
    };
  },
  computed: {
    ...mapState([
      "gameName",
      "category",
      "TimePerQuestion",
      "TotalNumberOfQuestions",
      "NumberOfPlayers",
      "username",
      "avatar",
      "playerId",
      "inProgress",
      "currentQuestion",
      "isCorrect",
    ]),
  },
  methods: {
    isHomer() {
      if (this.avatar == "homer") return true;
    },
    isBart() {
      if (this.avatar == "bart") return true;
    },
    isKrusty() {
      if (this.avatar == "krusty") return true;
    },
    isMarge() {
      if (this.avatar == "marge") return true;
    },
    isMaggie() {
      if (this.avatar == "maggie") return true;
    },
    isLisa() {
      if (this.avatar == "lisa") return true;
    },
    setAnswer(event, id) {
      this.removeClass("chosen");
      event.target.classList.add("chosen");
      this.answerId = id;
      this.answerEvent = event;
    },
    removeClass(className) {
      var questionButtons = document.getElementsByTagName("button");
      questionButtons.forEach((element) => {
        element.classList.remove(className);
      });
    },
    onStartGame({ game }) {
      if (this.game.id !== game.id) {
        this.game = { game };
        this.timePerQuestion = this.game.game.gameSettings.timePerQuestion;
        this.currentTime = this.timePerQuestion;
      }
    },
    updateGame() {
      console.log("UpdateGame");
    },
    GameFinished() {
      console.log("game finished");
    },
    incrementTotalQuestion() {},
    incrementScore() {},
    checkAnswer() {
      var that = this;
      this.removeClass("chosen");
      this.$store
        .dispatch("CheckAnswer", {
          gameName: this.gameName,
          answerId: this.answerId,
          username: this.$store.username,
        })
        .then((response) => {
          if (response) {
            that.answerEvent.target.classList.add("correct");
          } else {
            that.answerEvent.target.classList.add("wrong");
          }
        });
    },
    onUpdateGame({ game }) {
      if (this.game.id !== game.id) {
        this.game = { game };
      }
    },
    ResetTimer() {
      console.log("ResetTimer");
    },
    StopTimer() {
      console.log("StopTimer");
    },
    StartTimer() {
      console.log("StartTimer");
    },
    StartGame() {
      this.$store.dispatch("StartGame", {
        gameName: this.gameName,
      });
    },
  },
  components: {
    homer: homer,
    bart: bart,
    krusty: krusty,
    marge: marge,
    maggie: maggie,
    lisa: lisa,
    basetimer: basetimer,
  },
  created() {
    var that = this;
    this.$gameHub.$on("next-question", (payload) => {
      if (that.answerEvent != null) {
        that.answerEvent.target.classList.remove("wrong");
        that.answerEvent.target.classList.remove("correct");
      }

      that.$store.commit("setQuestion", payload);
    });
    this.$gameHub.$on("check-answer", () => {
      that.checkAnswer();
    });
  },
  beforeDestroy() {
    // Make sure to cleanup SignalR event handlers when removing the component
    this.$gameHub.$off("next-question");
    this.$gameHub.$off("check-answer");
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
$green: #1ecd97;
$red: rgb(205, 30, 30);
$navy: rgb(98, 125, 190);
$purple: rgb(157, 93, 209);
$orange: rgb(211, 160, 93);
$turquoise: rgb(133, 214, 210);
$yellow: rgb(251, 238, 51);
$blue: rgb(0, 89, 253);
$gray: #bbbbbb;
.navbar {
  border: 1px solid;
  display: flex;
}
.questions,
.leaderboard {
  text-align: center;
  height: 7vh;
  cursor: pointer;
}
.questions {
  width: 50%;
  border-right: 1px solid;
  background: #1ecd97;
  &:hover,
  &:active {
    background: rgb(23, 156, 114);
  }
}

.question {
  margin-top: 10%;
  font-size: 70%;
  text-align: center;
}
.leaderboard {
  width: 50%;
  float: right;
  background: rgb(211, 160, 93);
  &:hover,
  &:active {
    background: rgb(204, 139, 55);
  }
}
h5 {
  font-size: 50%;
  text-align: center;
}
.answer-options {
  margin-left: 15%;
  margin-top: 15%;
  height: 15vh;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "answer1 answer2"
    "answer3 answer4";
  text-align: center;
}
button {
  margin-top: 20px;
  outline: none;
  min-height: 70px;
  text-align: center;
  width: 130px;
  border-radius: 40px;
  background: #fff;
  letter-spacing: 1px;
  text-shadow: 0;
  font: {
    size: 12px;
    weight: bold;
  }
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid currentColor;
  &:active {
    letter-spacing: 2px;
  }
}
button#answer1 {
  color: $turquoise;
}
button#answer1.chosen {
  color: white;
  background: $turquoise;
}
button#answer2 {
  color: $navy;
}
button#answer2.chosen {
  color: white;
  background: $navy;
}
button#answer3 {
  color: $purple;
}
button#answer3.chosen {
  color: white;
  background: $purple;
}
button#answer4 {
  color: $orange;
}
button#answer4.chosen {
  color: white;
  background: $orange;
}
button#answer5 {
  color: $yellow;
}
button#answer5.chosen {
  color: white;
  background: $yellow;
}
button#answer6 {
  color: $blue;
}
button#answer6.chosen {
  color: white;
  background: $blue;
}
.checking {
  width: 40px;
  border-color: $gray;
  border-width: 3px;
  font-size: 0;
  animation: rotating 2s 0.25s linear infinite;
  &:after {
    content: "";
  }
  &:hover {
    color: $red;
    background: white;
  }
}
#answer1.checking {
  border-left-color: $turquoise;
  animation: rotating 2s 0.25s linear infinite;
  &:after {
    content: "";
  }
  &:hover {
    color: $turquoise;
    background: white;
  }
}
#answer2.checking {
  border-left-color: $navy;
  animation: rotating 2s 0.25s linear infinite;
  &:after {
    content: "";
  }
  &:hover {
    color: $navy;
    background: white;
  }
}
#answer3.checking {
  border-left-color: $purple;
  animation: rotating 2s 0.25s linear infinite;
  &:after {
    content: "";
  }
  &:hover {
    color: $purple;
    background: white;
  }
}
#answer4.checking {
  border-left-color: $orange;
  animation: rotating 2s 0.25s linear infinite;
  &:after {
    content: "";
  }
  &:hover {
    color: $orange;
    background: white;
  }
}
.correct {
  font-size: 13px;
  color: white;
  background: $green;
  &:after {
    font-family: "FontAwesome";
    content: "\f00c";
  }
}
.wrong {
  font-size: 13px;
  color: white !important;
  background: $red;
  &:after {
    font-family: "FontAwesome";
    content: "\f00d";
  }
}
.avatar {
  margin-top: 5%;
}

#krusty {
  margin-left: 25%;
}

#maggie {
  top: 0%;
}

.timer-value {
  font-size: 150%;
  text-align: center;
}
.score-value {
  font-size: 110%;
  text-align: right;
}
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
/* Modal Content/Box */
.modal-content {
  background-color: #fefefebc;
  margin: 50% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 37%; /* Could be more or less, depending on screen size */
  border-radius: 10px;
  height: 10%; //increase as number of players increases
  width: 40%;
}
.modal-content button {
  background-color: #22901ebc;
  color: white;
  margin: 5%;
}
</style>

// https://codepen.io/valentingalmand/pen/MYMZZK