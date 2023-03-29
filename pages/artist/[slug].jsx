import _ from "lodash";
import dynamic from "next/dynamic";
import React from "react";
import BlockRenderer from "../../components/BlockRenderer";
import InnerLayout from "../../layouts/InnerLayout";
import RelatedSongs from "../../components/RelatedSongs";
import RelatedAlbums from "../../components/RelatedAlbums";
import MainLayout from "../../layouts/MainLayout";
import {
  getEntriesByContentType,
  getEntriesByContentTypeWithFilter,
} from "../../lib/tool";
// import Xray from "../../components/Xray";

const Xray = dynamic(() => import("../../components/Xray"), { ssr: false });
const TrackList = (props) => {
  const chartSlug = _.get(props, "params.chart");
  const artist = _.get(props, "artist");
  const includes = _.get(props, "entryItems.includes");
  const relatedAlbums = _.get(props, "relatedAlbums");
  const relatedSongs = _.get(props, "relatedSongs");

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
    return <>No Data</>;
  }

  return (
    <div className="bg-red-300x min-w-fullx ">
      <MainLayout>
        <Xray
          contentType={contentType}
          entryId={entryId}
          entryTitle={entryTitle}
        >
          <div className=" h-full text-white py-10 overflow-hidden  max-w-7xl m-auto ">
            {/* Artist details */}
            {/* {JSON.stringify(relatedSongs)} */}
            <div className="relative ">
              <BlockRenderer section={artistDetails} />
            </div>
            {/* related content */}
            <RelatedSongs data={relatedSongs} />
            <RelatedAlbums data={relatedAlbums} />
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
  let artistEntries = await getEntriesByContentType("artistPage", artistSlug);
  if (!artistEntries) {
    return {
      notFound: true,
    };
  }
  let artist = _.get(artistEntries, "items[0]");
  // let artist = await getEntriesByContentType("artistPage", artistSlug).then(
  //   (entries) => {
  //     try {
  //       const items = _.get(entries, "items[0]");
  //       // console.log("entries", artistSlug, items);
  //       // console.log("second enti", entries.items[0].fields.tracks);
  //       return items;
  //     } catch (error) {
  //       return {};
  //     }
  //   }
  // );

  const ARTIST_ID = artist?.fields?.artist?.sys?.id;

  const relatedAlbums = await getEntriesByContentTypeWithFilter("album", null, {
    "fields.artist.sys.id": ARTIST_ID,
  });

  const relatedSongs = await getEntriesByContentTypeWithFilter("song", null, {
    "fields.artist.sys.id": ARTIST_ID,
  });
  // console.log("related Albums", relatedSongs, relatedAlbums);
  return {
    props: {
      params: params,
      relatedAlbums,
      relatedSongs,
      artist,
    },
  };
}
