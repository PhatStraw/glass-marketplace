import { useRouter } from "next/router";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";

export default function ItemSwipe(){
    return(
        <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <SwiperSlide>
          <img
            src={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=390&fit=crop&auto=format`}
            srcSet={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=390&fit=crop&auto=format&dpr=2 2x`}
            alt={"honey"}
            loading="lazy"
            style={{ height: "300px", width: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&fit=crop&auto=format`}
            srcSet={`https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&fit=crop&auto=format&dpr=2 2x`}
            alt={"honey"}
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>
    )
}