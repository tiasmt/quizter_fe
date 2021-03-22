<template>
  <div class="container">
    <h4>Category</h4>
    <div class="grid-container">
      <div
        :class="['item ' + category.name]"
        v-for="category in categories"
        :key="category.name"
        :style="{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)), url(' +
            category.imageURL +
            ')',
        }"
        @click="SetCategory(category.name)"
      >
        <h5>{{ category.name }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          name: "movies",
          class: "red",
          imageURL: require("../assets/images/movies.jpg")
        },
        {
          name: "music",
          class: "blue",
          imageURL: require("../assets/images/music.jpg")
        },
        {
          name: "sports",
          class: "orange",
          imageURL: require("../assets/images/sports.jpg")
        },
        {
          name: "animals",
          class: "yellow",
          imageURL: require("../assets/images/animals200x200.jpg")
        },
        {
          name: "science",
          class: "gold",
          imageURL: require("../assets/images/science200x200.jpg")
        },
        {
          name: "history",
          class: "grey",
          imageURL: require("../assets/images/history200x200.jpg")
        },
        {
          name: "geography",
          class: "green",
          imageURL: require("../assets/images/music200x200.jpg")
        },
        {
          name: "general",
          class: "purple",
          imageURL: require("../assets/images/random200x200.jpg")
        },
      ],
    };
  },
  methods: {
    SetCategory(category) {
      this.$store.dispatch("SetCategory", category);
    },
  },
};
</script>

<style lang="scss" scoped>
// $primary-color: #7dadff;
// $primary-color-hover: #4d8eff;
// $secondary-color: rgb(246, 153, 124);
// $secondary-color-hover: #f8663a;
// $tertiary-color: #77da9e;
// $tertiary-color-hover: #12ae51e0;
// $fourth-color: #cfb45a;
// $fifth-color: #975acf;
// $sixth-color: #5a97cf;
// $seventh-color: #5acfc9;
// $eighth-color: #ac649a;
// $ninth-color: #5ed1a1;
$primary-color: #f8cc3b98;
$primary-color-hover: #f8cc3b98;
$secondary-color: #f8cc3b98;
$secondary-color-hover: #f8cc3b98;
$tertiary-color: #f8cc3b98;
$tertiary-color-hover: #f8cc3b98;
$fourth-color: #f8cc3b98;
$fifth-color: #f8cc3b98;
$sixth-color: #f8cc3b98;
$seventh-color: #f8cc3b98;
$eighth-color: #f8cc3b98;
$ninth-color: #f8cc3b98;
/* background-color: #dee2e6 */
.movies {
  border: 2px solid $primary-color;
  color: $primary-color;
}
.music {
  border: 2px solid $secondary-color;
  color: $secondary-color;
}
.sports {
  border: 2px solid $tertiary-color;
  color: $tertiary-color;
}
.animals {
  border: 2px solid $fourth-color;
  color: $fourth-color;
}
.food {
  border: 2px solid $fifth-color;
  color: $fifth-color;
}
.science {
  border: 2px solid $sixth-color;
  color: $sixth-color;
}
.history {
  border: 2px solid $seventh-color;
  color: $seventh-color;
}
.geography {
  border: 2px solid $eighth-color;
  color: $eighth-color;
}
.general {
  border: 2px solid $ninth-color;
  color: $ninth-color;
}
.container {
  --img-width: 250px;
  --img-height: 250px;
}
.container {
  margin: 0px;
  padding: 0px;
}
h4 {
  font-weight: 300;
  font-size: 100%;
  text-align: center;
}
.item > a {
  text-decoration: none;
  font-size: 70%;
  text-align: center;
  z-index: 1;
  display: flex;
}
.grid-container {
  height: 88vh;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "item1 item2 item3"
    "item4 item5 item6"
    "item7 item8 item9";
  text-align: center;
}
.grid-container > div {
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
}
/* */
.item {
  display: flex;
  overflow: hidden;
  margin: 1rem auto;
  text-transform: uppercase;
  margin: 3%;
  justify-content: center;
  transition: 0.35s;
  transform: scale(0.95);
  &:hover {
    transform: scale(1.05);
  }
}
/* 
  ##Device = Desktops
  ##Screen = 1281px to higher resolution desktops
*/
@media (min-width: 1281px) {
}
/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/
@media (min-width: 1025px) and (max-width: 1280px) {
}
/* 
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/
@media (min-width: 768px) and (max-width: 1024px) {
}
/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
}
/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/
@media (min-width: 481px) and (max-width: 767px) {
}
/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (min-width: 320px) and (max-width: 480px) {
  h5 {
    font-weight: 300;
    font-size: 60%;
    text-align: center;
    margin-top: 40%;
  }
  h4 {
    font-weight: 500;
    font-size: 100%;
    text-align: left;
    margin-bottom: 10%;
    margin-top: 0px;
  }
  .grid-container {
    height: 200vh;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-areas:
      "item1"
      "item2"
      "item3"
      "item4"
      "item5"
      "item6";
    text-align: center;
  }
  .item > a {
    font-size: 40%;
    margin-left: 30%;
    margin-top: 40%;
    display: flex;
  }
}
</style>

// movies https://www.freepik.com/free-vector/couple-cinema-illustration-young-boy-girl-watching-movie-together_2703450.htm
// music https://www.freepik.com/free-vector/singer-recording-studio_5467408.htm
// sports https://www.freepik.com/free-vector/boxers-fighting-ring-cartoon-illustration_6610154.htm
// animals https://www.freepik.com/free-vector/vet-hospital-composition-with-veterinarian-pets-interior-elements-flat_6787177.htm
// cooking https://www.freepik.com/premium-vector/chief-cook_4220097.htm
// medicine https://www.freepik.com/free-vector/plastic-surgeon-operating-patient-surgery-room_5902280.htm
// history https://www.freepik.com/free-vector/archaeologists-paleontology-scientists-working-excavations_4393919.htm
// geography https://www.freepik.com/free-vector/airplane-night-illustration_5900481.htm
// random https://www.freepik.com/free-vector/skull-jester-hat_8224449.htm#page=1&query=joker&position=19