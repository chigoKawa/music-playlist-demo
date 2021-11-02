import _ from "lodash";

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

  const title = _.get(track, "fields.title");
  const mediaUrl = _.get(track, "fields.mediaUrl");
  let youtubeVideoID = youtube_parser(mediaUrl);

  //   const releaseDate = _.get(track, "fields.releaseDate");
  //   const artist = _.get(track, "fields.artist");

  //   const trackID = _.get(track, "sys.id");

  // const tracks = _.get(item, "fields.tracks");

  return (
    <>
      <div className="flex flex-col items-center">
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
        <div className="mb-4 rounded-md shadow-lg overflow-hidden">
          <img src={`https:${artistImage}`} alt={artistName} />
        </div>
        <div className="">bio</div>
      </div>
    </>
  );
};

export default SongComponent;
