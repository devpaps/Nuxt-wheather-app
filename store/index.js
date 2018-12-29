import Vuex from 'vuex';
import axios from '~/plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      wheather: '',
      doneLoading: 'false',
      error: ''
    },
    actions: {
      async getWheather({commit}) {
        const CORS = 'https://cors-anywhere.herokuapp.com/';
        const lat = '64.1137179';
        const long = '16.1950004';

       await axios
          .get(`${CORS}https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${long}?lang=sv&units=auto`)
          .then(data => {
            commit('SET_STATUS', data.statusText)
            console.log(data);
            let wheather = data.data;
            console.log(wheather);
            commit('SET_WHEATHER', wheather)
            
          })
          .catch(error => {
            console.log(error);
            commit('SET_ERROR', error);
          })

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