import React from "react";

const AlbumItem = ({ album }) => {
  console.log("albumcontent", album);
  const title = album?.fields?.title;

  return (
    <div className="bg-orange-300 w-full h-40 text-center">
      <div className="flex h-full items-center justify-center justify-items-center text-center ">
        <span className="text-2xl">{title}</span>
      </div>
    </div>
  );
};

export default AlbumItem;
