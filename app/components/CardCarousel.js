'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import LectureCard from "@/app/components/lecture_card/LectureCard";
import { style } from "./CardCarousel.css"
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CardCarousel = ({ data, level }) => {
  const cards = data
  const [cardContent, setCardContent] = useState(data);

  const handleButtonClick = () => {
    setCardContent(true);
  };

  return (
    <div className="container  h-100">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        style={{ height: '600px' }}
        breakpoints={{
          640: { slidesPerView: 1 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className={`card w-75 text-center m-auto ${card.score_required > level ? "blocked" : ""}`} >
              <img src={card.imagen} className="card-img-top" alt={card.name} />
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">{card.description}</p>
              </div>
              <div className="card-footer">
                <div className="col overflow-column" style={{maxHeight:'200px'}}>
                  {
                    card.lectures.map(element => {
                      return <LectureCard key={element.name} data={element} currentScore={level} />
                    })
                  }
                </div>
              </div>
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default CardCarousel;
