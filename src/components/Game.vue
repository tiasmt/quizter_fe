<template>
  <div class="container">
    <div v-if="inProgress == false">
      <button v-if="isAdmin" class="start-game-button" @click="StartGame()">
        Start Game
      </button>
      <h5 v-if="isAdmin">{{ gameName }}</h5>
      <h5 v-else>Waiting for Admin to start game ...</h5>
      <div
        :class="['player-avatar ' + player.avatar]"
        v-for="player in players"
        :key="player.playerId"
        :style="{
          backgroundImage:
            'url(' +
            require('../assets/images/' + player.avatar + '.png') +
            ')',
        }"
      >
        <label class="username"> {{ player.username }} </label>
      </div>
    </div>
    <div v-else>
      <div class="navbar">
        <div @click="SetScreen(true)" class="questions">
          <font-awesome-icon icon="question" />
        </div>
        <div @click="SetScreen(false)" class="leaderboard">
          <font-awesome-icon icon="trophy" />
        </div>
      </div>

      <div class="score-value">
        {{ correctQuestions }} / {{ totalQuestions }}
      </div>
      <basetimer></basetimer>
      <div v-if="questionsScreen" class="questions-screen">
        <div class="avatar" :style="{
          backgroundImage:
            'url(' +
            require('../assets/images/' + avatar + '.png') +
            ')',
        }">
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
      <div
        v-else
        :class="['player-avatar ' + player.avatar]"
        v-for="player in players"
        :key="player.playerId"
        :style="{
          backgroundImage:
            'url(' +
            require('../assets/images/Simpsons/' + player.avatar + '.png') +
            ')',
        }"
      >
        <label class="username"> {{ player.username }} </label>
        <label class="correct-answers"> {{ player.correctAnswers }} </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      questionsScreen: true,
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
      "players",
      "isAdmin",
    ]),
  },
  methods: {
    SetScreen(state) {
      this.questionsScreen = state;
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
          gameName: that.gameName,
          answerId: that.answerId,
          username: that.username,
        })
        .then((response) => {
          if (response.lastAnswerIsCorrect) {
            that.answerEvent.target.classList.add("correct");
          } else {
            that.answerEvent.target.classList.add("wrong");
            var element = document.getElementById("answer" + response.correctAnswerId);
            element.classList.add("correct-answer");
          }
          that.correctQuestions = response.correctAnswers;
          that.totalQuestions = response.correctAnswers + response.wrongAnswers;
          that.answerId = null;
        });
    },
    onUpdateGame({ game }) {
      if (this.game.id !== game.id) {
        this.game = { game };
      }
    },
    ClearClasses() {
      for(var i = 1; i <= 4; i++)
      {
        var element = document.getElementById("answer"+i);
        if(element != null)
          element.classList.remove("correct-answer");
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
    basetimer: basetimer,
  },
  created() {
    var that = this;
    this.$gameHub.$on("player-joined", (data) => {
      this.$store.dispatch("PlayerJoined", {
        players: data,
      });
    });

    this.$gameHub.$on("next-question", (payload) => {
      if (that.answerEvent != null) {
        that.answerEvent.target.classList.remove("wrong");
        that.answerEvent.target.classList.remove("correct");
      }
      this.ClearClasses();
      that.$store.commit("setQuestion", payload);
    });

    this.$gameHub.$on("check-answer", () => {
      that.checkAnswer();
    });

    this.$gameHub.$on("game-started", () => {
      this.$store.dispatch("GameStarted");
    });

    this.$gameHub.$on("send-leaderboard", (payload) => {
      this.$store.dispatch("UpdateLeaderboard", payload);
    });
  },
  beforeDestroy() {
    // Make sure to cleanup SignalR event handlers when removing the component
    this.$gameHub.$off("next-question");
    this.$gameHub.$off("check-answer");
    this.$gameHub.$off("player-joined");
    this.$gameHub.$off("send-leaderboard");
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
  font-size: 50%;
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

.start-game-button {
  margin-left: 30%;
  margin-top: 5%;
  margin-bottom: 5%;
  color: #0ca071;
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

.correct-answer {
  border-color: rgb(29, 126, 29);
  color: rgb(35, 119, 35) !important;
  background: rgba(35, 119, 35, 0.255);
}
.avatar {
  margin-top: 5%;
  margin-left: 27%;
  height: 160px;
  width: 160px;
  background-size: 100%;
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

.player-avatar {
  height: 80px;
  width: 95px;
  margin-left: 30%;
}

.username {
  font-size: 50%;
  margin-left: 130%;
}

.Avatar1,
.Avatar2,
.Avatar3,
.Avatar4,
.Avatar5,
.Avatar6 {
  background-size: 105%;
  border: 1px solid #888;
  border-radius: 10px;
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