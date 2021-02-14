import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { apiRestHost } from "@/main.js";
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        gameName: "",
        category: "",
        TimePerQuestion: 0,
        TotalNumberOfQuestions: 0,
        NumberOfPlayers: 0,
        username: "",
        avatar: "",
        playerId: ""
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
            state.TimePerQuestion = data.TimePerQuestion;
            state.TotalNumberOfQuestions = data.TotalNumberOfQuestions;
            state.NumberOfPlayers = data.NumberOfPlayers;
            router.push('/Avatar');
        },
        createPlayer(state, data) {
            state.playerId = data.id;
            state.avatar = data.avatar;
            state.username = data.username;
            router.push('/Game');
        }
    },

    actions: {
        CreateGame({ commit }) {
            axios.get(apiRestHost + "/game/CreateGame").
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
            axios.post(apiRestHost + "/game/SetCategory",
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
            var body = {
                TimePerQuestion: data.secondsPerQuestion,
                TotalNumberOfQuestions: data.numberOfQuestions,
                NumberOfPlayers: data.numberOfPlayers
            };
            axios.post(apiRestHost + "/game/SetSettings", JSON.stringify(body),
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
        },

        CreatePlayer({ commit }, data) {
            axios.post(apiRestHost + "/game/CreatePlayer",
                {
                    'Content-Type': 'application/json'
                },
                {
                    params: {
                        username: data.username,
                        avatar: data.avatar,
                        gameName: this.state.gameName
                    }
                }).
                then((response) => {
                    if (response.status == 200) {
                        data.id = response.data;
                        commit('createPlayer', data);
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