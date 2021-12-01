import _ from "lodash";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import renderOptions from "../lib/Helpers/renderOptions";

// import { getEntry } from "../lib/tool";
const SongComponent = (props) => {
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
  const track = _.get(props, "track");
  const artistImage = _.get(props, "artistImage");
  const artistName = _.get(props, "artistName");
  const bio = _.get(props, "track.fields.artist.fields.biography");

  const title = _.get(track, "fields.title");

  const mediaUrl = _.get(track, "fields.mediaUrl");
  const youtubeVideoId = _.get(
    track,
    "fields.youtubeVideoId.fields.youtubeVideo"
  );
  const youtubeVideoTitle = _.get(track, "fields.youtubeVideoId.fields.title");
  let youtubeVideoID = "";
  if (youtubeVideoId) {
    youtubeVideoID = youtubeVideoId;
  } else {
    youtubeVideoID = youtube_parser(mediaUrl);
  }

  //   const releaseDate = _.get(track, "fields.releaseDate");
  //   const artist = _.get(track, "fields.artist");

  //   const trackID = _.get(track, "sys.id");

  // const tracks = _.get(item, "fields.tracks");

  return (
    <>
      {/* youtubeVideoId : {JSON.stringify(youtubeVideoId)} : {youtubeVideoTitle} */}
      <div className="flex flex-col items-center transition duration-500 ease-in-out">
        <div className="mt-4 mb-4 ">
          <h3 className="text-center text-2xl">
            {title} by <b>{artistName}</b>
          </h3>
        </div>
        <div className="hidden lg:block mb-4 rounded-md overflow-hidden">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeVideoID}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* mibile view */}
        <div className="lg:hidden mb-4 rounded-md overflow-hidden">
          <iframe
            // width="260"
            // height="315"
            src={`https://www.youtube.com/embed/${youtubeVideoID}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <hr />
        <br />
        <div className="mb-4 rounded-mdx shadow-lgx overflow-hidden border-t-2 w-full p-20">
          <div className="mb-8 text-centerx font-bold text-2xl">
            {artistName}
          </div>
          <div className="flex flex-row space-x-10 ">
            <div className="w-4/12">
              {" "}
              <img
                className="w-48 h-40"
                src={`https:${artistImage}`}
                alt={artistName}
              />
            </div>
            <div className="w-4/12">
              {/* bio {JSON.stringify(bio)}{" "} */}
              {bio ? documentToReactComponents(bio, renderOptions) : ""}
            </div>
          </div>
        </div>
        {/* <div className="">bio</div> */}
      </div>
    </>
  );
};

export default SongComponent;
