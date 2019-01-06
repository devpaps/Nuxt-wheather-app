<template>
  <section class="container">
   <div class="spinner mx-auto" v-if="doneLoading === 'false'"></div>
    <main class="mx-auto text-center font-sans" v-if="doneLoading === 'OK'">
      <div v-if="wheather.currently.temperature.toFixed(0) >= 0">
        <img class="my-5" :src="vader[wheather.currently.icon]" alt="Ikon på aktuellt väder" :title="wheather.currently.icon">
        <h1 class="text-5xl">{{ wheather.currently.temperature.toFixed(0) }}&deg;C</h1>
        <h2 class="text-3xl mb-8">{{ wheather.currently.summary}}</h2>
        <p class="mb-2">Känns som {{ wheather.currently.apparentTemperature.toFixed(0)}}&deg;C</p>
        <p class="mb-2">Vind: {{ wheather.currently.windSpeed.toFixed(0)}} m/s</p>
        <p class="mb-2">{{ wheather.hourly.summary}}</p>
      </div>
        
        <div class="dailyWeather mt-10">
          <h4 class="text-center mb-3">Väderprognos</h4>
          <div v-if="doneLoading === 'OK'" class="daily text-center mx-auto">
          <div class="wheaterTomorrow">
            <img :src="vader[wheather.daily.data[1].icon]" class="mb-5 mx-5" alt="">
            <pre>↑{{ wheather.daily.data[1].temperatureMax.toFixed(0) }}&deg;C</pre>
            <pre>↓{{ wheather.daily.data[1].temperatureMin.toFixed(0) }}&deg;C</pre>
          </div>
          <div class="wheaterTomorrow">
            <img :src="vader[wheather.daily.data[2].icon]" class="mb-5 mx-5" alt="">
            <pre>↑{{ wheather.daily.data[2].temperatureMax.toFixed(0) }}&deg;C</pre>
            <pre>↓{{ wheather.daily.data[2].temperatureMin.toFixed(0) }}&deg;C</pre>
          </div>
          <div class="wheaterTomorrow">
            <img :src="vader[wheather.daily.data[3].icon]" class="mb-5 mx-5" alt="">
            <pre>↑{{ wheather.daily.data[3].temperatureMax.toFixed(0) }}&deg;C</pre>
            <pre>↓{{ wheather.daily.data[3].temperatureMin.toFixed(0) }}&deg;C</pre>
          </div>
          <div class="wheaterTomorrow">
            <img :src="vader[wheather.daily.data[4].icon]" class="mb-5 mx-5" alt="">
            <pre>↑{{ wheather.daily.data[4].temperatureMax.toFixed(0) }}&deg;C</pre>
            <pre>↓{{ wheather.daily.data[4].temperatureMin.toFixed(0) }}&deg;C</pre>
          </div>
        </div>
        </div>
    </main>
  </section>
</template>

<script>
import {mapState} from 'vuex';

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
      temp: ''
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
  },
  methods: {

  }
}
</script>


<style lang="sass">
.daily
  display: flex
  flex-wrap: wrap
  justify-content: center
  .wheaterTomorrow
    img
      max-width: 65px
img
  width: 120px
</style>
