<template>
  <div class="slider">
    <div class="slider__head">
      <span class="slider__title">民 國</span>
    </div>
    <div class="slider__content">
      <div class="swiper-container" ref="sliderSwiper">
        <div class="swiper-wrapper">
          
            <div class="card">
                <a href="http://ahdas.drnh.gov.tw/" target="_blank">
                    <div class="card__image">
                        <img :src="require(`@/assets/img/slider/1.jpg`)" 
                                alt="國史館檔案史料文物查詢系統"
                                class="card__img"
                        />
                    </div>
                    <div class="card__title">國史館檔案史料文物查詢系統</div>
                    <div class="card_content">系統建置：國史館</div>                
                 </a>
            </div>
            <div class="card">
                <a href="https://onlinearchives.th.gov.tw/index.php?act=Archive" target="_blank">
                    <div class="card__image">
                        <img :src="require(`@/assets/img/slider/2.jpg`)" 
                                alt="國史館臺灣文獻館文獻檔案查詢系統"
                                class="card__img"
                        />
                     </div>
                    <div class="card__title">國史館臺灣文獻館文獻檔案查詢系統</div>
                    <div class="card_content">系統建置：國史館臺灣文獻館</div> 
				        </a>						 
            </div>
            <div class="card">
                <a href="https://drtpa.th.gov.tw/" target="_blank">
                    <div class="card__image">
                        <img :src="require(`@/assets/img/slider/3.jpg`)" 
                                alt="臺灣省議會史料總庫"
                                class="card__img"
                        />
                    </div>
                    <div class="card__title">臺灣省議會史料總庫</div>
                    <div class="card_content">系統建置：臺灣省諮議會</div>
				        </a>		
			      </div>			 
            <div class="card">
                <a href="http://journal.th.gov.tw/" target="_blank">
                    <div class="card__image">
                        <img :src="require(`@/assets/img/slider/4.jpg`)" 
                                alt="中華民國地方議會議事錄總庫"
                                class="card__img"
                        />
                    </div>
                    <div class="card__title">中華民國地方議會議事錄總庫</div>
                    <div class="card_content">系統建置：臺灣省諮議會及各地方議會</div> 
				        </a>			
			      </div>
  		
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import SwiperCore, { Navigation } from 'swiper/core'

SwiperCore.use([Navigation])

export default {
  name: 'Material',
}
</script>
