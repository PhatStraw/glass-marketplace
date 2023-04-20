import { useRouter } from "next/router";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";

export default function ItemSwipe({ images }) {
  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {images.map((i) => (
        <SwiperSlide key={i.id}>
          <img
            src={`${i.url}?v=1619898577?w=390&fit=crop&auto=format`}
            srcSet={`${i.url}?v=1619898577?w=390&fit=crop&auto=format`}
            alt={"Elbo"}
            loading="lazy"
            style={{ height: "400px", width: "100%" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
