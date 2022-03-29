import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import _ from "lodash";
import Link from "next/link";
import slugify from "slugify";
import richtextRenderOptions from "../lib/richtextRenderOptions";

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
  const artistPageSlug = slugify(artistName.toLowerCase()); // this should be changed , use artist page as include
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
      <div
        className="relative w-full  flex flex-col 
      items-center transition duration-500 ease-in-out "
      >
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
        {bio ? (
          <div className="mb-4  overflow-hidden border-t-2 w-full p-20">
            <div className="mb-8 font-bold lg:text-2xl text-white">
              <Link href={`/artist/${artistPageSlug}`}>
                <a target="_blank"> {artistName}</a>
              </Link>
            </div>

            <div className="flex flex-col space-y-4 lg:space-y-0  lg:flex-row lg:space-x-10 ">
              <div className="w-full lg:w-4/12">
                <img
                  className="w-full lg:w-48 h-40"
                  src={`https:${artistImage}`}
                  alt={artistName}
                />
              </div>
              <div className="w-full relative lg:w-8/12  max-w-lg text-center">
                {/* bio {JSON.stringify(bio)}{" "} */}
                <div className="relative  ">
                  {" "}
                  {bio
                    ? documentToReactComponents(bio, richtextRenderOptions)
                    : ""}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* <div className="">bio</div> */}
      </div>
    </>
  );
};

export default SongComponent;
