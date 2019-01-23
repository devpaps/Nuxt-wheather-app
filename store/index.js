import Vuex from 'vuex';
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    strict: true,
    state: {
      wheather: '',
      doneLoading: 'false',
      position: '',
      error: ''
    },
    actions: {
      async getWheather({
        commit
      }) {

        const CORS = 'https://cors-anywhere.herokuapp.com/';
        /* const lat = '64.1137179';
        const long = '16.1950004'; */
        const KEY = '0103817e28177f2124d9e291e737ed04';

        if (process.browser) {

          if (navigator.geolocation) {

            // var options = {
            //   enableHighAccuracy: true,
            //   timeout: 5000,
            //   maximumAge: 0
            // };
            navigator.geolocation.getCurrentPosition((location, options) => {

              let latitude = location.coords.latitude;
              let longitude = location.coords.longitude;
              let accuracy = location.coords.accuracy;
              console.log(latitude + " " + longitude);
              axios.all([
                  axios.get(`${CORS}https://api.darksky.net/forecast/${KEY}/${latitude},${longitude}?lang=sv&units=auto&exclude="flags,alerts,offset,minutely"`),
                  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBLilWwDtdymiAABzXQzt_AZ-_fiBRrrbw`)
                ])
                .then(axios.spread((data, pos) => {
                  commit('SET_STATUS', data.statusText)
                  let wheather = data.data;
                  let position = pos;
                  commit('SET_WHEATHER', wheather)
                  commit('SET_POSITION', position)
                  console.log(wheather);
                  console.log(pos);
                  console.log(accuracy);
                }, {maximumAge: 0, timeout:5000, enableHighAccuracy: true}))
                .catch((error) => {
                  console.log(error);
                  commit('SET_ERROR', {
                    state: 'Error'
                  });
                })
            })
          } else {
            // geolocation is not supported
            // get your location some other way
            alert('geolocation is not enabled on this browser')
          }
        }



      }

    },
    mutations: {
      SET_WHEATHER(state, wheather) {
        state.wheather = wheather;
      },
      SET_POSITION(state, position) {
        state.position = position;
      },
      SET_STATUS(state, doneLoading) {
        state.doneLoading = doneLoading;
      },
      SET_ERROR(state, error) {
        state.error = error;
      }
    }
  })
}


export default createStore
