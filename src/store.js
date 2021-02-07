import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { apiHost } from "@/main.js";
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        gameName: "",
    },
    mutations: {
        createGame(state, data) {
            state.gameName = data.gameName;
            router.push('/Categories');
        },
        joinGame(state, data) {
            console.log(state);
            console.log(data);
        },
        observeGame(state, data) {
            console.log(state);
            console.log(data);
        },
    },

    actions: {
        CreateGame({ commit }) {
            axios.get(apiHost + "/game/creategame").
                then((response) => {
                    if (response.status == 200) {
                        commit('createGame', { data: response.data });
                    }
                }).catch((e) => {
                    commit('setError', {
                        error: e.response.data.error
                    });
                });
        },
        JoinGame({ commit }, data) {
            commit('joinGame', data);
        },
        ObserveGame({ commit }, data) {
            commit('observeGame', data);
        },

    },
    getters: {
    }

});