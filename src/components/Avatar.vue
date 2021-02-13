<template>
  <div class="container">
    <h5>Avatar</h5>
    <div class="input">
      <input placeholder="Username" type="text" v-model="username" required />
    </div>
    <div class="grid-container">
      <div class="avatar" @click="CreatePlayer('homer')"><homer></homer></div>
      <div class="avatar" @click="CreatePlayer('bart')"><bart></bart></div>
      <div class="avatar" @click="CreatePlayer('krusty')"><krusty></krusty></div>
      <div class="avatar" @click="CreatePlayer('maggie')"><maggie></maggie></div>
      <div class="avatar" @click="CreatePlayer('marge')"><marge></marge></div>
      <div class="avatar" @click="CreatePlayer('lisa')"><lisa></lisa></div>
    </div>
  </div>
</template>

<script>
import homer from "./avatars/Homer";
import bart from "./avatars/Bart";
import krusty from "./avatars/Krusty";
import marge from "./avatars/Marge";
import maggie from "./avatars/Maggie";
import lisa from "./avatars/Lisa";
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    CreatePlayer(avatar) {
      this.$store.dispatch("CreatePlayer", {
        avatar: avatar,
        username: this.username
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
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #7dadff;
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

.input input[type="text"],
.input input[type="password"] {
  margin: 15px auto;
  background-color: $primary-color;
  font-size: 40%;
  width: 50%;
  margin-left: 25%;
  display: block;
  box-sizing: border-box;
  padding: 7px 8px;
  border-radius: 10px;
  letter-spacing: 0.1em;
  position: relative;
  z-index: 1;
  border: 1px solid $primary-color-dark;
  color: white;
}

h5 {
  margin-top: 3%;
  margin-bottom: 2%;

  &::after {
    display: block;
    height: 2px;
    background-color: $primary-color;
    content: " ";
    width: 100px;
    margin: 0 auto;
    margin-top: 5px;
  }
}

.grid-container {
  height: 80vh;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "homer bart krusty"
    "marge maggie lisa";
  background: #dee2e6;
  text-align: center;
}

.avatar {
  cursor: pointer;
  width: 200px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 45%;
  background: rgba(0, 0, 0, 0.104);
}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (min-width: 320px) and (max-width: 480px) {
  .grid-container {
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    grid-template-areas:
      "homer bart"
      "krusty marge"
      "maggie lisa";
    background: #dee2e6;
    text-align: center;
  }
}
</style>