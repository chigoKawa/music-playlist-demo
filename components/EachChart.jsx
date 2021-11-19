import _ from "lodash";
import SongComponent from "./SongComponent";

const EachChart = (props) => {
  const item = _.get(props, "item");
  const title = _.get(item, "fields.title");
  const tracks = _.get(item, "fields.tracks");
  const id = _.get(item, "sys.id");

  return (
    <>
      <h1>{title} </h1>
      {/* {JSON.stringify(props.chartEntriesIncludes.Entry)} */}
      {/* {JSON.stringify(tracks)} */}
      {id}
      <hr />
      {Array.isArray(tracks)
        ? tracks.map((track, index) => {
            const trackID = _.get(track, "sys.id");
            let trackMedia = "";

            return (
              <SongComponent
                trackMedia={trackMedia}
                key={index}
                track={track}
                // client={props.client}
              />
            );
          })
        : ""}
    </>
  );
};

export default EachChart;
