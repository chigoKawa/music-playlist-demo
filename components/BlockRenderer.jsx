import _ from "lodash";
import dynamic from "next/dynamic";
// import Xray from "./Xray";
import Artist from "../components/artist/Artist";
import FeaturedVideo from "./FeaturedVideo";
import ImageGallery from "./imageGallery/ImageGallery";
import MediaWrapper from "./MediaWrapper";

// import ArticleList from "./Article/ArticleList";
// import ArticlePreview from "./Article/ArticlePreview";
// import AssetComponent from "./Asset/AssetComponent";
// import CategoryCard from "./Category/CategoryCard";

const componentMap = {
  artist: { element: Artist },
  mediaWrapper: { element: MediaWrapper },
  youtubeVideo: { element: FeaturedVideo },

  imageGallery: { element: ImageGallery },
  //   Asset: { element: AssetComponent },
};

// artist/youtubeVideo/mediaWrapper

const Xray = dynamic(() => import("./Xray"), { ssr: false });
const BlockRenderer = (props) => {
  const section = _.get(props, "section");
  const entryId = _.get(section, "sys.id");
  const contentTypeHolder = _.get(section, "sys.contentType.sys.id");
  const contentType = contentTypeHolder
    ? contentTypeHolder
    : _.get(section, "sys.type");
  const entryTitle = _.get(section, "fields.title")
    ? _.get(section, "fields.title")
    : _.get(section, "fields.internalName");
  const fields = _.get(section, "fields");
  const sections = _.get(fields, "sections");

  const Component = componentMap[contentType];

  if (!Component) {
    return null;
  }

  return (
    <div className="w-full  ">
      {/* <Xray contentType={contentType} entryId={entryId} entryTitle={entryTitle}> */}
      {/* <Component.element entry={section} /> */}
      {/* {JSON.stringify(entryId)}
      \\{contentType} // */}
      <Component.element {...section} />
      {/* </Xray> */}
    </div>
  );
};

export default BlockRenderer;
