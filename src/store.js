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
        playerId: "",
        inProgress: false,
        currentQuestion: null,
        players: null,
        isAdmin: false
    },
    mutations: {
        createGame(state, gameName) {
            state.gameName = gameName;
            state.isAdmin = true;
            router.push('/Categories');
        },
        join() {
            router.push('/Join');
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
        },
        startGame(state) {
            state.inProgress = true;
            state.questionId = 0
        },
        setQuestion(state, data) {
            state.currentQuestion = data;
        },
        playerJoined(state, data) {
            state.players = data.players;
        },
        joinGame(state, data) {
            state.gameName = data.gameName;
            state.TimePerQuestion = data.gameSettings.timePerQuestion;
            state.TotalNumberOfQuestions = data.gameSettings.totalNumberOfQuestions;
            state.NumberOfPlayers = data.gameSettings.numberOfPlayers;
            
            router.push('/Avatar');
        },
        gameStarted(state) {
            state.inProgress = true;
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

        Join({ commit }, data) {
            commit('join', data);
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
        },

        StartGame({ commit }, data) {
            axios.post(apiRestHost + "/game/StartGame",
                {
                    'Content-Type': 'application/json'
                },
                {
                    params: {
                        gameName: data.gameName,
                    }
                }).
                then((response) => {
                    if (response.status == 200) {
                        commit('startGame', data);
                    }
                }).catch((e) => {
                    commit('setError', {
                        error: e.response.data.error
                    });
                });
        },

        CheckAnswer({ commit }, data) {
            console.log(data);
            return axios.post(apiRestHost + "/game/CheckAnswer",
                {
                    'Content-Type': 'application/json'
                },
                {
                    params: {
                        gameName: data.gameName,
                        username: data.username,
                        questionId: data.questionId,
                        answerId: data.answerId
                    }
                }).
                then((response) => {
                    if (response.status == 200) {
                        return response.data;
                    }
                }).catch((e) => {
                    commit('setError', {
                        error: e.response.data.error
                    });
                });
        },
        GetQuestion({ commit }) {
            var state = this.state;
            axios.post(apiRestHost + "/game/GetQuestion",
                {
                    'Content-Type': 'application/json'
                },
                {
                    params: {
                        gameName: state.gameName,
                        questionId: state.questionId++,
                    }
                }).
                then((response) => {
                    if (response.status == 200) {
                        console.log("Ok");
                    }
                }).catch((e) => {
                    commit('setError', {
                        error: e.response.data.error
                    });
                });
        },

        PlayerJoined({ commit }, data) {
            commit('playerJoined', data);
        },

        JoinGame({ commit }, data) {
            axios.post(apiRestHost + "/game/JoinGame",
                {
                    'Content-Type': 'application/json'
                },
                {
                    params: {
                        gameName: data
                    }
                }).
                then((response) => {
                    if (response.status == 200) {
                        commit('joinGame', response.data);
                    }
                }).catch((e) => {
                    commit('setError', {
                        error: e.response.data.error
                    });
                });
        },
        GameStarted({ commit }) {
            commit('gameStarted')
        }



    },
    getters: {
    }
});