import _ from "lodash";

const PlayListItem = (props) => {
  const entry = _.get(props, "entry");
  // const fields = _.get(entry, "fields.slug");
  const title = _.get(entry, "fields.title");
  const slug = _.get(entry, "fields.slug");
  let image = _.get(entry, "fields.image.fields.asset.fields.file.url");
  // let imageDescription = _.get(
  //   entry,
  //   "fields.image.fields.asset.fields.description"
  // );
  if (!entry) {
    return "";
  }
  return (
    <div className="w-full min-h-full h-auto max-h-full">
      <a href={`/playlist/${slug}`}>
        {/* <img src={`https:${image}`} alt={imageDescription} /> */}
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundColor: `rgba(255, 255, 255, 0.486)`,
            backgroundBlendMode: "overlay",
            height: "200px",
            // width: "200px",
          }}
          className="transition duration-500 ease-in-out h-full max-h-80 w-full bg-blue-100 bg-auto hover:bg-contain bg-center flex  hover:bg-blue-50 rounded shadow-md py-6 items-center text-center transform hover:-translate-y-1 hover:scale-110"
        >
          <span className="transition duration-500 ease-in-out p-2 border-t-4  text-blaux hover:text-white bg-blau  hover:bg-transparent  border-b-4 border-black mx-auto h-fullx w-full">
            {title}
          </span>
        </div>
      </a>
    </div>
  );
};

export default PlayListItem;
