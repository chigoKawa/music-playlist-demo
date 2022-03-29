import _ from "lodash";
import MainLayout from "../../layouts/MainLayout";

const TrackList = (props) => {
  const entryItems = _.get(props, "entryItems");

  return (
    <>
      {/* <h1>{title}</h1> */} <MainLayout>SOng</MainLayout>
      {/* {JSON.stringify(props)} */}{" "}
    </>
  );
};

export default TrackList;
