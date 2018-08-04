<template>
  <div class="hero">
    <div class="bg">
      <div class="text">
        <div class="grid-example col s12 m12 l12"><h1>{{title}}</h1></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      title: 'ethlotto.io'
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  height: 500px;
  width: 100%;
  overflow: hidden;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  .bg {
    height: 100vh;
    width: 100%;
    background-image: url("../assets/hero.jpg");
    background-position: center;
    .text {
      width: 100%;
      background-position: center;
      transition: all 2.5s ease-in-out;
      text-align: center;
      line-height: 200px;
      top: 70%;
      left: 50%;
      transform: translate(-50%,-65%);
      padding-top: 250px;
      -webkit-background-clip: text;
      color: transparent;
      text-transform: uppercase;
      position: absolute;
      @media only screen and (max-width: 600px) {
        h1 {
          font-size: 3rem;
          margin: -25% 0 1.68rem;
        }
      }
      @media only screen and (min-width: 600px) {
        h1 {
          font-size: 5rem;
          margin: 2.1rem 0 1.68rem;
        }
      }
      h1 {
        color: #C77177;
        font-weight: 400;
        line-height: 110%;
      }
    }
  }
}
</style>
