import React, { useEffect, useState } from "react";
import { getChartEntries } from "../../lib/tool";
import PlaylistCard from "./PlaylistCard";

const NewPlaylist = () => {
  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    (async () => {
      let entryItems = await getChartEntries("playlist");
      setPlaylists(entryItems?.items);
    })();

    return () => {};
  }, []);
  return (
    <div className="p-4 lg:max-w-7xl md:max-w-2xl m-auto py-10">
      <div className="flex flex-col space-y-4">
        <span className="">Great Playlists by Content Authoring legends.</span>
        <div className="grid gap-6  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
          {playlists?.map((pl, plx) => {
            return <PlaylistCard key={`key-${pl?.sys?.id}-${plx}`} item={pl} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default NewPlaylist;
