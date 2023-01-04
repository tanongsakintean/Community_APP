import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { baseImg } from "../constants/constant";

function CarouselPreview({ image, U_id, P_id }) {
  return (
    <Swiper
      className="h-full"
      style={{
        "--swiper-navigation-color": "#fff",
      }}
      navigation={true}
      pagination={{
        type: "fraction",
      }}
      modules={[Navigation, Pagination]}
      spaceBetween={5}
      slidesPerView={1}
      loop={true}
    >
      {image.split(",").map((src) => {
        return (
          <SwiperSlide key={src}>
            <img
              src={baseImg + U_id + "/posts/" + P_id + "/" + src}
              className="object-cover h-full w-full"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CarouselPreview;
