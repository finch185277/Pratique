import { createStore } from 'vuex'

import cart from '@/modules/cart/store'
import products from '@/modules/product/store'

const store = createStore({
  modules: {
    cart,
    products
  }
})

export default store