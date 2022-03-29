import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import _ from "lodash";
import dynamic from "next/dynamic";
import InnerLayout from "../../layouts/InnerLayout";
import richtextRenderOptions from "../../lib/richtextRenderOptions";
import MediaWrapper from "../MediaWrapper";
const Xray = dynamic(() => import("../Xray"), { ssr: false });
const Artist = (props) => {
  console.log("find internal", props);
  const entryId = _.get(props, "sys.id");
  const contentType = _.get(props, "sys.contentType.sys.id");
  const entryTitle = _.get(props, "fields.name")
    ? _.get(props, "fields.name")
    : _.get(props, "fields.internalName");
  const fields = _.get(props, "fields");
  const featuredImage = _.get(fields, "featuredImage");
  const biography = _.get(fields, "biography");
  return (
    <Xray contentType={contentType} entryId={entryId} entryTitle={entryTitle}>
      <InnerLayout>
        <div className="">
          <div className="flex flex-col items-center justify-items-center space-y-4">
            <h1 className="">{entryTitle}</h1>

            {/* <p>{JSON.stringify(biography)}</p> */}

            <div className="shadow-xl border-2 border-blau rounded-3xl overflow-hidden  w-60x">
              <MediaWrapper
                classes="h-[200px] lg:h-[300px] w-auto"
                {...featuredImage}
              />
            </div>
            <div className="relative text-justify w-80 md:w-full md:max-w-7xl whitespace-normal overflow-hidden">
              {documentToReactComponents(biography, richtextRenderOptions)}
            </div>
          </div>

          {/* {JSON.stringify(props)} */}
        </div>
      </InnerLayout>
    </Xray>
  );
};

export default Artist;
