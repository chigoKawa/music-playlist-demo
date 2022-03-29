import _ from "lodash";
import dynamic from "next/dynamic";
import React from "react";
import BlockRenderer from "../../components/BlockRenderer";
import InnerLayout from "../../layouts/InnerLayout";
import MainLayout from "../../layouts/MainLayout";
import { getEntriesByContentType } from "../../lib/tool";
// import Xray from "../../components/Xray";

const Xray = dynamic(() => import("../../components/Xray"), { ssr: false });
const TrackList = (props) => {
  const chartSlug = _.get(props, "params.chart");
  const artist = _.get(props, "artist");
  const includes = _.get(props, "entryItems.includes");

  const name = _.get(artist, "fields.name");
  const artistDetails = _.get(artist, "fields.artist");
  const components = _.get(artist, "fields.components");
  const contentType = _.get(artist, "sys.contentType.sys.id");
  const entryId = _.get(artist, "sys.id");
  const entryTitle = _.get(artist, "fields.name");

  // let title = _.get(entry, "[0].fields.title");
  // let tracks = _.get(entry, "[0].fields.tracks");
  // let image = _.get(entry, "[0].fields.image.fields.asset.fields.file.url");

  if (!artist) {
    return "No Data";
  }

  let trackMedia = "";

  return (
    <div className="bg-red-300x min-w-full">
      <MainLayout>
        <Xray
          contentType={contentType}
          entryId={entryId}
          entryTitle={entryTitle}
        >
          <div className=" h-full text-white py-10 overflow-hidden  ">
            {/* Artist details */}
            <div className="relative">
              <BlockRenderer section={artistDetails} />
            </div>
            {/* other components */}
            <InnerLayout>
              <div className="flex flex-col items-center w-full">
                {Array.isArray(components)
                  ? components.map((entry, x) => {
                      return (
                        <BlockRenderer section={entry} key={`entry-key-${x}`} />
                      );
                    })
                  : ""}
              </div>
            </InnerLayout>

            {/* tracks: {JSON.stringify(components)} */}
          </div>
        </Xray>
      </MainLayout>

      {/* {JSON.stringify(entry)} */}
    </div>
  );
};

export default TrackList;

export async function getServerSideProps({ params }) {
  // Fetch necessary data for
  const artistSlug = _.get(params, "slug");
  let artist = await getEntriesByContentType("artistPage", artistSlug).then(
    (entries) => {
      try {
        const items = _.get(entries, "items[0]");
        console.log("entries", artistSlug, items);
        // console.log("second enti", entries.items[0].fields.tracks);
        return items;
      } catch (error) {
        return {};
      }
    }
  );
  return {
    props: {
      params: params,

      artist,
    },
  };
}
