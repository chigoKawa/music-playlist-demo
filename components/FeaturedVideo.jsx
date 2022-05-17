import _ from "lodash";
// import Xray from "./Xray";
import dynamic from "next/dynamic";

const Xray = dynamic(() => import("./Xray"), { ssr: false });
const FeaturedVideo = (props) => {
  console.log("youtubeVideoID", props);
  const youtubeVideoID = _.get(props, "fields.youtubeVideo");
  const youtubeVideoTitle = _.get(props, "fields.title");
  const title = _.get(props, "fields.title");
  const entryId = _.get(props, "sys.id");
  const contentType = _.get(props, "sys.contentType.sys.id");

  // const youtubeVideoTitle = _.get(props, "fields.youtubeVideoId.fields.title");

  if (!youtubeVideoID) {
    return "No Video Data";
  }

  return (
    <>
      <Xray contentType={contentType} entryId={entryId} entryTitle={title}>
        <div className="mb-4 flex flex-col space-y-8 w-full">
          <h4>{youtubeVideoTitle}</h4>

          <h6 className="">Featured Video</h6>
          <iframe
            className="w-full min-w-max  h-autox"
            width="100%"
            // height="315"
            height="400"
            src={`https://www.youtube.com/embed/${youtubeVideoID}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Xray>
    </>
  );

  return (
    <div className="lg:hiddenx mb-4 bg-gray-50 p-4 rounded-md overflow-hidden flex flex-col items-center">
      <figure className="relative w-full h-full p-2">
        <iframe
          // style={{ height: `calc(60vw/1.77)` }}
          style={{ height: `calc(62vw/1.77)` }}
          className="relativex top-0x left-0x  w-full h-full p-2"
          title={title}
          // src={`https://www.youtube.com/embed/${youtubeVideoID}`}
          src={`https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Ffast.wistia.net%2Fembed%2Fiframe%2F7t7j1guzm2&url=https%3A%2F%2Fcontentful.wistia.com%2Fmedias%2F7t7j1guzm2&image=https%3A%2F%2Fembed-ssl.wistia.com%2Fdeliveries%2Fa1d6b85eab6175c2690c37e94248d27891e422fb.jpg%3Fimage_crop_resized%3D960x540&key=40cb30655a7f4a46adaaf18efb05db21&type=text%2Fhtml&schema=wistia`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </figure>
    </div>
  );
};

export default FeaturedVideo;
