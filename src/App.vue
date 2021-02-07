<template>
  <div id="app">
     <div class="view-container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        created() {
            
        },
        methods : {
            
        }
    }
</script>

<style lang="scss">
#app{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
body{
    margin: 0px;
    padding: 0px;
}
html{
    // font-family: 'Montserrat'
    font-family: 'Open Sans', Helvetica, arial, sans-serif;
    font-weight: 500;
    font-size: 40px;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
    color: #2c3e50;
    background-color: #dee2e6;
}
@-webkit-keyframes criss-cross-left {
  0% {
    left: -20px;
  }
  50% {
    left: 50%;
    width: 20px;
    height: 20px;
  }
  100% {
    left: 50%;
    width: 375px;
    height: 375px;
  }
}
@keyframes criss-cross-left {
  0% {
    left: -20px;
  }
  50% {
    left: 50%;
    width: 20px;
    height: 20px;
  }
  100% {
    left: 50%;
    width: 375px;
    height: 375px;
  }
}
@-webkit-keyframes criss-cross-right {
  0% {
    right: -20px;
  }
  50% {
    right: 50%;
    width: 20px;
    height: 20px;
  }
  100% {
    right: 50%;
    width: 375px;
    height: 375px;
  }
}
@keyframes criss-cross-right {
  0% {
    right: -20px;
  }
  50% {
    right: 50%;
    width: 20px;
    height: 20px;
  }
  100% {
    right: 50%;
    width: 375px;
    height: 375px;
  }
}
 
</style>