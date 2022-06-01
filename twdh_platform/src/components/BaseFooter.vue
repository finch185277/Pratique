<template>
  <footer class="footer">
    <span class="scroll__top" @click="goTop" v-show="showScrollTop"></span>
    <div class="footer__main">
      <div class="footer__team">
        <div class="footer__copy">臺灣大學數位人文研究中心 版權所有 © All Rights Reserved. 台北市大安區 106 羅斯福路四段一號 臺灣大學 TEL: 02-33669847
        </div>
      </div>
    </div>
    <div class="overlay" :class="{ 'overlay--is-active': showSideBar }"></div>
  </footer>
</template>

<script>
export default {
  name: 'BaseFooter',

  props: {
    showSideBar: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    showScrollTop: false,
    scrollTimeout: null
  }),

  methods: {
    handleScroll() {
      if (this.scrollTimeout) return

      console.log('user scrolled')

      this.scrollTimeout = setTimeout(() => {
        this.showScrollTop = window.scrollY > 200

        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = 0
      }, 150)
    },
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },

  mounted() {
    document.addEventListener('scroll', this.handleScroll)
  },

  unmounted() {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style></style>
