<template>
  <section class="container mx-auto">
    <div>
      <!-- <Search/> -->

      <CurrentWheather/>

    </div>

 
  </section>
</template>

<script>
import CurrentWheather from '~/components/CurrentWheather.vue';
import Search from '~/components/Search.vue';


export default {
  data () {
    return {

    }
  },
  components: {
    CurrentWheather,
    Search
  },
  methods: {

  }
}
</script>

<style lang="sass">

.container
  @apply min-h-screen flex justify-center items-center text-center mx-auto


body
  /* background: linear-gradient(-40deg, #637CD3 0%, #2F39B5 100%) */
  background: #283251
  color: #f1f1f1
  font-family: Rubik, 'sans-serif'


.spinner
  animation: spinner 1.4s infinite linear
  background: #d5d5d8
  background: linear-gradient(to right, #d5d5d8 10%, rgba(255, 255, 255, 0) 42%)
  border-radius: 50%
  height: 40px
  position: relative
  transform: translateZ(0)
  width: 40px


.spinner
  &:before
    background: #d5d5d8
    border-radius: 100% 0 0 0
    content: ''
    height: 50%
    left: 0
    position: absolute
    top: 0
    width: 50%


.spinner
  &:after
    background: #fbfbfb
    border-radius: 50%
    bottom: 0
    content: ''
    height: 75%
    left: 0
    margin: auto
    position: absolute
    right: 0
    top: 0
    width: 75%

@keyframes spinner
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
