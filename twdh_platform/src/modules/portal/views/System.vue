<template>
  <PageTitle :title="{title: '臺灣史料脈絡分析系統'}" />
  <Material />
</template>



<script>
import Material from '../components/Material'
import PageTitle from '../components/PageTitle'
export default {
  name: 'System',
  
  components: {
    Material,
    PageTitle,
  }
}
</script>
