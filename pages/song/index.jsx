import _ from "lodash";
import PlayLists from "../../components/PlayLists";
import MainLayout from "../../layouts/MainLayout";

const TrackList = (props) => {
  const entryItems = _.get(props, "entryItems");

  return (
    <>
      {/* <h1>{title}</h1> */}{" "}
      <MainLayout>
        <PlayLists entryItems={entryItems} />
      </MainLayout>
      {/* {JSON.stringify(props)} */}{" "}
    </>
  );
};

export default TrackList;

export async function getStaticProps() {
  // Fetch necessary data for
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
