import _ from "lodash";
const ImageShow = (props) => {
  const src = _.get(props, "src");
  return (
    <div className="w-full p-2 lg:p-4 bg-blau rounded-lg overflow-hidden shadow-lg">
      {" "}
      <img className="w-full" src={src} />
    </div>
  );
};

export default ImageShow;
