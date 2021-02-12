import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { apiHost } from "@/main.js";
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        gameName: "",
        category: "",
        TimePerQuestion: 0,
        TotalNumberOfQuestions: 0,
        NumberOfPlayers: 0
    },
    mutations: {
        createGame(state, gameName) {
            state.gameName = gameName;
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
        setCategory(state, category) {
            state.category = category;
            router.push('/GameSettings');
        },
        setSettings(state, data) {
            state.TimePerQuestion = data.secondsPerQuestion;
            state.TotalNumberOfQuestions = data.numberOfQuestions;
            state.NumberOfPlayers = data.numberOfPlayers;
            router.push('/Avatar');
        }
    },

    actions: {
        CreateGame({ commit }) {
            axios.get(apiHost + "/game/creategame").
                then((response) => {
                    if (response.status == 200) {
                        commit('createGame', response.data);
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

        SetCategory({ commit }, category) {
            axios.post(apiHost + "/game/setcategory",
                {
                    'Content-Type': 'application/json'
                },
                {
                    params: {
                        gameName: this.state.gameName,
                        gameCategory: category
                    }
                }).
                then((response) => {
                    if (response.status == 200) {
                        commit('setCategory', response.data);
                    }
                }).catch((e) => {
                    commit('setError', {
                        error: e.response.data.error
                    });
                });
        },

        SetSettings({ commit }, data) {
            var body = JSON.stringify({
                TimePerQuestion: data.secondsPerQuestion,
                TotalNumberOfQuestions: data.numberOfQuestions,
                NumberOfPlayers: data.numberOfPlayers
            });
            axios.post(apiHost + "/game/setsettings", body,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        gameName: this.state.gameName,
                        gameCategory: this.state.category
                    }
                },
            ).
                then((response) => {
                    if (response.status == 200) {
                        commit('setSettings', body);
                    }
                }).catch((e) => {
                    commit('setError', {
                        error: e.response.data.error
                    });
                });
        }
        

    },
    getters: {
    }

});