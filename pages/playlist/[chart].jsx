import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import _ from "lodash";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import SongComponent from "../../components/SongComponent";
import MainLayout from "../../layouts/MainLayout";
import { getEntriesByContentType } from "../../lib/tool";
import Head from "next/head";

const FALLBACK_IMAGE =
  "https://images.ctfassets.net/wziypkqxv6cw/2hOInB7h4xxKYjomsw7z6J/a6cc40f2f478785f35f86e5bdfe40781/treble_cleff.jpg";

const Xray = dynamic(() => import("../../components/Xray"), { ssr: false });
const TrackList = (props) => {
  const includes = _.get(props, "entryItems.includes");
  const entry = _.get(props, "entry");

  let title = _.get(entry, "fields.title");
  let tracks = _.get(entry, "fields.tracks");
  let image = _.get(entry, "fields.image.fields.asset.fields.file.url");

  let playlist = entry;
  const contentType = _.get(playlist, "sys.contentType.sys.id");
  const entryId = _.get(playlist, "sys.id");
  const entryTitle = _.get(playlist, "fields.title");

  let trackMedia = "";

  return (
    <>
      <Head>
        <title>{`${title.toUpperCase()} | ${tracks.length} Song(s)`}</title>
      </Head>
      <MainLayout>
        <Xray
          contentType={contentType}
          entryId={entryId}
          entryTitle={entryTitle}
        >
          <div className="w-full h-full px-4 md:px-40  bg-black text-white py-6 min-h-screen max-w-7xl m-auto">
            <div className="flex flex-col">
              <div className="relative w-full flex flex-col ">
                <div className="w-full h-full flex flex-col lg:h-80 overflow-hidden bg-gelb p-2x ">
                  {/* <img
                    style={{ filter: "brightness(50%)" }}
                    width="100%"
                    src={image}
                  /> */}

                  {image ? (
                    <div className="w-full lg:h-80x h-full">
                      <Image
                        loading="eager"
                        // style={{ filter: "brightness(50%)" }}
                        // width={"100%"}
                        // height={"100%"}
                        src={`https:${image}`}
                        alt={entryTitle}
                        // layout="fill"
                        // objectFit="cover"
                        fill
                        style={{
                          objectFit: "cover",
                          filter: "brightness(50%)",
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col p-2x">
                  <h2 className="font-bold text-xl lg:text-3xl">{title}</h2>
                  {tracks ? (
                    <div className="bg-blau rounded shadow-lg p-2 text-center mt-2">
                      {`${tracks.length ? tracks.length : 0} Songs`}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="">
                {Array.isArray(tracks)
                  ? tracks.map((track, trx) => {
                      const trakNumber = trx + 1;
                      const songTitle = _.get(track, "fields.title");
                      const artistID = _.get(track, "fields.artist.sys.id");
                      // const trackArtist = _.get(track, "fields.artist");
                      const trackArtistName = _.get(
                        track,
                        "fields.artist.fields.internalTitle"
                      );
                      const trackArtistNameImage = _.get(
                        track,
                        "fields.artist.fields.featuredImage.fields.asset.fields.file.url"
                      );

                      console.log("tracky", track);

                      //   track.artistName = "LAGOS";

                      const inCludeEntry = _.get(includes, "Entry");
                      const artist = _.filter(inCludeEntry, (entry) => {
                        let entryID = _.get(entry, "sys.id");
                        if (entryID === artistID) {
                          return entry;
                        }
                      });

                      if (!songTitle) {
                        return "";
                      }

                      const artistName = _.get(artist, "[0].fields.name");
                      const artistImage = _.get(
                        artist,
                        "[0].fields.featuredImage.fields.asset.fields.file.url"
                      );

                      return (
                        <div
                          className="w-full  mb-4 bg-neuter mt-4 transition"
                          key={trx}
                        >
                          {/* {JSON.stringify(artistImage)}| */}
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className="flex flex-row w-full items-center justify-between  
                                px-4 py-4 text-sm font-medium text-left text-purple-900 bg-blue-100 
                                rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring 
                                focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                                >
                                  <div
                                    className={`${
                                      trakNumber === 1
                                        ? "text-rot font-bold text-2xl animate-bounce"
                                        : ""
                                    }`}
                                  >
                                    {trakNumber}
                                  </div>

                                  <div className=" w-2/12 hidden md:block text-center rounded-xl h-full p-2 whitespace-nowrap overflow-hidden truncate mr-2">
                                    <div className="w-16 h-16 rounded-full border-4 border-blau transition ease-in hover:border-blau3 overflow-hidden">
                                      <Image
                                        alt=""
                                        width={200}
                                        height={200}
                                        className=" "
                                        quality={80}
                                        src={
                                          trackArtistNameImage
                                            ? `https:${trackArtistNameImage}`
                                            : FALLBACK_IMAGE
                                        }
                                        style={{
                                          // objectFit: "contain",
                                          width: "100%",
                                          height: "auto",
                                        }}
                                      />
                                    </div>

                                    {/* <img
                                      alt=""
                                      className=" hidden w-16 h-16 rounded-full border-4 border-blau transition ease-in hover:border-blau3"
                                      src={`https:${
                                        artistImage
                                          ? artistImage
                                          : trackArtistNameImage
                                      }`}
                                    /> */}
                                  </div>
                                  <div className="w-3/12 text-center rounded-xl bg-blue-200 shadow-xl p-2 whitespace-nowrap overflow-hidden truncate mr-2">
                                    {" "}
                                    {songTitle}
                                  </div>
                                  <div className="w-3/12 text-center rounded-xl bg-blue-200 shadow-xl p-2 whitespace-nowrap overflow-hidden truncate mr-2">
                                    {" "}
                                    {artistName ? artistName : trackArtistName}
                                  </div>
                                  <ChevronUpIcon
                                    className={`${
                                      open ? "transform rotate-180" : ""
                                    } w-5 h-5 text-purple-500`}
                                  />
                                </Disclosure.Button>
                                <Transition
                                  show={open}
                                  enter="transition duration-100 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-75 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0"
                                >
                                  <Disclosure.Panel className="  px-4 pt-4 pb-2 text-sm text-gray-500 ">
                                    <SongComponent
                                      trackMedia={trackMedia}
                                      artistName={
                                        artistName
                                          ? artistName
                                          : trackArtistName
                                      }
                                      artistImage={
                                        artistImage
                                          ? artistImage
                                          : trackArtistNameImage
                                      }
                                      //   key={index}
                                      track={track}
                                      //   client={props.client}
                                    />
                                  </Disclosure.Panel>
                                </Transition>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          {/* <div
            style={{ backgroundImage: `url(${image}?w=500&fit=fill&q=80)` }}
            className="hidden w-full px-4 pt-16x md:p-40 bg-red-500 bg-fixed py-6 h-full min-h-screen "
          ></div> */}
        </Xray>
      </MainLayout>
    </>
  );
};

export default TrackList;

export async function getServerSideProps({ params }) {
  // Fetch necessary data for

  const slug = params?.chart;
  const entry = await getEntriesByContentType("playlist", slug);

  // let entries = await getChartEntries("playlist");
  // let entryItems = await getChartEntries("playlist").then((entries) => {
  //   return entries;
  // });
  return {
    props: {
      params: params,

      // entryItems: entries,
      entry: entry?.items?.[0] || {},
    },
  };
}
