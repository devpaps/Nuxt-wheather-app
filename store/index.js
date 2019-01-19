import Vuex from 'vuex';
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    strict: true,
    state: {
      wheather: '',
      doneLoading: 'false',
      error: ''
    },
    actions: {
      async getWheather({commit}) {
        const CORS = 'https://cors-anywhere.herokuapp.com/';
        /* const lat = '64.1137179';
        const long = '16.1950004'; */
        const KEY = '0103817e28177f2124d9e291e737ed04';
    
        if (process.browser) {
          
          if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition( function(location, options) {
              let latitude = location.coords.latitude;
              let longitude = location.coords.longitude;
              console.log(latitude + " " + longitude);
              axios
              .get(`${CORS}https://api.darksky.net/forecast/${KEY}/${latitude},${longitude}?lang=sv&units=auto&exclude="flags,alerts,offset,minutely"`)
              .then(data => {
                commit('SET_STATUS', data.statusText)
                let wheather = data.data;
                console.log(wheather);
                commit('SET_WHEATHER', wheather)
                
              })
              .catch(() => {
                console.log(error);
                commit('SET_ERROR', {
                  state: 'Error'
                });
              })
            })
          } else {
            // geolocation is not supported
            // get your location some other way
            console.log('geolocation is not enabled on this browser')
          }
        }
        
       

      }
      
    },
    mutations: {
      SET_WHEATHER (state, wheather) {
        state.wheather = wheather;
      },
      SET_STATUS (state, doneLoading) {
        state.doneLoading = doneLoading;
      },
      SET_ERROR(state, error) {
        state.error = error;
      }
    }
  })
}


export default createStore