<template>
  <div id="app">
    <BaseHeader  />
    <router-view />
    <BaseFooter  />
  </div>
</template>

<script>
import BaseHeader from './components/BaseHeader'
import BaseFooter from './components/BaseFooter'


export default {
  data: () => ({
  }),

  components: {
    BaseHeader,
    BaseFooter
  },

  methods: {
  },

  created() {
  }
}
</script>

<style></style>
