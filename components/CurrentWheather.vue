<template>
  <section class="main">
  <!--   <div class="theme-switch-wrapper">
      <label class="theme-switch" for="checkbox">
        <input type="checkbox" id="checkbox" />
        <div class="slider round"></div>
      </label>
        <em>Enable Dark Mode!</em>
    </div> -->
   <div class="spinner mx-auto" v-if="doneLoading === 'false'"></div>
    <main class="mx-auto" v-if="doneLoading === 'OK'">
      <div class="position text-left my-10">
        <img src="~/assets/images/position.svg" alt="GPS position image" style="width: 20px">
        <span class="my-10 font-bold text-xl">{{position.data.results[0].address_components[1].long_name}} - </span>
          <span class="mb-5 font-bold text-sm">Uppdaterad den {{($moment.unix(wheather.currently.time).format('LLL')) }}</span>
      </div>
      <div class="currently text-left">
        <div class="weatherNow mb-10">
          <h1 class="text-5xl text-center sm:mt-5">{{ wheather.currently.temperature.toFixed(0) }}&deg;C</h1>
          <img :src="vader[wheather.currently.icon]" class="today" alt="Image on current weather">
          <p class="mb-2 font-bold text-sm">Känns som {{ wheather.currently.apparentTemperature.toFixed(0)}}&deg;C</p>
        </div>
          <p class="mb-5 font-bold text-sm">{{wheather.currently.pressure}} QNH</p>

        <h2 class="my-3">{{ wheather.currently.summary }}</h2>
        <p class="mb-2"><span class="font-bold">Vind:</span> {{ wheather.currently.windSpeed.toFixed(0) }} m/s</p>
        <p class="mb-10">{{ wheather.hourly.summary }}</p>
        <p class="mb-2">Temperaturer under {{ convertToDay($moment.unix(wheather.currently.time).days() ) }}en</p>
        <span class="mr-3 font-bold">↑{{ wheather.daily.data[0].temperatureMax.toFixed(0) }}&deg;C</span>
        <span class="font-bold text-blue-light">↓{{ wheather.daily.data[0].temperatureMin.toFixed(0) }}&deg;C</span>
      </div>
        
      <div class="dailyWeather mt-10">
        <h4 class="text-center mb-3 text-2xl underline">7 dagarsprognos</h4>
        <p class="text-left mt-5"><span class="font-bold block mb-1">Sammanfattning: </span> {{wheather.daily.summary}}</p>
        <div class="daily text-left my-10">
          <div class="mx-5" v-for="day in wheather.daily.data.slice(1)" :key="day.index">
            <p class="my-5 text-light font-bold"> {{ convertToDay($moment.unix(day.time).days() ) }} </p>
            <img :src="vader[day.icon]" class="mb-5 weather-icon block mx-auto" alt="">
            <p class="font-bold">↑{{ day.temperatureMax.toFixed(0) }}&deg;C</p>
            <p class="font-bold text-blue-light">↓{{ day.temperatureMin.toFixed(0) }}&deg;C</p>
            <p class="mt-1"> {{ $moment.unix(day.time).format("DD/MM") }} </p>
            <br>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import moment from 'moment';



export default {
  data() {
    return {
      vader: {
        'clear-day': require('../assets/images/clear-day.svg'),
        'partly-cloudy-day': require('../assets/images/partly-cloudy-day.svg'),
        'clear-night': require('../assets/images/clear-night.svg'),
        'partly-cloudy-night': require('../assets/images/partly-cloudy-night.svg'),
        'cloudy': require('../assets/images/cloudy.svg'),
        'rain': require('../assets/images/rain.svg'),
        'sleet': require('../assets/images/sleet.svg'),
        'fog': require('../assets/images/fog.svg'),
        'snow': require('../assets/images/snow.svg'),
        'wind': require('../assets/images/wind.svg')
      },
      dagar: {
        0: 'Söndag',
        1: 'Måndag',
        2: 'Tisdag',
        3: 'Onsdag',
        4: 'Torsdag',
        5: 'Fredag',
        6: 'Lördag',
      },
      error: ''
    }
  },
  methods: {
    convertToDay(value){
      return this.dagar[value]
    }
  },
  mounted() {
    this.$store.dispatch('getWheather');
  },
  computed: {
    ...mapState([
      'wheather',
      'doneLoading',
      'position'
    ])
  }
}
</script>


<style lang="sass">
.main
  max-width: 100vw
  margin: 0 auto
  padding: 0 1rem
  .currently
    background: rgba(255,255,255, 0.2)
    padding: 1rem
    border-radius: 12px
    .weatherNow
      display: grid
      grid-template-columns: 1fr 1fr
      align-items: center
      justify-content: center
      margin: auto
      @media (max-width:330px)
        display: block
        img
          margin: 1rem 0
    img
      width: 100%
.daily
  display: flex
  flex-wrap: nowrap
  overflow-x: auto
  border-radius: 12px
  background: rgba(255,255,255, 0.2)
  -webkit-overflow-scrolling: touch
  -ms-overflow-style: -ms-autohiding-scrollbar
  div
    &:nth-last-of-type(1)
      padding: 0 1.25rem 0 0
  .wheaterTomorrow
    .weather-icon
      max-width: 100%
.theme-switch-wrapper
  display: flex
  align-items: center

em
  margin-left: 10px
  font-size: 1rem

.theme-switch
  display: inline-block
  height: 34px
  position: relative
  width: 60px
  input
    display: none

.slider
  background-color: #ccc
  bottom: 0
  cursor: pointer
  left: 0
  position: absolute
  right: 0
  top: 0
  transition: .4s
  &:before
    background-color: #fff
    bottom: 4px
    content: ""
    height: 26px
    left: 4px
    position: absolute
    transition: .4s
    width: 26px

input:checked + .slider
  background-color: #66bb6a
  &:before
    transform: translateX(26px)

.slider.round
  border-radius: 34px
  &:before
    border-radius: 50%
</style>
