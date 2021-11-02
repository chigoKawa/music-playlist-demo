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
    <div className="w-full h-full max-h-full">
      <a href={`/playlist/${slug}`}>
        {/* <img src={`https:${image}`} alt={imageDescription} /> */}
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundColor: `rgba(255, 255, 255, 0.486)`,
            backgroundBlendMode: "overlay",
          }}
          className="h-full w-full bg-blue-100 bg-auto hover:bg-contain bg-center flex  hover:bg-blue-50 rounded shadow-md py-6 items-center text-center"
        >
          <span className="p-2 bg-white border-t-2 border-b-2 border-black mx-auto h-fullx w-full">
            {title}
          </span>
        </div>
      </a>
    </div>
  );
};

export default PlayListItem;
