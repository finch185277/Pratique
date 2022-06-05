<template>
  <main class="main">
    <div class="container">
      <div class="header__top">
        <div class="header__top-content">
          <a class="logo"></a>	
          <span class="header__top-l" style="font-size:1.75cm;font-weight:bold;">臺灣史料數位人文學術研究平台</span><br>
        </div>
      </div>
      <Material />
    </div>
  </main>
</template>

<script>
// import { mapGetters } from 'vuex'
import Material from '../components/Material'
export default {
  name: 'Home',

  metaInfo: {
  },

  components: {
    Material,
  },

  data: () => ({
  }),

  computed: {
  },

  methods: {
  },

  created() {
  },

  unmounted() {
  }
}
</script>
