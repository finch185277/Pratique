<template>
  <main class="main">
    <div class="container">
      <div class="header__top">
        <div class="header__top-content">
          <a class="logo"></a>	
          <span class="header__top-l" style="font-size:1.75cm;font-weight:bold;">臺灣史料數位人文學術研究平台</span><br>
        </div>
      </div>
      <SwiperSlider v-if="products.length">
        <template #title>民 國</template>
        <router-link
          :to="{ name: 'Product', params: { id: 1 } }"
          class="swiper-slide"
          v-for="item in products"
          :key="item.id"
        >
          <div class="card">
            <div class="card__image">
              <img
                :src="require(`@/assets/img/slider/${item.id}.jpg`)"
                alt=""
                class="card__img"
              />
            </div>
            <div class="card__title2">{{ item.name }}</div>
            <div class="card__price">
              <span class="card__total-price">{{
                formattedPrice(item.price)
              }}</span>
            </div>
          </div>
        </router-link>
      </SwiperSlider>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import SwiperSlider from '../components/SwiperSlider'
export default {
  name: 'Home',

  metaInfo: {
    titleTemplate: null
  },

  components: {
    SwiperSlider
  },

  data: () => ({
    slides: [
    ],
  }),

  computed: {
    ...mapGetters('products', ['products'])
  },

  methods: {
    formattedPrice(price) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    }
  },

  created() {
    this.$store.dispatch('products/getProducts', { text: 'dfjghkdfhgdrigh' })
  },

  unmounted() {
  }
}
</script>
