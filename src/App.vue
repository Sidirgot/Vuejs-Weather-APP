<template>
  <div id="app">
      <aside class="menu" @click="toggleNav" v-bind:class="{ 'isActive':isActive }">
        <div class="nav-container">
          <div class="top">
            <a href="/">
              <div class="media">
                <div class="media-content">
                  <div class="content">
                    <span>Your best weather app</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <hr class="hr-custom">

          <div class="bottom">
            <a href="#">about</a>
            <a href="#">how it works</a>
            <a href="#">contact</a>
          </div>
        </div>
      </aside>

      <button class="humberger" @click="toggleNav" v-bind:class="{ 'isActive':isActive }">
        <span></span>
      </button>


    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  data: function() {
    return {
      isActive: false,
      city: ''
    }
  },
  methods: {
    toggleNav: function() {
      this.isActive = !this.isActive;
    }
  }

}
</script>

<style lang="sass">
@import "../node_modules/bulma/bulma.sass"
@import "/mediaQ"


#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  text-align: center

// ====================
// side menu container
// ===================
.menu
  position: absolute
  background: #68408D
  width: 340px
  left: -340px
  z-index: 9
  transition: .5s ease-in-out
  bottom: 0
  top: 0

.isActive
  left: 0

// ====================
// side menu top right button
// ===================
.humberger
  width: 50px
  height: 50px
  margin-top: 30px
  margin-left: 10px
  position: relative
  float: left
  outline: none
  background: transparent
  border: 0
  cursor: pointer
  z-index: 9

.humberger span
  position: absolute
  background-color: #68408D
  width: 30px
  height: 2px
  left: 0
  margin-left: 8px

.humberger span:before
  content: ''
  position: absolute
  width: 100%
  height: 2px
  background-color: #68408D
  top: -12px
  left: 0
  transition: .5s

.humberger span:after
  content: ''
  position: absolute
  width: 100%
  height: 2px
  background-color: #68408D
  top: 12px
  left: 0
  transition: .5s

.humberger.isActive span
  background-color: transparent
  transition: .5s

.humberger.isActive span:before
  transform: rotate(45deg)
  background-color: #00D1B2
  transition: .5s
  top: 0

.humberger.isActive span:After
  transform: rotate(-45deg)
  background-color: #00D1B2
  transition: .5s
  top: 0

.nav-container
  bottom: 0
  .top
      width: 130px
      font-size: 35px
      color: #fff
      margin-top: 150px
      margin-left: 25px
      margin-bottom: 90px
      a
        color: #fff

.top
  a:hover
    color: #00D1B2

.bottom
  a
    display: table
    font-size: 40px
    margin-left: 25px
    color: #00D1B2
    &:hover
      color: #fff
.hr-custom
  width: 70px
  margin-left: 25px
  height: 4px
  border-radius: 5px
  background-color: #00D1B2
</style>
