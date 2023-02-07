import React from "react";
import Link from "next/link";
import { AiFillPlayCircle } from "react-icons/ai";
import get from "lodash/get";

const PlaylistCard = ({ item }) => {
  const title = get(item, "fields.title");
  const tracks = get(item, "fields.tracks");
  const owner = get(item, "fields.owner");
  const slug = get(item, "fields.slug");
  let image = get(item, "fields.image.fields.asset.fields.file.url");

  return (
    <Link
      href={`/playlist/${slug}`}
      className="relative group transition-all ease-in-out delay-150"
      passHref
    >
      <div>
        <div
          className="relative px-4 pb-4 bg-gray-700 hover:bg-gray-600 
    w-full md:min-w-[200px] lg:min-w-[220px] min-w-maxx rounded-lgx rounded-b-md flex flex-col space-y-2 group"
        >
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundColor: `rgba(255, 255, 255, 0.486)`,
              backgroundBlendMode: "overlay",
              //   height: "200px",
              // width: "200px",
            }}
            className="h-60 w-full bg-red-100 rounded-b-md overflow-md"
          ></div>
          <span className="text-lg font-bold text-white">{title}</span>
          <span className="text-gray-200">
            By {owner ? owner : `💙 Contentful`}
          </span>
          <span className="text-xs text-gray-300">
            {`${
              tracks.length === 0
                ? `No Songs`
                : `${
                    tracks.length > 1
                      ? `${tracks.length} Songs`
                      : `${tracks.length} Song`
                  }`
            }`}
          </span>
        </div>

        <div className="absolute group-hover:bottom-24 group-hover:opacity-95 opacity-0 bottom-0 right-8 transition-all ease-in-out delay-200 ">
          <div className="">
            <AiFillPlayCircle className="w-14 h-14  text-rotx text-green-500 " />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
