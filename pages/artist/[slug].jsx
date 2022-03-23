import _ from "lodash";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { getEntriesByContentType } from "../../lib/tool";

const TrackList = (props) => {
  const chartSlug = _.get(props, "params.chart");
  const artist = _.get(props, "artist");
  const includes = _.get(props, "entryItems.includes");

  const name = _.get(artist, "fields.name");
  const artistDetails = _.get(artist, "fields.artist");
  const components = _.get(artist, "fields.components");

  // let title = _.get(entry, "[0].fields.title");
  // let tracks = _.get(entry, "[0].fields.tracks");
  // let image = _.get(entry, "[0].fields.image.fields.asset.fields.file.url");

  if (!artist) {
    return "No Data";
  }

  let trackMedia = "";

  return (
    <>
      <MainLayout>
        <div className=" h-fullx text-white py-10">
          {" "}
          tracks: {JSON.stringify(artistDetails)}
        </div>
      </MainLayout>

      <br />

      {/* {JSON.stringify(entry)} */}
    </>
  );
};

export default TrackList;

export async function getServerSideProps({ params }) {
  // Fetch necessary data for
  const artistSlug = _.get(params, "slug");
  let artist = await getEntriesByContentType("artistPage", artistSlug).then(
    (entries) => {
      const items = _.get(entries, "items[0]");
      console.log("entries", artistSlug, items);
      // console.log("second enti", entries.items[0].fields.tracks);
      return items;
    }
  );
  return {
    props: {
      params: params,

      artist,
    },
  };
}
