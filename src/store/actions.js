import chatkit from "../chatkit";

function handleError(commit, error) {
    const message = error.messsge || error.info.error_description
    commit('setError', message)
}

export default {
    async login({commit, state}, userId) {
        try {
            commit('setError', '')
            commit('setLoading', true)
            const currentUser = await chatkit.connectUser(userId)
            commit('setUser', {
                username: currentUser.id,
                name: currentUser.name
            })
            const rooms = currentUser.rooms.map(room => ({
                id: room.id,
                name: room.name
            }))
            commit('setRooms', rooms)
            const activeRoom = state.activeRoom || rooms[0]
            commit('setActiveRoom', {
                id: activeRoom.id,
                name: activeRoom.name
            })
            await chatkit.subscribeToRoom(activeRoom.id)
            commit('setReconnect', false)

            console.log(state.user)
            return true
        } catch (error) {
            console.log(error)
            handleError(commit, error)
        } finally {
            commit('setLoading', false)
        }
    },
    async changeRoom({commit}, roomId) {
        try {
            const {id, name} = await chatkit.subscribeToRoom(roomId)
            commit('SetActiveRoom', {id, name})
        } catch (error) {
            handleError(commit, error)
        }
    }
}