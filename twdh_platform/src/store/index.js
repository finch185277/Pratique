import { createStore } from 'vuex'

import products from '@/modules/product/store'

const store = createStore({
  modules: {
    products
  }
})

export default store