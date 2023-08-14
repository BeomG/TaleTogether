import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import AreaCard from "./Card";
import React, { useState, useEffect } from "react";
import getTaleAllAxios from "../../../api/tale/getTaleAll";
import UserinfoAxios from "../../../api/auth/Get/UserinfoAxios";

// 이전 화살표 디자인
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "red",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "10px",
      }}
      onClick={onClick}
    />
  );
}

// 다음 화살표 디자인
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "10px",
      }}
      onClick={onClick}
    />
  );
}

const Carousel = () => {
  const [myStories, setMyStories] = useState([]);

  const user = async () => {
    const res = await UserinfoAxios();
  };
  useEffect(() => {
    user();
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getTaleAllAxios();
        setMyStories(response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // console.log(myStories);

  const infiniteEnabled = myStories.length > 3;

  const settings = {
    dots: true,
    infinite: infiniteEnabled,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤될 슬라이드 수
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {myStories &&
          myStories.map((myStory, index) => {
            const firstPageId =
              myStory["pageList"].length > 0
                ? myStory["pageList"][0]["pageId"]
                : null;
            return firstPageId ? (
              <AreaCard
                key={index}
                myStory={myStory}
                alt={`Image ${index + 1}`}
                firstPageId={firstPageId}
              />
            ) : null;
          })}
      </Slider>
    </div>
  );
};

export default Carousel;
