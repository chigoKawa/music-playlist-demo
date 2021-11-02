import { useEffect, useState } from "react";
import { getChartEntries } from "../lib/tool";
import MainLayout from "../layouts/MainLayout";
import PlayLists from "../components/PlayLists";
import _ from "lodash";

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
    <div className="w-full overflow-hidden flex flex-col relative min-h-screen ">
      <MainLayout>
        <div className="flex flex-col items-center">
          <div className="pt-6 mb-4">
            <h1 className="font-bold text-4xl underline">PLAYLIST APP</h1>
          </div>
          <PlayLists entryItems={entryItems ? entryItems : chartEntries} />
        </div>
        <div className="flex flex-col"></div>
      </MainLayout>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch all available playlists
  let entryItems = await getChartEntries("playlist").then((entries) => {
    return entries.items;
  });
  return {
    props: {
      // params: params,
      entryItems: entryItems,
      morePosts: {},
    },
  };
}
