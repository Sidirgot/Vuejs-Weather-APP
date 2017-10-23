<template>
  <div class="home">
    <i class="wi wi-day-sunny sun" aria-hidden="true"></i>

    <div class="container-custom">
      <div class="field has-icons-right">
       <p class="control has-icons-right">
         <form class="" @submit="onSubmit" @keydown.enter="onSubmit">
           <input class="input" v-model="city" name="city" placeholder="Type a city..." >
           <button class="custom-button"><span></span></button>
         </form>
       </p>
      </div>
    </div>


  </div>
</template>

<script>


export default {
  name: 'home',
  data () {
    return {
      city: ''
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({name: 'Results', query: { city: this.city}});
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../mediaQ"

.home
  height: 100vh
  background-color: #00D1B2
.sun
  color: #68408D
  font-size: 70px
  padding-top: 30px

.container-custom
  max-width: 400px
  position: relative
  margin: 0 auto
  top: 40vh
  box-shadow: 3px 2px 5px #262626
  input
    height: 80px
    font-size: 25px
    border-radius: 5px
    font-weight: 600
.icon
  top: 20px !important
.custom-button
  position: absolute
  top: 0
  right: 3%
  background: none
  outline: none
  border: none
  span
    position: absolute
    background-color: transparent
    width: 35px
    height: 5px
    top: 40px
    right: 0
.custom-button  span:before
      content: ''
      background-color: #68408D
      position: absolute
      width: 30px
      height: 3px
      top: -10px
      right: 0
      border-radius: 5px
      transform: rotate(45deg)
.custom-button  span:after
      content: ''
      background-color: #68408D
      position: absolute
      width: 30px
      height: 3px
      top: 10px
      right: 0
      border-radius: 5px
      transform: rotate(-45deg)
</style>
