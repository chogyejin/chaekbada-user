import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';

export default function HomeBanner() {
  SwiperCore.use([Navigation, Pagination]);

  return (
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
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide style={{ backgroundColor: 'orange' }}>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
      </Swiper>
    </div>
  );
}
