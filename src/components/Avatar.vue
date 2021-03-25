<template>
  <div class="container">
    <h4>Avatar</h4>
    <div class="input">
      <input placeholder="Username" type="text" v-model="username" required />
    </div>
        <div class="grid-container">
      <div
        :class="['avatar ' + avatar.name]"
        v-for="avatar in avatars"
        :key="avatar.name"
        :style="{
          backgroundImage:
            'url(' +
            avatar.imageURL +
            ')',
        }"
        @click="CreatePlayer(avatar.name)"
      >
      </div>
        </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      avatars: [
        {
          name: "Avatar1",
          imageURL: require("../assets/images/Avatar1.png"),
        },
        {
          name: "Avatar2",
          imageURL: require("../assets/images/Avatar2.png"),
        },
        {
          name: "Avatar3",
          imageURL: require("../assets/images/Avatar3.png"),
        },
        {
          name: "Avatar4",
          imageURL: require("../assets/images/Avatar4.png"),
        },
        {
          name: "Avatar5",
          imageURL: require("../assets/images/Avatar5.png"),
        },
        {
          name: "Avatar6",
          imageURL: require("../assets/images/Avatar6.png"),
        }
      ],
      username: ""
    };
  },
  computed: {
    ...mapState([
      "gameName"
    ]),
  },
  methods: {
    CreatePlayer(avatar) {
      this.$store.dispatch("CreatePlayer", {
        avatar: avatar,
        username: this.username
      });
    },
  },
  created() {
    this.$gameHub.JoinGroup(this.gameName);
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #f8ba33;
$primary-color-dark: #f8b21a;
$tertiary-color: #77da9e;
$tertiary-color-hover: #12ae51e0;

.container {
  // display: flex;
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
  color: black;
}

.grid-container {
  height: 80vh;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "homer bart krusty"
    "marge maggie lisa";
    background-color: rgba(0, 0, 0, 0.048);
  text-align: center;
}

.avatar {
  cursor: pointer;
  width: 180px;
  height: 200px;
  margin: 3%;
  border: 1px solid $primary-color;
  border-radius: 10%;
  background-size : 110%;
}

 h4 {
    font-weight: 500;
    font-size: 100%;
    text-align: left;
    margin-bottom: 10%;
    margin-top: 0px;
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
      "avatar1 avatar2"
      "avatar3 avatar4"
      "avatar5 avatar6";
    text-align: center;
  }

  
}
</style>