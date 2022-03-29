import _ from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MediaWrapper from "../MediaWrapper";
const Xray = dynamic(() => import("../Xray"), { ssr: false });
const ImageGallery = (props) => {
  console.log("find internal", props);
  const entryId = _.get(props, "sys.id");
  const contentType = _.get(props, "sys.contentType.sys.id");
  const entryTitle = _.get(props, "fields.title")
    ? _.get(props, "fields.title")
    : _.get(props, "fields.internalName");
  const fields = _.get(props, "fields");
  const images = _.get(fields, "images");
  const [current, setCurrent] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const handleNext = () => {
    try {
      if (current + 1 === images.length) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    } catch (error) {}
  };

  const handlePrevious = () => {
    try {
      if (current - 1 === -1) {
        setCurrent(images.length - 1);
      } else {
        setCurrent(current - 1);
      }
    } catch (error) {}
  };

  useEffect(() => {
    // setInterval(() => {
    //   console.log("oya change MediaWrapper");
    //   handleNext();
    // }, 1000);

    const changeFocusedImage = setInterval(() => {
      handleNext();

      console.log("oya change MediaWrapper");
    }, 10000);

    return () => {
      clearInterval(changeFocusedImage);
    };
  }, [handleNext]);

  return (
    <Xray contentType={contentType} entryId={entryId} entryTitle={entryTitle}>
      {/* <InnerLayout> */}
      {/* {JSON.stringify(images.length)} */}

      <div className="relative w-full ">
        <br />
        {/* {JSON.stringify(_.get(images[current], "fields.asset.fields.file.url"))} */}
        <h1 className="">{entryTitle}</h1>
        <div className="relative w-full flex flex-col lg:flex-row lg:space-x-4 items-center lg:p-8 lg:h-[550px]">
          <div className="w-2/12x hidden lg:block  ">
            <button onClick={handlePrevious}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            style={{
              background: ` linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%),url(${_.get(
                images[current],
                "fields.asset.fields.file.url"
              )})`,
            }}
            className=" w-full  bg-center bg-cover  relative flex flex-col items-center justify-items-center h-full  p-2 bg-blau  overflow-hidden"
          >
            {/* <div className="relative  w-[300px] lg:w-[1000px]  flex flex-col items-center justify-items-center">
              <div className="w-full lg:min-w-full  lg:max-w-7xl  p-2 ">
                <div className="relative shadow-xl border-2 overflow-hidden w-full transition-all delay-100">
                  <MediaWrapper
                    classes={`h-[250px] lg:h-[350px] w-auto `}
                    {...images[current]}
                  />
                </div>
              </div>
            </div> */}
            <div
              className="  flex flex-col items-center justify-items-center 
            relative border-2x overflow-hidden w-full transition-all delay-100 h-full p-2 lg:p-10 "
            >
              <div className="z-20">
                <MediaWrapper
                  classes={` h-[200px] lg:h-[350px] w-auto object-cover shadow-lg rounded-lg `}
                  {...images[current]}
                />
              </div>

              <div className="absolute transition-all delay-200 z-10 hover:rotate-2 hover:left-0  rotate-12  top-12  left-16 right-0 ">
                <MediaWrapper
                  classes={`h-[200px] lg:h-[350px] w-auto object-cover shadow-lg rounded-lg border-2 border-black`}
                  {...images[current]}
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:block  ">
            <button onClick={handleNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* </InnerLayout> */}
    </Xray>
  );
};

export default ImageGallery;
