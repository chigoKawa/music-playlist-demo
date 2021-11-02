import React from "react";
import { getChartEntries } from "../../lib/tool";
import _ from "lodash";
import MainLayout from "../../layouts/MainLayout";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import SongComponent from "../../components/SongComponent";

const TrackList = (props) => {
  const chartSlug = _.get(props, "params.chart");
  const entryItems = _.get(props, "entryItems.items");
  const includes = _.get(props, "entryItems.includes");
  let entry = _.filter(entryItems, (item) => {
    let slug = _.get(item, "fields.slug");

    return slug === chartSlug;
  });
  let title = _.get(entry, "[0].fields.title");
  let tracks = _.get(entry, "[0].fields.tracks");
  let image = _.get(entry, "[0].fields.image.fields.asset.fields.file.url");
  //   let imageDescription = _.get(
  //     entry,
  //     "[0].fields.image.fields.asset.fields.description"
  //   );
  if (!entryItems) {
    // return "No Entries"
  }
  //   const trackID = _.get(tracks, "[0]sys.id");

  let trackMedia = "";

  return (
    <>
      <MainLayout>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="w-full px-4 pt-16x md:p-40 bg-red-500 bg-fixed py-6 h-full min-h-screen "
        >
          {/* <img src={`https:${image}`} alt={imageDescription} /> */}

          <div className="w-full h-full p-2 mx-auto bg-white opacity-95x  rounded-2xl">
            {/* {JSON.stringify(includes)} */}
            <div className="bg-whitex py-4 opacity-100">
              <h1 className="text-center font-bold text-2xl ">{title}</h1>
            </div>
            {Array.isArray(tracks)
              ? tracks.map((track, trx) => {
                  const trakNumber = trx + 1;
                  const songTitle = _.get(track, "fields.title");
                  const artistID = _.get(track, "fields.artist.sys.id");
                  //   track.artistName = "LAGOS";

                  const inCludeEntry = _.get(includes, "Entry");
                  const artist = _.filter(inCludeEntry, (entry) => {
                    let entryID = _.get(entry, "sys.id");
                    if (entryID === artistID) {
                      return entry;
                    }
                  });

                  const artistName = _.get(artist, "[0].fields.name");
                  const artistImage = _.get(
                    artist,
                    "[0].fields.image[0].fields.asset.fields.file.url"
                  );

                  return (
                    <div className="w-full  mb-4 " key={trx}>
                      {/* {JSON.stringify(artistImage)}| */}
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex flex-row w-full items-center justify-between  px-4 py-4 text-sm font-medium text-left text-purple-900 bg-blue-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                              <div
                                className={`${
                                  trakNumber === 1
                                    ? "text-red-500 font-bold text-2xl animate-bounce"
                                    : ""
                                }`}
                              >
                                {trakNumber}
                              </div>
                              <div className="w-2/12 hidden md:block text-center rounded-xl h-full p-2 whitespace-nowrap overflow-hidden truncate mr-2">
                                {" "}
                                <img
                                  className="w-14x w-16 h-16"
                                  src={`https:${artistImage}`}
                                />
                              </div>
                              <div className="w-3/12 text-center rounded-xl bg-blue-200 shadow-xl p-2 whitespace-nowrap overflow-hidden truncate mr-2">
                                {" "}
                                {songTitle}
                              </div>
                              <div className="w-3/12 text-center rounded-xl bg-blue-200 shadow-xl p-2 whitespace-nowrap overflow-hidden truncate mr-2">
                                {" "}
                                {artistName}
                              </div>

                              <ChevronUpIcon
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-5 h-5 text-purple-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 overflow-scroll">
                              <SongComponent
                                trackMedia={trackMedia}
                                artistName={artistName}
                                artistImage={artistImage}
                                //   key={index}
                                track={track}
                                //   client={props.client}
                              />
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </MainLayout>
      {/* tracks: {JSON.stringify(tracks)} */}

      <br />

      {/* {JSON.stringify(entry)} */}
    </>
  );
};

export default TrackList;

// export async function getStaticPaths() {
//   // return list of possible vals
//   let entryItems = await getChartEntries("playlist").then((entries) => {
//     return entries.items;
//   });
//   let paths = [];

//   if (entryItems) {
//     entryItems.map((item) => {
//       //   let title = _.get(item, "fields.title");
//       let slug = _.get(item, "fields.slug");
//       //   let id = _.get(item, "sys.id");
//       try {
//         // title = title.replace(/ /g, "-");
//       } catch (error) {
//         console.log(error);
//       }
//       paths.push({ params: { type: "TESTING!", chart: slug } });
//     });
//   }

//   return {
//     paths: paths,

//     // paths: Array.isArray(entryItems)? entryItems?.map(({ chart }) => `/playlist/${chart}`) ?? [] : [] ,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  // Fetch necessary data for
  let entryItems = await getChartEntries("playlist").then((entries) => {
    console.log("second enti", entries.items[0].fields.tracks);
    return entries;
  });
  return {
    props: {
      params: params,

      entryItems: entryItems,
      morePosts: {},
    },
  };
}
