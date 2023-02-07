import _ from "lodash";
import { useEffect, useState } from "react";
// import PlayLists from "../components/PlayLists";
import MainLayout from "../layouts/MainLayout";
// import { getChartEntries } from "../lib/tool";
// import NewPlaylist from "../components/NewPlaylist/NewPlaylist";
import dynamic from "next/dynamic";

const NewPlaylist = dynamic(() =>
  import("../components/NewPlaylist/NewPlaylist")
);

export default function IndexPage(props) {
  const entryItems = _.get(props, "entryItems");

  // const [chartEntries, setChartEntries] = useState(null);

  // useEffect(async () => {
  //   let chartItems = await getChartEntries("playlist").then((entries) => {
  //     return entries.items;
  //   });
  //   if (entryItems) {
  //     setChartEntries(chartItems);
  //   }
  //   return () => {};
  // }, []);

  return (
    <div className="w-full overflow-hidden flex flex-col relative min-h-screen bg-black text-white ">
      <MainLayout>
        <NewPlaylist />
        <div className="hidden flex flex-col justify-items-center items-center w-full bg-blau md:px-40 ">
          <div className="pt-6 mb-4 ">
            <h1 className="font-bold text-4xl ">
              PLAYLIST
              <span className="bg-blau px-2 rounded-t-lg shadow-lg">APP</span>
            </h1>
          </div>
          <div className="w-full">
            {/* <PlayLists entryItems={entryItems ? entryItems : chartEntries} /> */}
          </div>
        </div>{" "}
        <div className="flex flex-col"> </div>{" "}
      </MainLayout>{" "}
    </div>
  );
}
