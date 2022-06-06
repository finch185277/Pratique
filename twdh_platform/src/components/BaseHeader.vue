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
                <router-link :to="{ name: 'System' }" class="navbar__link"
                  >臺灣史料脈絡分析系統</router-link
                >
              </li>
              <li class="navbar__item">
                <router-link :to="{ name: 'OpendataIndex' }" class="navbar__link"
                  >Open Data</router-link
                >
              </li>   
              <li class="navbar__item">
                <router-link :to="{ name: 'TdocuSkyIndex' }" class="navbar__link"
                  >T-DocuSky</router-link
                >
              </li>  
              <li class="navbar__item">
                <router-link :to="{ name: 'RelatedLink' }" class="navbar__link"
                  >相關連結</router-link
                >
              </li>      
            </ul>
          </div>

          <div class="header__account">
            <span
              class="header__account-icon"
              @click="showDropDownAccount"
            ></span>
            <div
              class="header__dropdown header__dropdown--w200"
              :class="{ 'header__dropdown--is-active': isAccountDropDown }"
            >
              <div class="header__dropdown-content">
                <router-link
                  :to="{ name: 'Login' }"
                  class="header__account-link"
                  >登入</router-link
                >         
              </div>
            </div>
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
