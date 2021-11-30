import _ from "lodash";

import PlayListItem from "./PlayListItem";

const PlayLists = (props) => {
  const entryItems = _.get(props, "entryItems");

  if (!entryItems) {
    return "";
  }
  return (
    <div className="flex flex-col items-center justify-items-center ">
      {/* <h1>Top Playlists!</h1> */}

      <div className="p-4 w-full">
        <div className="w-full grid grid-cols-2  lg:grid-cols-3  grid-flow-row auto-rows-max  gap-8 min-h-full h-full p-4 border-2 rounded-md shadow-inner  ">
          {Array.isArray(entryItems)
            ? entryItems.map((entry, index) => {
                return (
                  <div
                    className="cursor-pointer w-full h-full min-h-full col-span-1"
                    key={index}
                  >
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
