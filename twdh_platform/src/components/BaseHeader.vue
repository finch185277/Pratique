<template>
  <header class="header header--bg">
    <div class="container">
      <div class="navbar">
        <div class="navbar__row">
          <div
            class="navbar__items"
            :class="{ 'navbar__items--is-active': showSideBar }"
          >
            <ul class="navbar__ul">
              <li class="navbar__item">
                <router-link
                  :to="{ name: 'Home' }"
                  class="navbar__link navbar__link--is-active"
                  >首頁</router-link
                >
              </li>
              <li class="navbar__item">
                <router-link :to="{ name: 'About' }" class="navbar__link"
                  >平台介紹</router-link
                >
              </li>
              <li class="navbar__item">
                <router-link :to="{ name: 'About' }" class="navbar__link"
                  >訊息公告</router-link
                >
              </li>  
               <li class="navbar__item">
                <router-link :to="{ name: 'Material' }" class="navbar__link"
                  >臺灣史料脈絡分析系統</router-link
                >
              </li>
              <li class="navbar__item">
                <router-link :to="{ name: 'About' }" class="navbar__link"
                  >Opendata</router-link
                >
              </li>   
              <li class="navbar__item">
                <router-link :to="{ name: 'About' }" class="navbar__link"
                  >T-DocuSky</router-link
                >
              </li>       
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'BaseHeader',

  data: () => ({
    isBasketDropDown: false,
    isAccountDropDown: false,
    showSideBar: false
  }),

  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['count'])
  },

  methods: {
    showDropDownBasket() {
      this.isAccountDropDown = false
      this.isBasketDropDown = !this.isBasketDropDown
    },
    showDropDownAccount() {
      this.isBasketDropDown = false
      this.isAccountDropDown = !this.isAccountDropDown
    },
    eventListener(event) {
      if (!event.target.closest('.header__basket,.header__account')) {
        this.isBasketDropDown = false
        this.isAccountDropDown = false
      }
      if (!event.target.closest('.navbar')) {
        this.showSideBar = false

        this.$emit('show-sidebar', false)
      }
    },
    toggleSidebar() {
      this.showSideBar = !this.showSideBar

      this.$emit('show-sidebar', this.showSideBar)
    },
    formattedPrice(price) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    },
    ...mapActions('cart', ['removeItem'])
  },

  mounted() {
    document.addEventListener('click', this.eventListener)
  },

  unmounted() {
    document.removeEventListener('click', this.eventListener)
  }
}
</script>

<style></style>
