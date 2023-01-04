import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
function Preview({ Img }) {
  return (
    <Swiper
      className="w-full h-full rounded-b-lg  rounded-r-none "
      style={{
        "--swiper-navigation-color": "#fff",
        position: "absolute",
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
      {Img.map((src) => {
        return (
          <SwiperSlide key={src.path}>
            <img
              className=" object-cover h-full w-full"
              src={URL.createObjectURL(src)}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Preview;
