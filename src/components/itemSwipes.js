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
            src={`https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_9606_580x@2x.jpg?v=1619898577?w=390&fit=crop&auto=format`}
            srcSet={`https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_9606_580x@2x.jpg?v=1619898577?w=390&fit=crop&auto=format&dpr=2 2x`}
            alt={"Elbo"}
            loading="lazy"
            style={{ height: "400px", width: "100%" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_9606_580x@2x.jpg?v=1619898577?w=390&fit=crop&auto=format`}
            srcSet={`https://cdn.shopify.com/s/files/1/1597/7307/products/DSC_9606_580x@2x.jpg?v=1619898577?w=390&fit=crop&auto=format&dpr=2 2x`}
            alt={"Elbo"}
            loading="lazy"
            style={{ height: "400px", width: "100%" }}
          />
        </SwiperSlide>
      </Swiper>
    )
}