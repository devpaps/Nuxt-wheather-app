<template>
  <section class="container">
   <div class="spinner mx-auto" v-if="doneLoading === 'false'"></div>
    <main class="mx-auto text-center" v-if="doneLoading === 'OK'">
      <img class="my-5" :src="vader[wheather.currently.icon]" alt="Ikon på aktuellt väder" :title="wheather.currently.icon">
      <p>{{ wheather.currently.summary}}</p>
      <p>{{ wheather.currently.temperature.toFixed(0)}}°C grader just nu</p>
      <p>Känns som {{ wheather.currently.apparentTemperature.toFixed(0)}}°C</p>
      <p>Vind: {{ wheather.currently.windSpeed.toFixed(0)}} m/s</p>
      <p>{{ wheather.hourly.summary}}</p>
      <p>{{ wheather.daily.summary}}</p>
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
      }
    }
  },
  
  mounted() {
    this.$store.dispatch('getWheather');
  },
  computed: {
    ...mapState([
      'wheather',
      'doneLoading'
    ]),
  }  
}
</script>


<style lang="sass">
img
  width: 120px
</style>
