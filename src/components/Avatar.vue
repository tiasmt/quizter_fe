<template>
  <div class="grid-container">
    <div class="avatar"><homer></homer></div>
    <div class="avatar"><bart></bart></div>
    <div class="avatar"><krusty></krusty></div>
    <div class="avatar"><maggie></maggie></div>
    <div class="avatar"><marge></marge></div>
    <div class="avatar"><lisa></lisa></div>
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
    return {};
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
.grid-container {
  height: 88vh;
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
}



/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (min-width: 320px) and (max-width: 480px) {
  .grid-container {
    height: 88vh;
    display: grid;
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