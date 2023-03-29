import React, { useState } from "react";
import SongItem from "./SongItem";
import { useKeenSlider } from "keen-slider/react";

const RelatedSongs = ({ data }) => {
  const TOTAL = data?.total;
  const items = data?.items;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    // initial: 0,
    mode: "snap",
    // loop: true,
    slides: { origin: "center", perView: 3, spacing: 4 },
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    range: {
      // min: -3,
      // max: 3,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <div className="p-2 max-w-5xl m-auto flex flex-col space-y-4 relative px-2">
      <h2 className="">Songs | {TOTAL} songs </h2>
      {/* {JSON.stringify(items)} */}
      {items?.length > 0 && (
        <div className="relative w-full">
          <div
            ref={sliderRef}
            className="keen-slider gap-2 md:gap-4 py-10 w-full"
          >
            {items?.map((item, itx) => {
              return (
                <div
                  // style={{ minWidth: "200px" }}
                  className={`keen-slider__slide number-slide${
                    itx + 1
                  } w-full overflow-hidden rounded-lg flex items-center justify-center shadow shadow-white `}
                  key={`key-${itx}-${item?.sys?.id}`}
                >
                  <SongItem song={item} />
                </div>
              );
            })}
          </div>
          <div className="">
            {" "}
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                  }
                />
              </>
            )}
          </div>
          <div className="">
            {loaded && instanceRef.current && (
              <div className="dots">
                {[
                  ...Array(
                    instanceRef.current.track.details.slides.length
                  ).keys(),
                ].map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={
                        "dot" + (currentSlide === idx ? " active" : "")
                      }
                    ></button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default RelatedSongs;
