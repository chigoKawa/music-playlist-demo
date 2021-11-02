import _ from "lodash";

import PlayListItem from "./PlayListItem";

const PlayLists = (props) => {
  const entryItems = _.get(props, "entryItems");

  if (!entryItems) {
    return "";
  }
  return (
    <div className="flex flex-col items-center justify-items-center">
      <h1>Top Playlists!</h1>

      <div className="p-4 w-full">
        <div className="w-full grid grid-flow-row grid-cols-3 gap-4 min-h-full h-96 ">
          {Array.isArray(entryItems)
            ? entryItems.map((entry, index) => {
                return (
                  <div className="cursor-pointer w-full min-h-full" key={index}>
                    <PlayListItem entry={entry} />{" "}
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default PlayLists;
