import _ from "lodash";
import { useEffect, useState } from "react";
import PlayLists from "../components/PlayLists";
import MainLayout from "../layouts/MainLayout";
import { getChartEntries } from "../lib/tool";

export default function IndexPage(props) {
  const entryItems = _.get(props, "entryItems");

  const [chartEntries, setChartEntries] = useState(null);

  useEffect(async () => {
    let chartItems = await getChartEntries("playlist").then((entries) => {
      return entries.items;
    });
    if (entryItems) {
      setChartEntries(chartItems);
    }
    return () => {};
  }, []);

  return (
    <div className="w-full overflow-hidden flex flex-col relative min-h-screen bg-black text-white ">
      <MainLayout>
        <div className="flex flex-col justify-items-center items-center w-full bg-blau md:px-40 ">
          <div className="pt-6 mb-4 ">
            <h1 className="font-bold text-4xl ">
              {" "}
              PLAYLIST{" "}
              <span className="bg-blau px-2 rounded-t-lg shadow-lg">
                APP
              </span>{" "}
            </h1>{" "}
          </div>{" "}
          <div className="w-full">
            {" "}
            <PlayLists entryItems={entryItems ? entryItems : chartEntries} />
          </div>
        </div>{" "}
        <div className="flex flex-col"> </div>{" "}
      </MainLayout>{" "}
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch all available playlists
  let entryItems = {};
  try {
    entryItems = await getChartEntries("playlist").then((entries) => {
      try {
        return entries.items;
      } catch (error) {
        return {};
      }
    });
  } catch (error) {}

  return {
    props: {
      // params: params,
      entryItems: entryItems ? entryItems : {},
      morePosts: {},
    },
  };
}
