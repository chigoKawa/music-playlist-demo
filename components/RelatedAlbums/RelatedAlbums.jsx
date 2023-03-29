import React, { useState } from "react";
// import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import { useKeenSlider } from "keen-slider/react";
import { SliderArrow } from "../../lib/Helpers/util";

const RelatedAlbums = ({ data }) => {
  const TOTAL = data?.total;
  const items = data?.items;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    // initial: 1,
    mode: "free",
    // loop: true,
    slides: { origin: "center", perView: 3, spacing: 4 },
    range: {
      min: 1,
      max: 4,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="p-2 max-w-5xl m-auto flex flex-col space-y-4 relative">
      <h2 className="">Albums | {TOTAL} albums </h2>
      {/* {JSON.stringify(items)} */}
      {items?.length > 0 && (
        <div className="relative">
          <div ref={sliderRef} className="keen-slider  gap-4 py-6">
            {items?.map((item, itx) => {
              return (
                <div
                  className={`keen-slider__slide number-slide${
                    itx + 1
                  } w-full h-h-60x overflow-hidden rounded-lg flex items-center justify-center shadow-md bg-red-100x `}
                  key={`key-${itx}-${item?.sys?.id}`}
                >
                  <AlbumItem album={item} />
                </div>
              );
            })}
          </div>
          <div className="">
            {" "}
            {loaded && instanceRef.current && (
              <>
                <SliderArrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <SliderArrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef?.current?.track?.details?.slides?.length - 1
                  }
                />
              </>
            )}
          </div>
          <div className="">
            {" "}
            {loaded && instanceRef.current && (
              <div className="dots">
                {[
                  ...Array(
                    instanceRef?.current?.track?.details?.slides?.length
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

export default RelatedAlbums;
