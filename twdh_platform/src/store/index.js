import { createStore } from 'vuex'

import user from '@/modules/user/store'

const store = createStore({
  modules: {
    user,
  }
})

export default store