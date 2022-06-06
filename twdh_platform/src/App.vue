<template>
  <div id="app">
    <BaseHeader @show-sidebar="handleSidebar" />
    <router-view />
    <BaseFooter :showSideBar="isShowSideBar" />
  </div>
</template>

<script>
import BaseHeader from './components/BaseHeader'
import BaseFooter from './components/BaseFooter'
// import user from '@/modules/user/store'
export default {
  data: () => ({
    isShowSideBar: false
  }),

  components: {
    BaseHeader,
    BaseFooter
  },

  methods: {
    handleSidebar(showSideBar) {
      this.isShowSideBar = showSideBar
    }
  },

  created() {
    // if (! this.$store.hasModule('userName')) {
    // this.$store.registerModule('userName', user)
    // }
  }
}
</script>

<style></style>
