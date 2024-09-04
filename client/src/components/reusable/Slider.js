import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";

/* 
1. children

*/

const SliderWrapper = styled("div")((props) => ({
  overflow: "hidden",
}));

const SliderTrack = styled("div")((props) => ({
  width: `${props.width}px`,
  transform: `translateX(-${props.active * props.cardwidth}%)`,
  // overflow: "hidden",
}));
const SliderList = styled("div")((props) => ({
  display: "inline-flex",
}));

const SliderCards = styled("div")((props) => ({
  width: `${props.width}%`,
}));

const Indicators = styled("div")((props) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  gap: "1rem",
}));

const Indicator = styled("div")((props) => ({
  background: `${props.active ? "blue" : "grey"}`,
  borderRadius: "50%",
  width: "2rem",
  height: "2rem",
}));

const Slider = (props) => {
  const noOfCardsToShow = props.cardsToShow || 1;
  // const cardWidth = 100 / noOfCardsToShow;
  const cardWidth = 100;
  const trackWidth = noOfCardsToShow * cardWidth;
  const [active, setActive] = useState(0);
  const noOfCards = React.Children.count(props.children);
  const [paused, setPaused] = useState(false);
  const handleChange = (value) => {
    if (value === noOfCards) setActive(0);
    if (value < 0) setActive(noOfCards - 1);
    else setActive(value);
  };

  // const handlePrev = () => {
  //   if (active === 0) setActive(noOfCards - 1);
  //   else setActive((prev) => prev - 1);
  // };

  // useEffect(() => {
  //   let interval = null;
  //   if (props.autoSlider) {
  //     interval = setInterval(() => {
  //       if (!paused) handleChange(active + 1);
  //     }, 5000);
  //   }
  //   return () => {
  //     if (props.autoSlider && interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // });

  const onSwipeStart = (e) => {
    // console.log(e.touches)
    
  };

  const onSwipeEnd = () => {};

  return (
    <SliderWrapper>
      <SliderTrack
        width={trackWidth}
        active={active}
        cardwidth={cardWidth}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => onSwipeStart(e)}
        onTouchEnd={(e) => onSwipeEnd(e)}
      >
        <SliderList>
          {props.children.map((child) => (
            <SliderCards width={cardWidth}>{child}</SliderCards>
          ))}
        </SliderList>
      </SliderTrack>
      <Indicators>
        {props.children.map((child, index) => (
          <Indicator
            active={index === active}
            onClick={() => handleChange(index)}
          />
        ))}
      </Indicators>
      <button onClick={() => handleChange(active - 1)}>Previous</button>
      <button onClick={() => handleChange(active + 1)}>Next</button>
    </SliderWrapper>
  );
};

export default Slider;
