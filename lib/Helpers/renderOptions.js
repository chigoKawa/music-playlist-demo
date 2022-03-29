import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import _ from "lodash";
import ImageShow from "../../components/ImageShow";

const Bold = ({ children }) => (
  <span className="font-bold text-red-500x"> {children} </span>
);
const Heading1 = ({ children }) => (
  <div className="mb-4">
    <span className="text-4xl md:text-6xl font-bold text-white">
      {" "}
      {children}{" "}
    </span>{" "}
  </div>
);

const Heading2 = ({ children }) => (
  <div className="mb-4">
    <span className="text-3xl md:text-5xl font-bold text-white">
      {" "}
      {children}{" "}
    </span>{" "}
  </div>
);
const Parag = ({ children }) => (
  <div className="mb-4 text-white">
    <p className=""> {children} </p>{" "}
  </div>
);

const HyperLNK = ({ node, children }) => {
  const URI = _.get(node, "data.uri");
  return (
    <span className="text-4xlx md:text-6xlx text-blue-200 font-bold">
      {" "}
      <a href={URI} target="_blank" rel="noreferrer">
        {" "}
        {/* {URI} */} {children}{" "}
      </a>{" "}
    </span>
  );
};

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold> {text} </Bold>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => {
      return <Heading1> {children} </Heading1>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <Heading2> {children} </Heading2>;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <Parag> {children} </Parag>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      console.log("block typex HYPERLINK", node);
      return <HyperLNK node={node}> {children} </HyperLNK>;
    },
    // [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
    //   if (node.data.target.sys.contentType.sys.id === "quiz") {
    //     const title = _.get(node, "data.target.fields.title");
    //     const questions = _.get(node, "data.target.fields.questions");
    //     return (
    //       <div>
    //         <QuizShow title={title} questions={questions} />{" "}
    //       </div>
    //     );
    //   }
    //   if (node.data.target.sys.contentType.sys.id === "youtubeVideo") {
    //     let youtubeVideoID = "";
    //     const youtubeVideoTitle = _.get(node, "data.target.fields.title");
    //     const videoUrl = _.get(node, "data.target.fields.videoUrl");
    //     if (videoUrl) {
    //       youtubeVideoID = youtube_parser(videoUrl);
    //     }
    //     return (
    //       <YoutubeShow
    //         title={youtubeVideoTitle}
    //         youtubeVideoID={youtubeVideoID}
    //       />
    //     );
    //   }
    // },

    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      // render the EMBEDDED_ASSET as you need
      return (
        <ImageShow
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

export default renderOptions;
