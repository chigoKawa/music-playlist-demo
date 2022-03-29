import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import _ from "lodash";
import BlockRenderer from "../components/BlockRenderer";

// Elements
const Bold = ({ children }) => (
  <strong className="font-bold "> {children} </strong>
);

const Code = ({ children }) => (
  <div className="flex flex-col flex-wrap ">
    <div className="bg-red-100x bg-cf-red-100 p-1 text-xs">Code</div>
    <pre className=" bg-slate-50 py-2  whitespace-pre-wrap">
      {children}
    </pre>{" "}
  </div>
);

const Heading1 = ({ children }) => (
  <h1 className="text-4xl md:text-6xl font-bold text-center"> {children} </h1>
);

const Heading2 = ({ children }) => (
  <h2 className="text-3xl md:text-5xl font-bold text-center"> {children} </h2>
);
const Heading3 = ({ children }) => <h3 className=" "> {children} </h3>;
const Parag = ({ children }) => <p className=""> {children} </p>;

const UList = ({ children }) => <ul className="mb-4 "> {children} -- </ul>;
const OList = ({ children }) => <ol className="mb-4 "> {children} </ol>;
const LisItem = ({ children }) => <li className="mb-4 "> {children} </li>;

const QuoteItem = ({ children }) => (
  <div className="mb-4 border-l-4 border-blue-500 bg-slate-50 py-2 px-10 flex flex-row flex-wrap">
    {children}
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

const richtextRenderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold> {text} </Bold>,
    [MARKS.CODE]: (text) => <Code> {text} </Code>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => {
      return <Heading1> {children} </Heading1>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <Heading2> {children} </Heading2>;
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return <Heading3> {children} </Heading3>;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <Parag> {children} </Parag>;
    },
    // renderText: (text) => text.replace("!", "?"),
    [BLOCKS.UL_LIST]: (node, children) => {
      return <UList> {children} </UList>;
    },
    [BLOCKS.OL_LIST]: (node, children) => {
      return <OList> {children} </OList>;
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      return <LisItem> {children} </LisItem>;
    },

    [BLOCKS.QUOTE]: (node, children) => {
      return <QuoteItem> {children} </QuoteItem>;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entry = _.get(node, "data.target");
      const sysId = _.get(node, "data.target.sys.id");
      const entryId = _.get(entry, "sys.contentType.sys.id");

      const { title, description } = node.data.target.fields;
      try {
        return (
          <>
            <BlockRenderer
              key={entryId ? entryId : `sectsion-${sysId}`}
              section={entry}
            />
          </>
        );
      } catch (error) {
        return "Render error " + error.toString();
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const entry = _.get(node, "data.target");
      const sysId = _.get(node, "data.target.sys.id");
      const entryId = _.get(entry, "sys.contentType.sys.id");

      const { title, description } = node.data.target.fields;
      try {
        return (
          <>
            {/* {JSON.stringify(sysId)} */}
            <BlockRenderer
              key={entryId ? entryId : `sectsion-${sysId}`}
              section={entry}
            />
          </>
        );
      } catch (error) {
        return "Render error " + error.toString();
      }
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return <HyperLNK node={node}> {children} </HyperLNK>;
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const entry = _.get(node, "data.target");
      const sysId = _.get(node, "data.target.sys.id");
      const entryId = _.get(entry, "sys.contentType.sys.id");

      const { title, description } = node.data.target.fields;
      try {
        return (
          <>
            <BlockRenderer
              key={entryId ? entryId : `sectsion-${sysId}`}
              section={entry}
            />
          </>
        );
      } catch (error) {
        return "Render error " + error.toString();
      }
    },
  },
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      console.log("embeds parag textSegment", textSegment, index);
      return [...children, index.length > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export default richtextRenderOptions;
