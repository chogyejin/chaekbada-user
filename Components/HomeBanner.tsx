import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';

export default function HomeBanner() {
  SwiperCore.use([Navigation, Pagination]);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Swiper
          style={{
            borderRadius: '30px',
            width: '500px',
            margin: '30px auto',
            height: '180px',
            backgroundColor: '#eeeeee',
          }}
          navigation
          pagination
          loop={true}>
          <SwiperSlide>
            <img
              src="https://chaekbada-image.s3.ap-northeast-2.amazonaws.com/banner1.png"
              width="100%"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://chaekbada-image.s3.ap-northeast-2.amazonaws.com/banner2.png"
              width="100%"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.readingnews.kr/news/photo/201909/8466_9043_2232.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
