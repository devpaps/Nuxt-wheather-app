<template>
  <section class="container">
   <div class="spinner mx-auto" v-if="doneLoading === 'false'"></div>
    <main class="mx-auto text-center font-sans" v-if="doneLoading === 'OK'">
      <div class="currently mx-5">
        <div class="weatherNow mb-10">
          <img :src="vader[wheather.currently.icon]" class="mx-5" alt="">
          <h1 class="text-5xl">{{ wheather.currently.temperature.toFixed(0) }}&deg;C</h1>
        </div>
        <h2 class="text-3xl mb-8">{{ wheather.currently.summary }}</h2>
        <p class="mb-2">Känns som {{ wheather.currently.apparentTemperature.toFixed(0)}}&deg;C</p>
        <p class="mb-2">Vind: {{ wheather.currently.windSpeed.toFixed(0) }} m/s</p>
        <p class="mb-10">{{ wheather.hourly.summary }}</p>
        <p class="mb-2">Temperaturer under {{ convertToDay($moment.unix(wheather.currently.time).days() ) }}en</p>
        <span class="mr-3">↑{{ wheather.daily.data[0].temperatureMax.toFixed(0) }}&deg;C</span>
        <span>↓{{ wheather.daily.data[0].temperatureMin.toFixed(0) }}&deg;C</span>
      </div>
        
        <div class="dailyWeather mt-10">
          <h4 class="text-center mb-3 underline">7 dagarsprognos</h4>
          <div class="daily text-center mx-auto my-10">
          
          <div v-for="(day, index) in wheather.daily.data.slice(1)" :key="day.index">
              <img :src="vader[day.icon]" class="mb-5 mx-5 weather-icon" alt="">
              <pre>↑{{ day.temperatureMax.toFixed(0) }}&deg;C</pre>
              <pre>↓{{ day.temperatureMin.toFixed(0) }}&deg;C</pre>
              <pre class="mt-1"> {{ convertToDay($moment.unix(day.time).days() ) }} </pre>
              <pre class="mt-1"> {{ $moment.unix(day.time).format("DD/MM") }} </pre>
              
              
              <!-- {{convertToDay(vader.time)}} -->
              <br>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import moment from 'moment'
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
      'doneLoading'
    ])
  }
}
</script>


<style lang="sass">
.currently
  .weatherNow
    display: grid
    grid-template-columns: 130px 130px
    align-items: center
    justify-content: center
  img
    width: 100px
.daily
  display: flex
  flex-wrap: wrap
  justify-content: center
  .wheaterTomorrow
    .weather-icon
      max-width: 100%
</style>
