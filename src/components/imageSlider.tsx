import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation"
import styles from './styles/imageSlider.module.scss'

function ImageSlider() {
  const slides = [
    'https://images.unsplash.com/photo-1460904041914-f2b315f93560?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDY2Nzd8MHwxfHNlYXJjaHw0M3x8RnJhbmNlfGVufDB8fHx8MTY0NzMxNjIyNw&ixlib=rb-1.2.1&q=85',
    'https://images.unsplash.com/photo-1508050919630-b135583b29ab?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDY2Nzd8MHwxfHNlYXJjaHw0NHx8RnJhbmNlfGVufDB8fHx8MTY0NzMxNjIyNw&ixlib=rb-1.2.1&q=85',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    
  ]
  
  return ( 
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={ 1.25 }
        breakpoints={{
          1536: {
            slidesPerView:2.5,
            coverflowEffect:{
              rotate: 50,
              depth:150,
              modifier:1
            },
          },
        }}
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
        {slides.map((slide)=> {
          return ( 
            <SwiperSlide className={styles.swiperSlide}>
              <img src={slide}/>
            </SwiperSlide> 
          )
        })}
      </Swiper>
  );
}

export default ImageSlider;