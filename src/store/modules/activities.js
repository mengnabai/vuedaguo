import request from 'superagent'
import jsonp from 'superagent-jsonp'

const state = {
    events: [],
    temp: [],
    skip: 0,
    eventItem: {}
}

const mutations = {
    loadMore(state, payload) {
        state.skip += 3
        state.events = state.events.concat(payload.res)
    },
    getSingleEvent(state, payload) {
        state.eventItem = payload.res
    }
}

const actions = {
    /**
     * Loading more data
     * skip: 3 default
     * count: 3 default
     */
    loadMore({ commit, state }) {
        return new Promise((resolve, reject) => {
            request
               .get('/api/bonjour')
                // .get('https://api.douban.com/v2/event/list?loc=108288&start=' +
                    // state.skip + '&count=3')
                .end((err, res) => {
                    if (!err) {
                        commit({
                            type: 'loadMore',
                            res: res.body.attractions
                        })
                        resolve(res)
                    }
                })
        })
    },
    /**
     * Getting single event
     * id: event id
     */
    getSingleEvent({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/bonjour')
                // .get('https://api.douban.com/v2/event/' + payload.id)
                .use(jsonp)
                .end((err, res) => {
                    if (!err) {
                        commit({
                            type: 'getSingleEvent',
                            res: res.body
                        })
                        resolve(res)
                    }
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}