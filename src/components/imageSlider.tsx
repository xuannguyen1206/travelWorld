 import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"
import styles from './styles/imageSlider.module.scss'
import { useRef } from "react";

interface sliderProp {
  changeSlide?: (value:number) => void
  slides: Array<string> 
}

function ImageSlider({changeSlide, slides}: sliderProp) {
  return ( 
      <Swiper 
        //
        onSlideChange={(swiper) => {  if(changeSlide) changeSlide(swiper.activeIndex)}} 
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={ 1.25 }
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 4 ,
          slideShadows: true,
        }}
        navigation={true}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.container}
      > 
        {slides.map((slide,index)=> {
          return ( 
            <SwiperSlide className={styles.swiperSlide} key={index}>
              <img src={slide}/>
            </SwiperSlide> 
          )
        })}
      </Swiper>
  );
}

export default ImageSlider;