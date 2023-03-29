import React, { useEffect } from "react";

function youtube_parser(url) {
  try {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  } catch (error) {
    return "";
  }
}

const SongItem = ({ song }) => {
  const youtubeVideoId = song?.fields?.youtubeVideoId?.fields?.youtubeVideo;
  return (
    <div>
      <div className=" w-60x rounded-md overflow-hidden">
        <iframe
          className="max-w-fit "
          //   width="560"
          //   height="315"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default SongItem;
