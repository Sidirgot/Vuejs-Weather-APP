<template>
  <div class="results">
    <section class="hero is-fullheight">
      <div class="hero-head">
        <div class="columns is-mobile">
          <div class="column is-two-quarters ">
            <i class="wi wi-day-sunny sun is-pulled-right" aria-hidden="true"></i>
          </div>
          <div class="column is-one-quarters custom-title">
             <button class="button fav-button is-pulled-right" name="button">
               <span> Add to favorites
                 <i class="fa fa-heart-o" aria-hidden="true"></i>
               </span>
             </button>
          </div>
        </div>
      </div>
      <div class="hero-body" style="align-items: stretch;">
        <!-- Costum Container box -->
        <div class="container-custom">
          <!-- Main wrapping column/row -->
          <div class="columns is-mobile ">
              <div class="column is-custom">
                <div class="columns is-marginless">
                  <div class="column is-paddingless">
                    <span class="title   is-pulled-left">{{ weekday1 }}</span>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-marginless">
                    <div class="column is-paddingless">
                      <span class="title is-pulled-left">{{ today }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Temp Side column inside the box -->
              <div class="column is-paddingless">
                <div class="columns temp">
                  <div class="column">
                    <span class="title-temp is-pulled-left" >{{ temp1 }}&#176; </span>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <span class="title city is-pulled-left" >{{ cityName}},{{ country }}</span>
                  </div>
                </div>
                <div class="columns ">
                  <div class="column">
                    <i class="wi " v-bind:class="[Today]" ></i>
                  </div>
                </div>
              </div> <!-- Temp side column -->

          </div> <!-- Main wrapping column -->
        </div> <!-- Main wrapping container -->


      </div> <!--  Hero body -->

    </section>
    <div class="hero-foot">
      <div class="wrapper">
        <div class="columns is-mobile">
          <div class="column border">
            <div class="columns">
              <div class="column">
              <span class="title1">{{ weekday2 }}</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <i class="wi" :class="[day1]"></i>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="title is-1">{{  temp2 }}&#176;</span>
              </div>
            </div>
          </div>
          <div class="column border">
            <div class="columns">
              <div class="column">
                <span class="title1"> {{ weekday3 }}</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <i class="wi" :class="[day2]"></i>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="title is-1">{{ temp3 }}&#176;</span>
              </div>
            </div>
          </div>
          <div class="column border">
            <div class="columns">
              <div class="column">
                <span class="title1">{{ weekday4 }}</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <i class="wi" :class="[day3]"></i>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="title is-1">{{ temp4 }}&#176;</span>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns">
              <div class="column">
                <span class="title1">{{ weekday5 }}</span>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <i class="wi" :class="[day4]"></i>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <span class="title is-1">{{ temp5 }}&#176;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const weather_url = "http://api.openweathermap.org/data/2.5/forecast?&appid=4820c408a302dcf5fffbfda3cf4636bc&cnt=40&units=metric";

export default {
  name: 'Results',
  data() {
    return {
      errors: [],
      cityName: '',
      country: '',
      today:'',
      weekday1: '',
      weekday2: '',
      weekday3: '',
      weekday4: '',
      weekday5: '',
      temp1:'',
      temp2:'',
      temp3:'',
      temp4:'',
      temp5:'',
      dataObj: [],
    }
  },
  created() {

    // Create url
    var requrl = `${weather_url}&q=${this.$route.query.city}`;
    // Array's to store the data
    var currentDate= [];
    var weekday = [];
    var temp = [];
    var icon = [];
    var wid = [];
    // Axios Get request for the Api call
    axios.get(requrl)
    .then(response => {
      // Get the city details
      this.cityName = response.data['city']['name'];
      this.country = response.data['city']['country'];
      // Date Loop
      for (var i = 0; i < response.data['list'].length; i++) {
        // Get the Unix code for the date
        var dateValue = response.data['list'][i]['dt'];
        // Multiple by 1000 to get the current date
        var myDate = new Date(dateValue * 1000);
        // Format the date
        currentDate.push(myDate.toLocaleString('en-US',{month: 'short', day: 'numeric'}));
        weekday.push(myDate.toLocaleString('en-US',{weekday: 'long'}));
        // Ge the date data for each date
        this.today = currentDate[0];
        this.weekday1 = weekday[0];
        this.weekday2 = weekday[8];
        this.weekday3 = weekday[16];
        this.weekday4 = weekday[24];
        this.weekday5 = weekday[32];
      }

      // Temp Loop
      for (var i = 0; i < response.data['list'].length; i++) {
        var currentTemp = response.data['list'][i]['main']['temp'];
        temp.push(Math.round(currentTemp));
        this.temp1 = temp[0];
        this.temp2 = temp[8];
        this.temp3 = temp[16];
        this.temp4 = temp[24];
        this.temp5 = temp[32];
      }
      // Set the response data to another object to be able to use it on another property
      this.dataObj = response.data;

    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  computed: {
      Today: function() {
        var weatherID = this.dataObj.list[0].weather[0].id;
        if (weatherID >= 200 && weatherID <= 232) {
          return 'wi-thunderstorm';
        } else if (weatherID >= 300 && weatherID <= 321) {
          return 'wi-sprinkle';
        } else if (weatherID >= 500 && weatherID <= 531) {
          return 'wi-rain';
        } else if (weatherID >= 600 && weatherID <= 622) {
          return 'wi-snow';
        } else if (weatherID >= 701 && weatherID <= 781) {
          return 'wi-train';
        } else if(weatherID == 800) {
          return 'wi-day-sunny';
        } else if (weatherID >= 801 && weatherID <= 804) {
          return 'wi-cloud';
        } else if (weatherID >= 900 && weatherID <= 962) {
          return 'wi-small-craft-advisory';
        }
      },
      day1: function () {
        var weatherID = this.dataObj.list[8].weather[0].id;
        if (weatherID >= 200 && weatherID <= 232) {
          return 'wi-thunderstorm';
        } else if (weatherID >= 300 && weatherID <= 321) {
          return 'wi-sprinkle';
        } else if (weatherID >= 500 && weatherID <= 531) {
          return 'wi-rain';
        } else if (weatherID >= 600 && weatherID <= 622) {
          return 'wi-snow';
        } else if (weatherID >= 701 && weatherID <= 781) {
          return 'wi-train';
        } else if(weatherID == 800) {
          return 'wi-day-sunny';
        } else if (weatherID >= 801 && weatherID <= 804) {
          return 'wi-cloud';
        } else if (weatherID >= 900 && weatherID <= 962) {
          return 'wi-small-craft-advisory';
        }
      },
      day2: function () {
        var weatherID = this.dataObj.list[16].weather[0].id;
        if (weatherID >= 200 && weatherID <= 232) {
          return 'wi-thunderstorm';
        } else if (weatherID >= 300 && weatherID <= 321) {
          return 'wi-sprinkle';
        } else if (weatherID >= 500 && weatherID <= 531) {
          return 'wi-rain';
        } else if (weatherID >= 600 && weatherID <= 622) {
          return 'wi-snow';
        } else if (weatherID >= 701 && weatherID <= 781) {
          return 'wi-train';
        } else if(weatherID == 800) {
          return 'wi-day-sunny';
        } else if (weatherID >= 801 && weatherID <= 804) {
          return 'wi-cloud';
        } else if (weatherID >= 900 && weatherID <= 962) {
          return 'wi-small-craft-advisory';
        }
      },
      day3: function () {
        var weatherID = this.dataObj.list[24].weather[0].id;
        if (weatherID >= 200 && weatherID <= 232) {
          return 'wi-thunderstorm';
        } else if (weatherID >= 300 && weatherID <= 321) {
          return 'wi-sprinkle';
        } else if (weatherID >= 500 && weatherID <= 531) {
          return 'wi-rain';
        } else if (weatherID >= 600 && weatherID <= 622) {
          return 'wi-snow';
        } else if (weatherID >= 701 && weatherID <= 781) {
          return 'wi-train';
        } else if(weatherID == 800) {
          return 'wi-day-sunny';
        } else if (weatherID >= 801 && weatherID <= 804) {
          return 'wi-cloud';
        } else if (weatherID >= 900 && weatherID <= 962) {
          return 'wi-small-craft-advisory';
        }
      },
      day4: function () {
        var weatherID = this.dataObj.list[32].weather[0].id;
        if (weatherID >= 200 && weatherID <= 232) {
          return 'wi-thunderstorm';
        } else if (weatherID >= 300 && weatherID <= 321) {
          return 'wi-sprinkle';
        } else if (weatherID >= 500 && weatherID <= 531) {
          return 'wi-rain';
        } else if (weatherID >= 600 && weatherID <= 622) {
          return 'wi-snow';
        } else if (weatherID >= 701 && weatherID <= 781) {
          return 'wi-train';
        } else if(weatherID == 800) {
          return 'wi-day-sunny';
        } else if (weatherID >= 801 && weatherID <= 804) {
          return 'wi-cloud';
        } else if (weatherID >= 900 && weatherID <= 962) {
          return 'wi-small-craft-advisory';
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../mediaQ"

.p-l-80
  padding-left: 80px

.results
  background: url('../assets/bg.jpg')
  background-size: cover
  background-repeat: no-repeat
  background-position: center
  -webkit-background-size: cover
  -moz-background-size: cover
  -o-background-size: cover
  background-size: cover
  margin-bottom: -330px
  position: relative

.sun
  color: #68408D !important
  font-size: 70px
  padding-top: 30px

.fav-button
  outline: none
  background: transparent
  border: 0
  color: #68408D
  .fa:hover
    font-size: 30px

.custom-title
  color: #68408D
  margin-top: 35px
  margin-right: 25px

.title
  color: #fff
.title1
  color: #fff
  font-size: 40px
  +mobile
    font-size: 16px
  +tablet-only
    font-size: 20px

.title-temp
  color: #fff
  font-size: 180px
  font-weight: bold
.temp
  margin-bottom: 0
  height: 220px
.city
  padding-top: 20px
  font-size: 35px
  font-weight: bold
.is-custom
  padding-top: 70px
  padding-left: 100px
  padding-right: 0
  span
    padding-left: 80px
    +mobile
      padding-left: 10px
.is-custom
  +mobile
    padding-left: 0px
.container-custom
  width: 600px
  height: 600px
  position: relative
  left: 55%
  +mobile
    left: 0
  +tablet-only
    left: 15%
  +desktop-only
    left: 35%
.hero-body
  padding-top: 0

.hero-foot
  position: absolute
  height: 330px
  width: 100%
  bottom: 0
  background: rgba(104,64,141,0.5)

.wrapper
  color: #fff
  padding-top: 35px
  margin: 0 120px
  +mobile
    margin: 0 10px

.border
  width: 60px
  border-right: 2px solid #fff

.wi
  font-size: 100px
  color: #fff
</style>
