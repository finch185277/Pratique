import { createStore } from 'vuex'

// import portals from '@/modules/portal/store'
import user from '@/modules/user/store'

const store = createStore({
  modules: {
    // portals,
    userName: user
  }
})

export default store