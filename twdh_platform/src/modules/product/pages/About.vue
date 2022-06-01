<template>
  <div class="about">
    <span  style="margin-left: 50px; margin-bottom: 20px;">  <h1>平台介紹</h1></span>
    <div class="introduction">
      歡迎使用<span style="font-weight: bold">臺灣史料數位人文研究平台</span>！<br>
      數位人文是運用數位資源，透過資訊科技，從事人文研究的一個新興研究方法。本平台於 2022 年成立，是臺灣第一個以臺灣史料為主軸建構的數位人文研究平台。
      這十餘年來，臺灣大學數位人文研究中心建置了 <span style="color: red;">40</span> 餘個臺灣史料脈絡分析系統，内容大多數為臺灣第一手史料與典籍。由於内容的唯一和獨特性與强大的數位人文分析與視覺化功能，這些史料脈絡分析系統已成爲臺灣研究不可或缺的研究資源。
      另為達到資料保存與整合檢索之目的，臺灣史料數位人文平台透過 Open Data 平台進行格式轉換與提供資料整合之服務。
      並整合 2018 年推出的「DocuSky 數位人文學術研究平台」，提供臺灣史料研究個人化數位環境設施和一站式整合的數位人文服務。				
    </div>
    
    <span  style="margin-left: 50px; margin-top: 3%;">  <h1>教學文件</h1></span>
    <div class="introduction">
			123
    </div>
    <span  style="margin-bottom: 5%;"></span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'About',

  setup() {
    const store = useStore()

    store.dispatch('products/getProducts', '')

    return {
      products: computed(() => store.state.products.products)
    }
  }
}
</script>
