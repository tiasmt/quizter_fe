import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
export default {
    install(Vue) {
        const connection = new HubConnectionBuilder()
            .withUrl(Vue.prototype.$http.defaults.baseURL + '/gamehub')
            .configureLogging(LogLevel.Information)
            .build();

        // use new Vue instance as an event bus
        const gameHub = new Vue()
        // every component will use this.$gameHub to access the event bus
        Vue.prototype.$gameHub = gameHub
        // Forward server side SignalR events through $gameHub, where components will listen to them
        connection.on('Beat', (payload) => {
            gameHub.$emit('heart-beat', payload)
        });
        connection.on('NextQuestion', () => {
            gameHub.$emit('next-question')
        });

        let startedPromise = null;
        function start() {
            startedPromise = connection.start().catch(err => {
                console.error('Failed to connect with hub', err)
                return new Promise((resolve, reject) =>
                    setTimeout(() => start().then(resolve).catch(reject), 5000));
            })
            return startedPromise
        }
        connection.onclose(() => start());

        start();
    }
}