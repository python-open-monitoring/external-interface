import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : JSON.parse(localStorage.getItem('user')) || '',
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    updateToken(state, data){
      const token = data.token;
      let user = {}
      user.id = data.id;
      user.username = data.username;
      user.email = data.email;
      user.refresh_token = data.refresh_token; 

      axios.defaults.headers.common['Authorization'] = token;
      state.user = user;
      state.token = token;          
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
    },
    removeToken(state){
      delete axios.defaults.headers.common['Authorization']
      state.user = null;
      state.token = null;      
      localStorage.removeItem('user');
      localStorage.removeItem('token');    
    }    
  },
  actions: {
    loginUser({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_EXTERNAL_GATE}/user/login/`, 
              data: data, 
              method: 'POST' })     
        .then(response => {
          commit('updateToken', response.data)
          resolve(response)
        })
        .catch(err => {        
          commit('removeToken')
          reject(err)
        })
      })
    },
    registerUser({commit}, data){
      return new Promise((resolve, reject) => {
        axios({url: `${process.env.VUE_APP_EXTERNAL_GATE}/user/register/`, 
              data: data, 
              method: 'POST'})
        .then(response => {
          commit('updateToken', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('removeToken')
          reject(err)
        })
      })
    },    
    logoutUser({commit}){
      return new Promise((resolve) => {
        commit('removeToken')
        resolve()
      })
    },
    refreshToken({commit}){
      let refresh_token =  this.state.user.refresh_token;
      if (refresh_token) {
        axios.post(`${process.env.VUE_APP_EXTERNAL_GATE}/user/refresh-token/`, {headers: { 'Authorization': refresh_token}})
          .then((response) => {
              commit('updateToken', response.data)
            })
          .catch(() => {
              commit('removeToken')
          })
      } else {
        commit('removeToken')  
      }    
    },     
    inspectTokens({commit}){
      let token = this.state.token;
      let refresh_token = this.state.user.refresh_token;

      if(token && refresh_token){

        const decoded_refresh_token = jwt_decode(refresh_token);
        
        const refresh_exp = decoded_refresh_token.exp
        const refresh_iat = decoded_refresh_token.iat

        if(refresh_exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - refresh_iat < 628200){
          commit('removeToken')
        } else {

          const decoded_token = jwt_decode(token);
          const exp = decoded_token.exp
          const iat = decoded_token.iat 

          if(exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - iat < 628200){
            this.dispatch('refreshToken')
          } 
        }

      } else {
        commit('removeToken')  
      } 
    }      
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authUser: state => {
      if (state.user) {
          try {
            return state.user
          } catch(error) {
            return {}
          }
      } else {
          return {}
      }
    }
  }
})
